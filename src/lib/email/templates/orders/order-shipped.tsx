import * as React from 'react'
import { EmailLayout, Heading, Paragraph, Button, Divider, HighlightBox } from '../base-layout'

interface OrderShippedEmailProps {
  name: string
  orderNumber: string
  trackingNumber?: string
  trackingUrl?: string
  carrier?: string
  estimatedDeliveryDate?: string
  shippingAddress: {
    street: string
    city: string
    postcode: string
    country: string
  }
}

export const OrderShippedEmail = ({
  name,
  orderNumber,
  trackingNumber,
  trackingUrl,
  carrier = 'Our Delivery Team',
  estimatedDeliveryDate,
  shippingAddress,
}: OrderShippedEmailProps) => (
  <EmailLayout previewText={`Your order #${orderNumber} has been shipped!`}>
    <Heading>Your Golf Cart is On the Way!</Heading>

    <Paragraph>
      Hello {name},
    </Paragraph>

    <Paragraph>
      Excellent news! Your premium electric golf cart has been shipped and is on its way to you. We've taken great care in preparing your cart for delivery.
    </Paragraph>

    <Divider />

    <HighlightBox>
      <Paragraph style={{ margin: '0 0 12px' }}>
        <strong style={{ color: '#881337', fontSize: '16px' }}>Shipment Details</strong>
      </Paragraph>
      <table width="100%" cellPadding="0" cellSpacing="0">
        <tr>
          <td style={{ paddingBottom: '8px' }}>
            <strong style={{ fontSize: '14px', color: '#18181b' }}>Order Number:</strong>
          </td>
          <td align="right" style={{ paddingBottom: '8px' }}>
            <span style={{ fontSize: '14px', color: '#52525b', fontFamily: 'monospace' }}>#{orderNumber}</span>
          </td>
        </tr>
        {trackingNumber && (
          <tr>
            <td style={{ paddingBottom: '8px' }}>
              <strong style={{ fontSize: '14px', color: '#18181b' }}>Tracking Number:</strong>
            </td>
            <td align="right" style={{ paddingBottom: '8px' }}>
              <span style={{ fontSize: '14px', color: '#52525b', fontFamily: 'monospace' }}>{trackingNumber}</span>
            </td>
          </tr>
        )}
        <tr>
          <td style={{ paddingBottom: '8px' }}>
            <strong style={{ fontSize: '14px', color: '#18181b' }}>Carrier:</strong>
          </td>
          <td align="right" style={{ paddingBottom: '8px' }}>
            <span style={{ fontSize: '14px', color: '#52525b' }}>{carrier}</span>
          </td>
        </tr>
        {estimatedDeliveryDate && (
          <tr>
            <td>
              <strong style={{ fontSize: '14px', color: '#18181b' }}>Estimated Delivery:</strong>
            </td>
            <td align="right">
              <span style={{ fontSize: '14px', color: '#881337', fontWeight: 600 }}>{estimatedDeliveryDate}</span>
            </td>
          </tr>
        )}
      </table>
    </HighlightBox>

    {trackingUrl && (
      <Button href={trackingUrl}>
        Track Your Shipment
      </Button>
    )}

    <Divider />

    <Paragraph>
      <strong>Delivery Address:</strong>
    </Paragraph>

    <Paragraph style={{ fontSize: '14px', lineHeight: '20px' }}>
      {shippingAddress.street}<br />
      {shippingAddress.city} {shippingAddress.postcode}<br />
      {shippingAddress.country}
    </Paragraph>

    <Divider />

    <Paragraph>
      <strong>Preparing for Delivery:</strong>
    </Paragraph>

    <Paragraph>
      • Ensure someone is available to receive the delivery<br />
      • Clear access space is required for unloading<br />
      • Our team will contact you prior to delivery<br />
      • Final payment must be completed before handover<br />
      • Inspection and test drive included upon delivery
    </Paragraph>

    <Paragraph style={{ marginTop: '32px' }}>
      We'll send you another email once your cart has been delivered. If you have any questions, please contact us at +64 021 560 307.
    </Paragraph>
  </EmailLayout>
)
