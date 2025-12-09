import * as React from 'react'
import { EmailLayout, Heading, Paragraph, Button, Divider, InfoBox, HighlightBox } from '../base-layout'

interface PaymentReceivedEmailProps {
  name: string
  orderNumber: string
  paymentDate: Date
  paymentAmount: number
  paymentMethod: string
  totalPaid: number
  orderTotal: number
  receiptUrl?: string
  trackingUrl?: string
  estimatedDelivery?: string
}

export const PaymentReceivedEmail = ({
  name,
  orderNumber,
  paymentDate,
  paymentAmount,
  paymentMethod,
  totalPaid,
  orderTotal,
  receiptUrl,
  trackingUrl,
  estimatedDelivery = '1-2 weeks',
}: PaymentReceivedEmailProps) => (
  <EmailLayout previewText={`Payment Received for Order #${orderNumber}`}>
    <Heading>Final Payment Received</Heading>

    <Paragraph>
      Hello {name},
    </Paragraph>

    <Paragraph>
      Excellent news! We've received your final payment and your order is now fully paid. Your custom golf cart is ready for final quality checks and delivery preparation.
    </Paragraph>

    <Divider />

    <InfoBox>
      <table width="100%" cellPadding="0" cellSpacing="0">
        <tr>
          <td style={{ paddingBottom: '8px' }}>
            <strong style={{ fontSize: '14px', color: '#18181b' }}>Order Number:</strong>
          </td>
          <td align="right" style={{ paddingBottom: '8px' }}>
            <span style={{ fontSize: '14px', color: '#52525b', fontFamily: 'monospace' }}>#{orderNumber}</span>
          </td>
        </tr>
        <tr>
          <td style={{ paddingBottom: '8px' }}>
            <strong style={{ fontSize: '14px', color: '#18181b' }}>Payment Date:</strong>
          </td>
          <td align="right" style={{ paddingBottom: '8px' }}>
            <span style={{ fontSize: '14px', color: '#52525b' }}>
              {paymentDate.toLocaleDateString('en-NZ', { dateStyle: 'long' })}
            </span>
          </td>
        </tr>
        <tr>
          <td>
            <strong style={{ fontSize: '14px', color: '#18181b' }}>Payment Method:</strong>
          </td>
          <td align="right">
            <span style={{ fontSize: '14px', color: '#52525b' }}>{paymentMethod}</span>
          </td>
        </tr>
      </table>
    </InfoBox>

    <Divider />

    <Paragraph>
      <strong>Payment Summary</strong>
    </Paragraph>

    <table width="100%" cellPadding="0" cellSpacing="0" style={{ marginTop: '20px' }}>
      <tr>
        <td style={{ padding: '8px 0' }}>
          <span style={{ fontSize: '14px', color: '#52525b' }}>This Payment:</span>
        </td>
        <td align="right" style={{ padding: '8px 0' }}>
          <strong style={{ fontSize: '15px', color: '#15803d' }}>
            ${paymentAmount.toLocaleString('en-NZ', { minimumFractionDigits: 2 })}
          </strong>
        </td>
      </tr>
      <tr>
        <td style={{ padding: '8px 0' }}>
          <span style={{ fontSize: '14px', color: '#52525b' }}>Total Paid:</span>
        </td>
        <td align="right" style={{ padding: '8px 0' }}>
          <span style={{ fontSize: '14px', color: '#18181b' }}>
            ${totalPaid.toLocaleString('en-NZ', { minimumFractionDigits: 2 })}
          </span>
        </td>
      </tr>
      <tr>
        <td style={{ padding: '12px 0', borderTop: '2px solid #18181b' }}>
          <strong style={{ fontSize: '16px', color: '#18181b' }}>Order Total:</strong>
        </td>
        <td align="right" style={{ padding: '12px 0', borderTop: '2px solid #18181b' }}>
          <strong style={{ fontSize: '18px', color: '#881337' }}>
            ${orderTotal.toLocaleString('en-NZ', { minimumFractionDigits: 2 })} NZD
          </strong>
        </td>
      </tr>
      <tr>
        <td colSpan={2} style={{ paddingTop: '12px' }}>
          <div style={{
            backgroundColor: '#dcfce7',
            border: '1px solid #86efac',
            borderRadius: '2px',
            padding: '12px',
            textAlign: 'center',
          }}>
            <strong style={{ fontSize: '14px', color: '#15803d' }}>
              PAID IN FULL ✓
            </strong>
          </div>
        </td>
      </tr>
    </table>

    {receiptUrl && (
      <Button href={receiptUrl}>
        Download Receipt
      </Button>
    )}

    <Divider />

    <HighlightBox>
      <Paragraph style={{ margin: 0 }}>
        <strong style={{ fontSize: '15px', color: '#881337' }}>Estimated Delivery: {estimatedDelivery}</strong>
      </Paragraph>
      <Paragraph style={{ marginBottom: 0 }}>
        Your cart is entering our final quality assurance process. We'll notify you as soon as it's ready for delivery or collection.
      </Paragraph>
    </HighlightBox>

    {trackingUrl && (
      <Button href={trackingUrl}>
        Track Your Order
      </Button>
    )}

    <Divider />

    <Paragraph>
      <strong>What Happens Next?</strong>
    </Paragraph>

    <Paragraph>
      1. <strong>Final Quality Checks:</strong> Comprehensive inspection of all components<br />
      2. <strong>Customisation Verification:</strong> Ensuring all custom features meet specifications<br />
      3. <strong>Preparation:</strong> Cleaning, charging, and preparing for delivery<br />
      4. <strong>Delivery Scheduling:</strong> We'll contact you to arrange delivery or collection<br />
      5. <strong>Handover:</strong> Your cart arrives ready to enjoy!
    </Paragraph>

    <Divider />

    <Paragraph style={{ marginTop: '32px' }}>
      Thank you for your payment and for choosing Club Caddy Carts. We're excited to get your premium golf cart into your hands very soon!
    </Paragraph>

    <Paragraph>
      If you have any questions about your order or delivery, please contact us at +64 021 560 307 or reply to this email.
    </Paragraph>
  </EmailLayout>
)
