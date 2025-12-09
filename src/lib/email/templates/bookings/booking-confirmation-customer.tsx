import * as React from 'react'
import { EmailLayout, Heading, Paragraph, Button, Divider, InfoBox, HighlightBox } from '../base-layout'

interface BookingAddon {
  name: string
  price: number
  quantity?: number
}

interface DeliveryAddress {
  addressLine1: string
  addressLine2?: string
  city: string
  state?: string
  postalCode: string
  country: string
}

interface BookingConfirmationCustomerEmailProps {
  bookingNumber: string
  customerName: string
  customerEmail: string
  customerPhone: string

  // Product details
  productName: string
  productTier: string
  quantity: number

  // Rental details
  rentalType: 'hourly' | 'daily' | 'weekly' | 'custom'
  startDate: Date
  endDate: Date
  durationHours?: number
  durationDays?: number

  // Pricing
  baseRate: number
  addonTotal: number
  subtotal: number
  taxAmount: number
  totalAmount: number
  selectedAddons: BookingAddon[]

  // Delivery/Pickup
  deliveryAddress?: DeliveryAddress
  pickupLocation?: string
  specialRequests?: string

  // Confirmation date
  confirmedDate: Date
}

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-NZ', {
    style: 'currency',
    currency: 'NZD',
  }).format(amount)
}

const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('en-NZ', {
    dateStyle: 'long',
    timeStyle: 'short',
  }).format(date)
}

const formatDateOnly = (date: Date) => {
  return new Intl.DateTimeFormat('en-NZ', {
    dateStyle: 'long',
  }).format(date)
}

const getRentalTypeLabel = (type: string) => {
  const labels: Record<string, string> = {
    hourly: 'Hourly Rental',
    daily: 'Daily Rental',
    weekly: 'Weekly Rental',
    custom: 'Custom Rental Period',
  }
  return labels[type] || type
}

export const BookingConfirmationCustomerEmail = ({
  bookingNumber,
  customerName,
  customerEmail,
  customerPhone,
  productName,
  productTier,
  quantity,
  rentalType,
  startDate,
  endDate,
  durationHours,
  durationDays,
  baseRate,
  addonTotal,
  subtotal,
  taxAmount,
  totalAmount,
  selectedAddons,
  deliveryAddress,
  pickupLocation,
  specialRequests,
  confirmedDate,
}: BookingConfirmationCustomerEmailProps) => (
  <EmailLayout previewText={`Booking Confirmed - ${bookingNumber}`}>
    <Heading>Your Booking is Confirmed!</Heading>

    <Paragraph>
      Hello {customerName},
    </Paragraph>

    <Paragraph>
      Thank you for choosing Club Caddy Carts! Your payment has been processed successfully and your golf cart rental is now confirmed. We're looking forward to serving you.
    </Paragraph>

    <Divider />

    <HighlightBox>
      <table width="100%" cellPadding="0" cellSpacing="0">
        <tbody>
          <tr>
            <td style={{ paddingBottom: '12px' }}>
              <span style={{ fontSize: '13px', color: '#881337', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>
                Booking Number
              </span>
            </td>
          </tr>
          <tr>
            <td style={{ paddingBottom: '12px' }}>
              <span style={{ fontSize: '24px', color: '#18181b', fontWeight: 700, fontFamily: 'monospace' }}>
                {bookingNumber}
              </span>
            </td>
          </tr>
          <tr>
            <td>
              <span style={{ fontSize: '13px', color: '#71717a' }}>
                Please reference this number for all communications
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </HighlightBox>

    <Divider />

    <Paragraph>
      <strong style={{ fontSize: '16px', color: '#18181b' }}>Rental Details</strong>
    </Paragraph>

    <InfoBox>
      <table width="100%" cellPadding="0" cellSpacing="0">
        <tbody>
          <tr>
            <td style={{ paddingBottom: '12px' }}>
              <strong style={{ fontSize: '14px', color: '#18181b' }}>Golf Cart Model:</strong>
            </td>
          </tr>
          <tr>
            <td style={{ paddingBottom: '16px' }}>
              <span style={{ fontSize: '16px', color: '#881337', fontWeight: 600 }}>
                {productName} - {productTier} Edition
              </span>
            </td>
          </tr>

          <tr>
            <td style={{ paddingBottom: '8px' }}>
              <table width="100%" cellPadding="0" cellSpacing="0">
                <tbody>
                  <tr>
                    <td>
                      <strong style={{ fontSize: '13px', color: '#18181b' }}>Quantity:</strong>
                    </td>
                    <td align="right">
                      <span style={{ fontSize: '13px', color: '#52525b' }}>
                        {quantity} {quantity === 1 ? 'Cart' : 'Carts'}
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>

          <tr>
            <td style={{ paddingBottom: '8px' }}>
              <table width="100%" cellPadding="0" cellSpacing="0">
                <tbody>
                  <tr>
                    <td>
                      <strong style={{ fontSize: '13px', color: '#18181b' }}>Rental Type:</strong>
                    </td>
                    <td align="right">
                      <span style={{ fontSize: '13px', color: '#52525b' }}>
                        {getRentalTypeLabel(rentalType)}
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>

          <tr>
            <td style={{ paddingBottom: '8px' }}>
              <table width="100%" cellPadding="0" cellSpacing="0">
                <tbody>
                  <tr>
                    <td>
                      <strong style={{ fontSize: '13px', color: '#18181b' }}>Start Date:</strong>
                    </td>
                    <td align="right">
                      <span style={{ fontSize: '13px', color: '#52525b' }}>
                        {formatDate(startDate)}
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>

          <tr>
            <td style={{ paddingBottom: '8px' }}>
              <table width="100%" cellPadding="0" cellSpacing="0">
                <tbody>
                  <tr>
                    <td>
                      <strong style={{ fontSize: '13px', color: '#18181b' }}>End Date:</strong>
                    </td>
                    <td align="right">
                      <span style={{ fontSize: '13px', color: '#52525b' }}>
                        {formatDate(endDate)}
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>

          {(durationHours || durationDays) && (
            <tr>
              <td style={{ paddingBottom: '8px' }}>
                <table width="100%" cellPadding="0" cellSpacing="0">
                  <tbody>
                    <tr>
                      <td>
                        <strong style={{ fontSize: '13px', color: '#18181b' }}>Duration:</strong>
                      </td>
                      <td align="right">
                        <span style={{ fontSize: '13px', color: '#52525b' }}>
                          {durationDays && `${durationDays} ${durationDays === 1 ? 'Day' : 'Days'}`}
                          {durationHours && !durationDays && `${durationHours} Hours`}
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </InfoBox>

    {selectedAddons && selectedAddons.length > 0 && (
      <>
        <Paragraph>
          <strong style={{ fontSize: '16px', color: '#18181b' }}>Selected Add-ons</strong>
        </Paragraph>

        <InfoBox>
          {selectedAddons.map((addon, index) => (
            <div key={index} style={{
              borderBottom: index < selectedAddons.length - 1 ? '1px solid #e4e4e7' : 'none',
              paddingBottom: index < selectedAddons.length - 1 ? '12px' : '0',
              marginBottom: index < selectedAddons.length - 1 ? '12px' : '0',
            }}>
              <table width="100%" cellPadding="0" cellSpacing="0">
                <tbody>
                  <tr>
                    <td>
                      <span style={{ fontSize: '14px', color: '#18181b' }}>
                        {addon.name}
                        {addon.quantity && addon.quantity > 1 && ` × ${addon.quantity}`}
                      </span>
                    </td>
                    <td align="right">
                      <span style={{ fontSize: '14px', color: '#52525b', fontWeight: 600 }}>
                        {formatCurrency(addon.price * (addon.quantity || 1))}
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          ))}
        </InfoBox>
      </>
    )}

    <Divider />

    <Paragraph>
      <strong style={{ fontSize: '16px', color: '#18181b' }}>Payment Summary</strong>
    </Paragraph>

    <InfoBox>
      <table width="100%" cellPadding="0" cellSpacing="0">
        <tbody>
          <tr>
            <td style={{ paddingBottom: '8px' }}>
              <span style={{ fontSize: '14px', color: '#52525b' }}>Base Rental</span>
            </td>
            <td align="right" style={{ paddingBottom: '8px' }}>
              <span style={{ fontSize: '14px', color: '#52525b' }}>{formatCurrency(baseRate)}</span>
            </td>
          </tr>

          {addonTotal > 0 && (
            <tr>
              <td style={{ paddingBottom: '8px' }}>
                <span style={{ fontSize: '14px', color: '#52525b' }}>Add-ons</span>
              </td>
              <td align="right" style={{ paddingBottom: '8px' }}>
                <span style={{ fontSize: '14px', color: '#52525b' }}>{formatCurrency(addonTotal)}</span>
              </td>
            </tr>
          )}

          <tr>
            <td style={{ paddingBottom: '8px' }}>
              <span style={{ fontSize: '14px', color: '#52525b' }}>Subtotal</span>
            </td>
            <td align="right" style={{ paddingBottom: '8px' }}>
              <span style={{ fontSize: '14px', color: '#52525b' }}>{formatCurrency(subtotal)}</span>
            </td>
          </tr>

          {taxAmount > 0 && (
            <tr>
              <td style={{ paddingBottom: '12px' }}>
                <span style={{ fontSize: '14px', color: '#52525b' }}>GST (15%)</span>
              </td>
              <td align="right" style={{ paddingBottom: '12px' }}>
                <span style={{ fontSize: '14px', color: '#52525b' }}>{formatCurrency(taxAmount)}</span>
              </td>
            </tr>
          )}

          <tr>
            <td style={{ borderTop: '2px solid #881337', paddingTop: '12px' }}>
              <strong style={{ fontSize: '16px', color: '#18181b' }}>Total Paid</strong>
            </td>
            <td align="right" style={{ borderTop: '2px solid #881337', paddingTop: '12px' }}>
              <strong style={{ fontSize: '16px', color: '#881337' }}>{formatCurrency(totalAmount)}</strong>
            </td>
          </tr>

          <tr>
            <td colSpan={2} style={{ paddingTop: '8px' }}>
              <span style={{ fontSize: '12px', color: '#71717a' }}>
                ✓ Payment processed successfully on {formatDateOnly(confirmedDate)}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </InfoBox>

    <Divider />

    {(deliveryAddress || pickupLocation) && (
      <>
        <Paragraph>
          <strong style={{ fontSize: '16px', color: '#18181b' }}>
            {deliveryAddress ? 'Delivery Address' : 'Pickup Location'}
          </strong>
        </Paragraph>

        <InfoBox>
          {deliveryAddress ? (
            <>
              <Paragraph style={{ marginBottom: '4px' }}>
                {deliveryAddress.addressLine1}
              </Paragraph>
              {deliveryAddress.addressLine2 && (
                <Paragraph style={{ marginBottom: '4px' }}>
                  {deliveryAddress.addressLine2}
                </Paragraph>
              )}
              <Paragraph style={{ marginBottom: '4px' }}>
                {deliveryAddress.city}{deliveryAddress.state && `, ${deliveryAddress.state}`} {deliveryAddress.postalCode}
              </Paragraph>
              <Paragraph style={{ marginBottom: '0' }}>
                {deliveryAddress.country}
              </Paragraph>
            </>
          ) : (
            <Paragraph style={{ marginBottom: '0' }}>
              {pickupLocation}
            </Paragraph>
          )}
        </InfoBox>

        <Divider />
      </>
    )}

    {specialRequests && (
      <>
        <Paragraph>
          <strong style={{ fontSize: '16px', color: '#18181b' }}>Special Requests</strong>
        </Paragraph>

        <InfoBox>
          <Paragraph style={{ marginBottom: '0', fontSize: '13px', color: '#52525b', lineHeight: '20px' }}>
            {specialRequests}
          </Paragraph>
        </InfoBox>

        <Divider />
      </>
    )}

    <HighlightBox>
      <Paragraph style={{ marginBottom: '12px' }}>
        <strong style={{ fontSize: '15px', color: '#881337' }}>What Happens Next?</strong>
      </Paragraph>

      <Paragraph style={{ marginBottom: '8px', fontSize: '14px' }}>
        <strong>1. Preparation:</strong> We'll prepare your {quantity === 1 ? 'cart' : 'carts'} and ensure {quantity === 1 ? 'it is' : 'they are'} in perfect condition
      </Paragraph>

      <Paragraph style={{ marginBottom: '8px', fontSize: '14px' }}>
        <strong>2. Reminder:</strong> We'll send you a reminder 24 hours before your rental start date
      </Paragraph>

      <Paragraph style={{ marginBottom: '8px', fontSize: '14px' }}>
        <strong>3. {deliveryAddress ? 'Delivery' : 'Pickup'}:</strong> {deliveryAddress
          ? 'Your cart(s) will be delivered to your specified address at the scheduled time'
          : 'Please collect your cart(s) from the pickup location at the scheduled time'}
      </Paragraph>

      <Paragraph style={{ marginBottom: '0', fontSize: '14px' }}>
        <strong>4. Support:</strong> Our team is available throughout your rental period if you need any assistance
      </Paragraph>
    </HighlightBox>

    <Paragraph>
      <strong style={{ fontSize: '16px', color: '#18181b' }}>Important Information</strong>
    </Paragraph>

    <InfoBox>
      <Paragraph style={{ marginBottom: '12px', fontSize: '14px' }}>
        <strong>Cancellation Policy:</strong><br />
        <span style={{ fontSize: '13px', color: '#52525b' }}>
          Free cancellation up to 48 hours before your rental start date. Cancellations within 48 hours may incur a 50% cancellation fee. Please contact us to cancel or modify your booking.
        </span>
      </Paragraph>

      <Paragraph style={{ marginBottom: '12px', fontSize: '14px' }}>
        <strong>Operating Instructions:</strong><br />
        <span style={{ fontSize: '13px', color: '#52525b' }}>
          Full operating instructions and safety guidelines will be provided at the time of {deliveryAddress ? 'delivery' : 'pickup'}. Please ensure all operators read and understand these instructions.
        </span>
      </Paragraph>

      <Paragraph style={{ marginBottom: '0', fontSize: '14px' }}>
        <strong>Contact During Rental:</strong><br />
        <span style={{ fontSize: '13px', color: '#52525b' }}>
          If you experience any issues during your rental period, please call us immediately at +64 021 560 307. We're here to help!
        </span>
      </Paragraph>
    </InfoBox>

    <Paragraph style={{ marginTop: '32px' }}>
      <strong style={{ fontSize: '16px', color: '#18181b' }}>Your Contact Information</strong>
    </Paragraph>

    <InfoBox>
      <table width="100%" cellPadding="0" cellSpacing="0">
        <tbody>
          <tr>
            <td style={{ paddingBottom: '8px' }}>
              <strong style={{ fontSize: '13px', color: '#18181b' }}>Email:</strong>
            </td>
            <td align="right" style={{ paddingBottom: '8px' }}>
              <span style={{ fontSize: '13px', color: '#52525b' }}>{customerEmail}</span>
            </td>
          </tr>
          <tr>
            <td>
              <strong style={{ fontSize: '13px', color: '#18181b' }}>Phone:</strong>
            </td>
            <td align="right">
              <span style={{ fontSize: '13px', color: '#52525b' }}>{customerPhone}</span>
            </td>
          </tr>
        </tbody>
      </table>
    </InfoBox>

    <Paragraph style={{ marginTop: '32px' }}>
      If you have any questions about your booking, please don't hesitate to contact us at +64 021 560 307 or reply to this email.
    </Paragraph>

    <Paragraph style={{ marginBottom: '0' }}>
      Thank you for choosing Club Caddy Carts. We look forward to serving you!
    </Paragraph>
  </EmailLayout>
)
