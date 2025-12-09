import * as React from 'react'
import { EmailLayout, Heading, Paragraph, Button, Divider, InfoBox, HighlightBox } from '../base-layout'

interface DeliveryAddress {
  addressLine1: string
  addressLine2?: string
  city: string
  state?: string
  postalCode: string
  country: string
}

interface BookingReminderEmailProps {
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

  // Delivery/Pickup
  deliveryAddress?: DeliveryAddress
  pickupLocation?: string
  specialRequests?: string
}

const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('en-NZ', {
    dateStyle: 'full',
    timeStyle: 'short',
  }).format(date)
}

const formatTime = (date: Date) => {
  return new Intl.DateTimeFormat('en-NZ', {
    timeStyle: 'short',
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

export const BookingReminderEmail = ({
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
  deliveryAddress,
  pickupLocation,
  specialRequests,
}: BookingReminderEmailProps) => (
  <EmailLayout previewText={`Reminder: Your rental starts tomorrow - ${bookingNumber}`}>
    <Heading>Your Rental Starts Tomorrow!</Heading>

    <Paragraph>
      Hello {customerName},
    </Paragraph>

    <Paragraph>
      This is a friendly reminder that your golf cart rental begins tomorrow. We're excited to serve you and want to make sure everything goes smoothly!
    </Paragraph>

    <Divider />

    <HighlightBox>
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
              <span style={{ fontSize: '24px', color: '#18181b', fontWeight: 700, fontFamily: 'monospace' }}>
                {bookingNumber}
              </span>
            </td>
          </tr>
          <tr>
            <td>
              <span style={{ fontSize: '14px', color: '#881337', fontWeight: 600 }}>
                {deliveryAddress ? '🚚 Delivery' : '📍 Pickup'} starts at {formatTime(startDate)}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </HighlightBox>

    <Divider />

    <Paragraph>
      <strong style={{ fontSize: '16px', color: '#18181b' }}>Rental Summary</strong>
    </Paragraph>

    <InfoBox>
      <table width="100%" cellPadding="0" cellSpacing="0">
        <tbody>
          <tr>
            <td style={{ paddingBottom: '16px' }}>
              <strong style={{ fontSize: '14px', color: '#18181b' }}>Golf Cart:</strong><br />
              <span style={{ fontSize: '15px', color: '#881337', fontWeight: 600 }}>
                {productName} - {productTier} Edition
              </span>
            </td>
          </tr>

          <tr>
            <td style={{ paddingBottom: '12px' }}>
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
            <td style={{ paddingBottom: '12px' }}>
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
              <strong style={{ fontSize: '14px', color: '#18181b' }}>Rental Period:</strong>
            </td>
          </tr>

          <tr>
            <td style={{ paddingBottom: '6px' }}>
              <span style={{ fontSize: '13px', color: '#52525b' }}>
                <strong>Start:</strong> {formatDate(startDate)}
              </span>
            </td>
          </tr>

          <tr>
            <td>
              <span style={{ fontSize: '13px', color: '#52525b' }}>
                <strong>End:</strong> {formatDate(endDate)}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </InfoBox>

    <Divider />

    <Paragraph>
      <strong style={{ fontSize: '16px', color: '#18181b' }}>
        {deliveryAddress ? 'Delivery Details' : 'Pickup Details'}
      </strong>
    </Paragraph>

    <InfoBox>
      {deliveryAddress ? (
        <>
          <Paragraph style={{ marginBottom: '12px', fontSize: '14px' }}>
            <strong style={{ color: '#881337' }}>Your cart{quantity > 1 ? 's' : ''} will be delivered to:</strong>
          </Paragraph>
          <Paragraph style={{ marginBottom: '4px', fontSize: '14px' }}>
            {deliveryAddress.addressLine1}
          </Paragraph>
          {deliveryAddress.addressLine2 && (
            <Paragraph style={{ marginBottom: '4px', fontSize: '14px' }}>
              {deliveryAddress.addressLine2}
            </Paragraph>
          )}
          <Paragraph style={{ marginBottom: '4px', fontSize: '14px' }}>
            {deliveryAddress.city}{deliveryAddress.state && `, ${deliveryAddress.state}`} {deliveryAddress.postalCode}
          </Paragraph>
          <Paragraph style={{ marginBottom: '16px', fontSize: '14px' }}>
            {deliveryAddress.country}
          </Paragraph>
          <Paragraph style={{ marginBottom: '0', fontSize: '13px', color: '#71717a' }}>
            Please ensure someone is available to receive the delivery at the scheduled time. We'll call you when we're 15 minutes away.
          </Paragraph>
        </>
      ) : (
        <>
          <Paragraph style={{ marginBottom: '12px', fontSize: '14px' }}>
            <strong style={{ color: '#881337' }}>Please collect your cart{quantity > 1 ? 's' : ''} from:</strong>
          </Paragraph>
          <Paragraph style={{ marginBottom: '16px', fontSize: '14px' }}>
            {pickupLocation || 'Our location (address will be confirmed via phone)'}
          </Paragraph>
          <Paragraph style={{ marginBottom: '0', fontSize: '13px', color: '#71717a' }}>
            Please arrive at the scheduled time. If you need to adjust your pickup time, contact us as soon as possible.
          </Paragraph>
        </>
      )}
    </InfoBox>

    <Divider />

    {specialRequests && (
      <>
        <Paragraph>
          <strong style={{ fontSize: '16px', color: '#18181b' }}>Your Special Requests</strong>
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
        <strong style={{ fontSize: '15px', color: '#881337' }}>Important Reminders</strong>
      </Paragraph>

      <Paragraph style={{ marginBottom: '8px', fontSize: '14px' }}>
        <strong>Before Operating:</strong> Our team will provide full operating instructions and safety guidelines at {deliveryAddress ? 'delivery' : 'pickup'}. Please ensure all operators review this information.
      </Paragraph>

      <Paragraph style={{ marginBottom: '8px', fontSize: '14px' }}>
        <strong>Contact Information:</strong> Keep our contact details handy. If you experience any issues during your rental, call us immediately at +64 021 560 307.
      </Paragraph>

      <Paragraph style={{ marginBottom: '8px', fontSize: '14px' }}>
        <strong>Weather Considerations:</strong> While our carts are designed for outdoor use, please exercise caution in extreme weather conditions. Contact us if you have concerns.
      </Paragraph>

      <Paragraph style={{ marginBottom: '0', fontSize: '14px' }}>
        <strong>Return Condition:</strong> Please return {quantity === 1 ? 'the cart' : 'all carts'} in the same condition as received. Clean and charged {quantity === 1 ? 'cart returns help' : 'carts help'} us serve the next customer promptly.
      </Paragraph>
    </HighlightBox>

    <Divider />

    <Paragraph>
      <strong style={{ fontSize: '16px', color: '#18181b' }}>What to Expect</strong>
    </Paragraph>

    <InfoBox>
      <Paragraph style={{ marginBottom: '12px', fontSize: '14px' }}>
        <strong>At {deliveryAddress ? 'Delivery' : 'Pickup'}:</strong><br />
        <span style={{ fontSize: '13px', color: '#52525b' }}>
          • Complete operating instructions and safety briefing<br />
          • Battery charging instructions<br />
          • Emergency contact information<br />
          • Quick inspection to ensure cart{quantity > 1 ? 's are' : ' is'} in perfect condition
        </span>
      </Paragraph>

      <Paragraph style={{ marginBottom: '0', fontSize: '14px' }}>
        <strong>During Your Rental:</strong><br />
        <span style={{ fontSize: '13px', color: '#52525b' }}>
          • Our support team is available if you need assistance<br />
          • Report any issues immediately so we can help resolve them<br />
          • Enjoy your experience with our premium electric golf carts!
        </span>
      </Paragraph>
    </InfoBox>

    <Divider />

    <Paragraph>
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
      <strong style={{ fontSize: '15px' }}>Need to Make Changes?</strong>
    </Paragraph>

    <Paragraph>
      If you need to adjust your {deliveryAddress ? 'delivery' : 'pickup'} time or have any questions, please contact us as soon as possible:
    </Paragraph>

    <InfoBox>
      <Paragraph style={{ marginBottom: '8px', textAlign: 'center' }}>
        <a href="tel:+64021560307" style={{
          fontSize: '18px',
          color: '#881337',
          textDecoration: 'none',
          fontWeight: 600,
        }}>
          +64 021 560 307
        </a>
      </Paragraph>
      <Paragraph style={{ marginBottom: '0', textAlign: 'center', fontSize: '13px', color: '#71717a' }}>
        Available 7 days a week, 8am - 8pm
      </Paragraph>
    </InfoBox>

    <Paragraph style={{ marginTop: '32px' }}>
      We're looking forward to providing you with an excellent rental experience. See you tomorrow!
    </Paragraph>

    <Paragraph style={{ marginBottom: '0' }}>
      The Club Caddy Team
    </Paragraph>
  </EmailLayout>
)
