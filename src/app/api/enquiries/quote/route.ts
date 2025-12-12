import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { sendQuoteReceivedToCustomer, sendQuoteReceivedToAdmin } from '@/lib/email/services/email-service'
import { checkRateLimit, quoteRequestLimiter, createRateLimitResponse } from '@/lib/security/rate-limit'

export async function POST(request: NextRequest) {
  try {
    // Check rate limit (5 quotes per hour per IP)
    const rateLimitResult = await checkRateLimit(
      request,
      quoteRequestLimiter
    );

    if (!rateLimitResult.success) {
      return createRateLimitResponse(
        rateLimitResult,
        'Too many quote requests. Please try again later.'
      );
    }

    const body = await request.json()

    // Validate required fields
    if (!body.email || !body.firstName || !body.lastName || !body.phone) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Create Supabase client for API route
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false
        }
      }
    )

    // Submit quote request to database
    const { data: quoteData, error: submitError } = await supabase
      .from('quote_requests')
      .insert([
        {
          first_name: body.firstName,
          last_name: body.lastName,
          business_name: body.businessName || null,
          email: body.email,
          phone: body.phone,
          product_id: body.productId || null,
          quantity: body.quantity || 1,
          body_color: body.bodyColor || null,
          seat_color: body.seatColor || null,
          lift_kit: body.liftKit || null,
          wheel_upgrade: body.wheelUpgrade || null,
          lighting: body.lighting || null,
          battery_type: body.batteryType || null,
          accessories: body.accessories || [],
          primary_use: body.primaryUse || null,
          budget_range: body.budgetRange || null,
          purchase_timeline: body.purchaseTimeline || null,
          special_requests: body.specialRequests || null,
          hear_about_us: body.hearAboutUs || null,
          status: 'pending',
        },
      ])
      .select()
      .single()

    if (submitError) {
      console.error('Database error:', submitError)
      return NextResponse.json(
        { error: 'Failed to submit quote request' },
        { status: 500 }
      )
    }

    // Get product details if product_id provided
    let productName = 'Custom Golf Cart'
    if (body.productId) {
      const { data: product } = await supabase
        .from('products')
        .select('name')
        .eq('id', body.productId)
        .single()

      if (product) {
        productName = product.name
      }
    }

    // Prepare quote data for emails
    const quoteNumber = quoteData.id.substring(0, 8).toUpperCase()
    const submittedDate = new Date()

    // Build customisations array
    const customisations: { category: string; selection: string; notes?: string }[] = []
    if (body.bodyColor) customisations.push({ category: 'Body Color', selection: body.bodyColor })
    if (body.seatColor) customisations.push({ category: 'Seat Color', selection: body.seatColor })
    if (body.liftKit) customisations.push({ category: 'Lift Kit', selection: body.liftKit })
    if (body.wheelUpgrade) customisations.push({ category: 'Wheel Upgrade', selection: body.wheelUpgrade })
    if (body.lighting) customisations.push({ category: 'Lighting', selection: body.lighting })
    if (body.batteryType) customisations.push({ category: 'Battery Type', selection: body.batteryType })
    if (body.accessories && body.accessories.length > 0) {
      customisations.push({
        category: 'Accessories',
        selection: body.accessories.join(', ')
      })
    }

    // Customer email data
    const customerEmailData = {
      name: `${body.firstName} ${body.lastName}`,
      email: body.email,
      phone: body.phone,
      quoteNumber,
      submittedDate,
      productName,
      customisations,
      budgetRange: body.budgetRange,
      timeline: body.purchaseTimeline,
      additionalNotes: body.specialRequests,
    }

    // Admin email data
    const adminEmailData = {
      customerName: `${body.firstName} ${body.lastName}`,
      customerEmail: body.email,
      customerPhone: body.phone,
      quoteNumber,
      submittedDate,
      productName,
      customisations,
      budgetRange: body.budgetRange,
      timeline: body.purchaseTimeline,
      additionalNotes: body.specialRequests,
    }

    // Send emails (don't block response on email sending)
    Promise.all([
      sendQuoteReceivedToCustomer(body.email, customerEmailData),
      sendQuoteReceivedToAdmin(adminEmailData),
    ]).catch(error => {
      console.error('Failed to send quote emails:', error)
      // Don't fail the request if emails fail - the quote is already saved
    })

    return NextResponse.json({
      success: true,
      quoteId: quoteData.id,
      quoteNumber,
      message: 'Quote request submitted successfully',
    })
  } catch (error) {
    console.error('Quote submission error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
