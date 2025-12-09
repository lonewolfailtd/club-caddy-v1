import * as React from 'react'
import { EmailLayout, Heading, Paragraph, Button, Divider, InfoBox, HighlightBox } from '../base-layout'

interface BookingThankYouEmailProps {
  bookingNumber: string
  customerName: string
  customerEmail: string

  // Product details
  productName: string
  productTier: string
  quantity: number

  // Rental details
  startDate: Date
  endDate: Date

  // Feedback link (could be a survey)
  feedbackUrl?: string
}

const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('en-NZ', {
    dateStyle: 'long',
  }).format(date)
}

export const BookingThankYouEmail = ({
  bookingNumber,
  customerName,
  customerEmail,
  productName,
  productTier,
  quantity,
  startDate,
  endDate,
  feedbackUrl,
}: BookingThankYouEmailProps) => (
  <EmailLayout previewText="Thank you for choosing Club Caddy Carts!">
    <Heading>Thank You for Your Rental!</Heading>

    <Paragraph>
      Hello {customerName},
    </Paragraph>

    <Paragraph>
      Thank you for choosing Club Caddy Carts for your golf cart rental. We hope your {productName} served you well and that you had a fantastic experience!
    </Paragraph>

    <Divider />

    <InfoBox>
      <table width="100%" cellPadding="0" cellSpacing="0">
        <tbody>
          <tr>
            <td style={{ paddingBottom: '8px' }}>
              <span style={{ fontSize: '13px', color: '#881337', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>
                Booking Number
              </span>
            </td>
          </tr>
          <tr>
            <td style={{ paddingBottom: '16px' }}>
              <span style={{ fontSize: '20px', color: '#18181b', fontWeight: 700, fontFamily: 'monospace' }}>
                {bookingNumber}
              </span>
            </td>
          </tr>
          <tr>
            <td>
              <table width="100%" cellPadding="0" cellSpacing="0">
                <tbody>
                  <tr>
                    <td style={{ paddingBottom: '6px' }}>
                      <strong style={{ fontSize: '13px', color: '#18181b' }}>Cart Model:</strong>
                    </td>
                    <td align="right" style={{ paddingBottom: '6px' }}>
                      <span style={{ fontSize: '13px', color: '#52525b' }}>
                        {productName} - {productTier}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td style={{ paddingBottom: '6px' }}>
                      <strong style={{ fontSize: '13px', color: '#18181b' }}>Quantity:</strong>
                    </td>
                    <td align="right" style={{ paddingBottom: '6px' }}>
                      <span style={{ fontSize: '13px', color: '#52525b' }}>
                        {quantity} {quantity === 1 ? 'Cart' : 'Carts'}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong style={{ fontSize: '13px', color: '#18181b' }}>Rental Period:</strong>
                    </td>
                    <td align="right">
                      <span style={{ fontSize: '13px', color: '#52525b' }}>
                        {formatDate(startDate)} - {formatDate(endDate)}
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>
    </InfoBox>

    <Divider />

    <HighlightBox>
      <Paragraph style={{ marginBottom: '12px', textAlign: 'center' }}>
        <strong style={{ fontSize: '18px', color: '#881337' }}>We'd Love Your Feedback!</strong>
      </Paragraph>

      <Paragraph style={{ marginBottom: '20px', textAlign: 'center', fontSize: '14px' }}>
        Your experience matters to us. Please take a moment to share your thoughts about your rental. Your feedback helps us improve our service and helps other customers make informed decisions.
      </Paragraph>

      {feedbackUrl ? (
        <div style={{ textAlign: 'center' }}>
          <a
            href={feedbackUrl}
            style={{
              display: 'inline-block',
              padding: '14px 32px',
              backgroundColor: '#881337',
              color: '#ffffff',
              textDecoration: 'none',
              borderRadius: '2px',
              fontSize: '14px',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}
          >
            Share Your Feedback
          </a>
        </div>
      ) : (
        <Paragraph style={{ marginBottom: '0', textAlign: 'center', fontSize: '14px' }}>
          Simply reply to this email with your thoughts, suggestions, or any questions you may have.
        </Paragraph>
      )}
    </HighlightBox>

    <Divider />

    <Paragraph>
      <strong style={{ fontSize: '16px', color: '#18181b' }}>Planning Your Next Rental?</strong>
    </Paragraph>

    <Paragraph>
      We'd love to serve you again! Whether it's for another event, work function, or golf day, we're here to provide you with the same great service.
    </Paragraph>

    <HighlightBox>
      <table width="100%" cellPadding="0" cellSpacing="0">
        <tbody>
          <tr>
            <td style={{ textAlign: 'center', paddingBottom: '16px' }}>
              <span style={{ fontSize: '20px', color: '#881337', fontWeight: 700 }}>
                10% OFF
              </span>
            </td>
          </tr>
          <tr>
            <td style={{ textAlign: 'center', paddingBottom: '12px' }}>
              <span style={{ fontSize: '15px', color: '#18181b', fontWeight: 600 }}>
                Your Next Rental
              </span>
            </td>
          </tr>
          <tr>
            <td style={{ textAlign: 'center', paddingBottom: '16px' }}>
              <div style={{
                display: 'inline-block',
                padding: '12px 24px',
                backgroundColor: '#fafafa',
                border: '2px dashed #881337',
                borderRadius: '2px',
              }}>
                <span style={{
                  fontSize: '18px',
                  color: '#881337',
                  fontWeight: 700,
                  fontFamily: 'monospace',
                  letterSpacing: '0.05em',
                }}>
                  RETURN10
                </span>
              </div>
            </td>
          </tr>
          <tr>
            <td style={{ textAlign: 'center' }}>
              <span style={{ fontSize: '13px', color: '#71717a' }}>
                Use this code at checkout for 10% off your next booking<br />
                Valid for 6 months • One-time use
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </HighlightBox>

    <Divider />

    <Paragraph>
      <strong style={{ fontSize: '16px', color: '#18181b' }}>Why Choose Club Caddy Again?</strong>
    </Paragraph>

    <InfoBox>
      <Paragraph style={{ marginBottom: '12px', fontSize: '14px' }}>
        <strong style={{ color: '#881337' }}>✓ Premium Electric Carts</strong><br />
        <span style={{ fontSize: '13px', color: '#52525b' }}>
          Top-quality golf carts for events, work functions, and competitions
        </span>
      </Paragraph>

      <Paragraph style={{ marginBottom: '12px', fontSize: '14px' }}>
        <strong style={{ color: '#881337' }}>✓ Flexible Rental Options</strong><br />
        <span style={{ fontSize: '13px', color: '#52525b' }}>
          Hourly, daily, weekly rentals - choose what works for you
        </span>
      </Paragraph>

      <Paragraph style={{ marginBottom: '12px', fontSize: '14px' }}>
        <strong style={{ color: '#881337' }}>✓ Competitive Pricing</strong><br />
        <span style={{ fontSize: '13px', color: '#52525b' }}>
          Affordable rates with special discounts for multi-cart bookings
        </span>
      </Paragraph>

      <Paragraph style={{ marginBottom: '0', fontSize: '14px' }}>
        <strong style={{ color: '#881337' }}>✓ Outstanding Support</strong><br />
        <span style={{ fontSize: '13px', color: '#52525b' }}>
          Our team is always here to help make your rental experience perfect
        </span>
      </Paragraph>
    </InfoBox>

    <div style={{ textAlign: 'center', margin: '32px 0' }}>
      <a
        href={`https://clubcaddycarts.com/booking?promo=RETURN10`}
        style={{
          display: 'inline-block',
          padding: '14px 32px',
          backgroundColor: '#881337',
          color: '#ffffff',
          textDecoration: 'none',
          borderRadius: '2px',
          fontSize: '14px',
          fontWeight: 600,
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
        }}
      >
        Book Your Next Rental
      </a>
    </div>

    <Divider />

    <Paragraph>
      <strong style={{ fontSize: '16px', color: '#18181b' }}>Refer a Friend</strong>
    </Paragraph>

    <Paragraph>
      Know someone who could benefit from our golf cart rentals? Share the Club Caddy experience! When your friends book their first rental, they'll get 5% off, and you'll receive a special thank you from us.
    </Paragraph>

    <InfoBox>
      <Paragraph style={{ marginBottom: '8px', textAlign: 'center', fontSize: '14px' }}>
        <strong>Share the love:</strong>
      </Paragraph>
      <Paragraph style={{ marginBottom: '0', textAlign: 'center', fontSize: '13px', color: '#71717a' }}>
        Simply have them mention your name ({customerName}) when they book,<br />
        or forward this email to anyone who might be interested!
      </Paragraph>
    </InfoBox>

    <Divider />

    <Paragraph>
      <strong style={{ fontSize: '16px', color: '#18181b' }}>Stay Connected</strong>
    </Paragraph>

    <Paragraph>
      Follow us on social media for:
    </Paragraph>

    <InfoBox>
      <Paragraph style={{ marginBottom: '6px', fontSize: '14px' }}>
        • Special promotions and seasonal discounts
      </Paragraph>
      <Paragraph style={{ marginBottom: '6px', fontSize: '14px' }}>
        • Tips for getting the most out of your golf cart rental
      </Paragraph>
      <Paragraph style={{ marginBottom: '6px', fontSize: '14px' }}>
        • Customer stories and testimonials
      </Paragraph>
      <Paragraph style={{ marginBottom: '0', fontSize: '14px' }}>
        • New product announcements
      </Paragraph>
    </InfoBox>

    <Divider />

    <Paragraph style={{ marginTop: '32px' }}>
      Thank you once again for choosing Club Caddy Carts. We truly appreciate your business and hope to serve you again soon!
    </Paragraph>

    <Paragraph>
      If you have any questions or need assistance with a future booking, please don't hesitate to reach out:
    </Paragraph>

    <InfoBox>
      <Paragraph style={{ marginBottom: '8px', textAlign: 'center' }}>
        <strong style={{ fontSize: '14px', color: '#18181b' }}>Contact Us</strong>
      </Paragraph>
      <Paragraph style={{ marginBottom: '4px', textAlign: 'center' }}>
        <a href="tel:+64021560307" style={{
          fontSize: '15px',
          color: '#881337',
          textDecoration: 'none',
          fontWeight: 600,
        }}>
          +64 021 560 307
        </a>
      </Paragraph>
      <Paragraph style={{ marginBottom: '0', textAlign: 'center' }}>
        <a href="mailto:admin@clubcaddycarts.com" style={{
          fontSize: '14px',
          color: '#881337',
          textDecoration: 'none',
        }}>
          admin@clubcaddycarts.com
        </a>
      </Paragraph>
    </InfoBox>

    <Paragraph style={{ marginTop: '24px', marginBottom: '0' }}>
      Warm regards,<br />
      <strong>The Club Caddy Team</strong>
    </Paragraph>
  </EmailLayout>
)
