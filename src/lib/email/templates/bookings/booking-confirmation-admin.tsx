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

interface BookingConfirmationAdminEmailProps {
  bookingNumber: string
  bookingId: string
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

  // Payment
  stripePaymentIntentId: string
  paidAt: Date
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

const getRentalTypeLabel = (type: string) => {
  const labels: Record<string, string> = {
    hourly: 'Hourly',
    daily: 'Daily',
    weekly: 'Weekly',
    custom: 'Custom Period',
  }
  return labels[type] || type
}

export const BookingConfirmationAdminEmail = ({
  bookingNumber,
  bookingId,
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
  stripePaymentIntentId,
  paidAt,
}: BookingConfirmationAdminEmailProps) => (
  <EmailLayout previewText={`New Booking - ${bookingNumber} - ${customerName}`}>
    <Heading>New Booking Received</Heading>

    <Paragraph>
      A new booking has been confirmed and paid. Please review the details below and prepare the cart(s) for the scheduled rental period.
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
            <td style={{ paddingBottom: '8px' }}>
              <span style={{ fontSize: '24px', color: '#18181b', fontWeight: 700, fontFamily: 'monospace' }}>
                {bookingNumber}
              </span>
            </td>
          </tr>
          <tr>
            <td style={{ paddingBottom: '8px' }}>
              <span style={{ fontSize: '12px', color: '#71717a' }}>
                Booking ID: {bookingId}
              </span>
            </td>
          </tr>
          <tr>
            <td>
              <span style={{ fontSize: '12px', color: '#71717a' }}>
                Payment Intent: {stripePaymentIntentId}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </HighlightBox>

    <Divider />

    <Paragraph>
      <strong style={{ fontSize: '16px', color: '#18181b' }}>Customer Information</strong>
    </Paragraph>

    <InfoBox>
      <table width="100%" cellPadding="0" cellSpacing="0">
        <tbody>
          <tr>
            <td style={{ paddingBottom: '12px' }}>
              <strong style={{ fontSize: '15px', color: '#18181b' }}>Name:</strong><br />
              <span style={{ fontSize: '14px', color: '#52525b' }}>{customerName}</span>
            </td>
          </tr>

          <tr>
            <td style={{ paddingBottom: '12px' }}>
              <strong style={{ fontSize: '14px', color: '#18181b' }}>Email:</strong><br />
              <a href={`mailto:${customerEmail}`} style={{ fontSize: '14px', color: '#881337', textDecoration: 'none' }}>
                {customerEmail}
              </a>
            </td>
          </tr>

          <tr>
            <td>
              <strong style={{ fontSize: '14px', color: '#18181b' }}>Phone:</strong><br />
              <a href={`tel:${customerPhone}`} style={{ fontSize: '14px', color: '#881337', textDecoration: 'none' }}>
                {customerPhone}
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    </InfoBox>

    <Divider />

    <Paragraph>
      <strong style={{ fontSize: '16px', color: '#18181b' }}>Rental Details</strong>
    </Paragraph>

    <InfoBox>
      <table width="100%" cellPadding="0" cellSpacing="0">
        <tbody>
          <tr>
            <td style={{ paddingBottom: '16px' }} colSpan={2}>
              <strong style={{ fontSize: '14px', color: '#18181b' }}>Product:</strong><br />
              <span style={{ fontSize: '15px', color: '#881337', fontWeight: 600 }}>
                {productName} - {productTier} Edition
              </span>
            </td>
          </tr>

          <tr>
            <td style={{ paddingBottom: '8px' }}>
              <strong style={{ fontSize: '13px', color: '#18181b' }}>Quantity:</strong>
            </td>
            <td align="right" style={{ paddingBottom: '8px' }}>
              <span style={{ fontSize: '13px', color: '#52525b', fontWeight: 600 }}>
                {quantity} {quantity === 1 ? 'Cart' : 'Carts'}
              </span>
            </td>
          </tr>

          <tr>
            <td style={{ paddingBottom: '8px' }}>
              <strong style={{ fontSize: '13px', color: '#18181b' }}>Rental Type:</strong>
            </td>
            <td align="right" style={{ paddingBottom: '8px' }}>
              <span style={{ fontSize: '13px', color: '#52525b' }}>
                {getRentalTypeLabel(rentalType)}
              </span>
            </td>
          </tr>

          <tr>
            <td style={{ paddingBottom: '8px' }}>
              <strong style={{ fontSize: '13px', color: '#18181b' }}>Start:</strong>
            </td>
            <td align="right" style={{ paddingBottom: '8px' }}>
              <span style={{ fontSize: '13px', color: '#52525b' }}>
                {formatDate(startDate)}
              </span>
            </td>
          </tr>

          <tr>
            <td style={{ paddingBottom: '8px' }}>
              <strong style={{ fontSize: '13px', color: '#18181b' }}>End:</strong>
            </td>
            <td align="right" style={{ paddingBottom: '8px' }}>
              <span style={{ fontSize: '13px', color: '#52525b' }}>
                {formatDate(endDate)}
              </span>
            </td>
          </tr>

          {(durationHours || durationDays) && (
            <tr>
              <td style={{ paddingBottom: '8px' }}>
                <strong style={{ fontSize: '13px', color: '#18181b' }}>Duration:</strong>
              </td>
              <td align="right" style={{ paddingBottom: '8px' }}>
                <span style={{ fontSize: '13px', color: '#52525b' }}>
                  {durationDays && `${durationDays} ${durationDays === 1 ? 'Day' : 'Days'}`}
                  {durationHours && !durationDays && `${durationHours} Hours`}
                </span>
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

    {(deliveryAddress || pickupLocation) && (
      <>
        <Paragraph>
          <strong style={{ fontSize: '16px', color: '#18181b' }}>
            {deliveryAddress ? 'Delivery Required' : 'Customer Pickup'}
          </strong>
        </Paragraph>

        <InfoBox>
          {deliveryAddress ? (
            <>
              <Paragraph style={{ marginBottom: '4px', fontSize: '14px' }}>
                <strong>Delivery Address:</strong>
              </Paragraph>
              <Paragraph style={{ marginBottom: '4px', fontSize: '13px', color: '#52525b' }}>
                {deliveryAddress.addressLine1}
              </Paragraph>
              {deliveryAddress.addressLine2 && (
                <Paragraph style={{ marginBottom: '4px', fontSize: '13px', color: '#52525b' }}>
                  {deliveryAddress.addressLine2}
                </Paragraph>
              )}
              <Paragraph style={{ marginBottom: '4px', fontSize: '13px', color: '#52525b' }}>
                {deliveryAddress.city}{deliveryAddress.state && `, ${deliveryAddress.state}`} {deliveryAddress.postalCode}
              </Paragraph>
              <Paragraph style={{ marginBottom: '0', fontSize: '13px', color: '#52525b' }}>
                {deliveryAddress.country}
              </Paragraph>
            </>
          ) : (
            <>
              <Paragraph style={{ marginBottom: '4px', fontSize: '14px' }}>
                <strong>Pickup Location:</strong>
              </Paragraph>
              <Paragraph style={{ marginBottom: '0', fontSize: '13px', color: '#52525b' }}>
                {pickupLocation}
              </Paragraph>
            </>
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

        <HighlightBox>
          <Paragraph style={{ marginBottom: '0', fontSize: '13px', color: '#52525b', lineHeight: '20px' }}>
            {specialRequests}
          </Paragraph>
        </HighlightBox>

        <Divider />
      </>
    )}

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
            <td colSpan={2} style={{ paddingTop: '12px' }}>
              <span style={{ fontSize: '12px', color: '#71717a' }}>
                ✓ Payment received via Stripe on {formatDate(paidAt)}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </InfoBox>

    <Divider />

    <HighlightBox>
      <Paragraph style={{ marginBottom: '12px' }}>
        <strong style={{ fontSize: '15px', color: '#881337' }}>Action Required</strong>
      </Paragraph>

      <Paragraph style={{ marginBottom: '8px', fontSize: '14px' }}>
        <strong>1. Inventory:</strong> Ensure {quantity} {productTier} {quantity === 1 ? 'cart is' : 'carts are'} available and reserved
      </Paragraph>

      <Paragraph style={{ marginBottom: '8px', fontSize: '14px' }}>
        <strong>2. Preparation:</strong> Inspect and prepare {quantity === 1 ? 'cart' : 'carts'} before rental start date
      </Paragraph>

      <Paragraph style={{ marginBottom: '8px', fontSize: '14px' }}>
        <strong>3. {deliveryAddress ? 'Delivery Schedule' : 'Pickup Coordination'}:</strong> {deliveryAddress
          ? 'Arrange delivery to the customer address'
          : 'Confirm pickup location and time with customer'}
      </Paragraph>

      <Paragraph style={{ marginBottom: '8px', fontSize: '14px' }}>
        <strong>4. Customer Contact:</strong> Contact customer 24-48 hours before start date to confirm details
      </Paragraph>

      {selectedAddons && selectedAddons.length > 0 && (
        <Paragraph style={{ marginBottom: '0', fontSize: '14px' }}>
          <strong>5. Add-ons:</strong> Ensure all requested add-ons are prepared and included
        </Paragraph>
      )}
    </HighlightBox>

    <Paragraph style={{ marginTop: '32px', marginBottom: '0' }}>
      This is an automated notification. For admin dashboard access and booking management, please log in to your admin panel.
    </Paragraph>
  </EmailLayout>
)
