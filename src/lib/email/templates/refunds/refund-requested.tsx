import * as React from 'react'
import { EmailLayout, Heading, Paragraph, Button, Divider, InfoBox, HighlightBox } from '../base-layout'

interface RefundRequestedEmailProps {
  name: string
  orderNumber: string
  refundAmount: number
  requestDate: Date
  reason?: string
  estimatedProcessingTime?: string
}

export const RefundRequestedEmail = ({
  name,
  orderNumber,
  refundAmount,
  requestDate,
  reason,
  estimatedProcessingTime = '5-7 business days',
}: RefundRequestedEmailProps) => (
  <EmailLayout previewText={`Refund Request Received - Order #${orderNumber}`}>
    <Heading>We've Received Your Refund Request</Heading>

    <Paragraph>
      Hello {name},
    </Paragraph>

    <Paragraph>
      Thank you for contacting us. We've received your refund request and our team is currently reviewing it. We understand that sometimes circumstances change, and we're here to help make this process as smooth as possible.
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
            <strong style={{ fontSize: '14px', color: '#18181b' }}>Request Date:</strong>
          </td>
          <td align="right" style={{ paddingBottom: '8px' }}>
            <span style={{ fontSize: '14px', color: '#52525b' }}>
              {requestDate.toLocaleDateString('en-NZ', { dateStyle: 'long' })}
            </span>
          </td>
        </tr>
        <tr>
          <td style={{ paddingBottom: '8px' }}>
            <strong style={{ fontSize: '14px', color: '#18181b' }}>Refund Amount:</strong>
          </td>
          <td align="right" style={{ paddingBottom: '8px' }}>
            <strong style={{ fontSize: '16px', color: '#881337' }}>
              ${refundAmount.toLocaleString('en-NZ', { minimumFractionDigits: 2 })} NZD
            </strong>
          </td>
        </tr>
        {reason && (
          <tr>
            <td colSpan={2} style={{ paddingTop: '12px', borderTop: '1px solid #e4e4e7' }}>
              <strong style={{ fontSize: '14px', color: '#18181b', display: 'block', marginBottom: '8px' }}>Reason:</strong>
              <span style={{ fontSize: '14px', color: '#52525b', display: 'block', lineHeight: '20px' }}>
                {reason}
              </span>
            </td>
          </tr>
        )}
      </table>
    </InfoBox>

    <Divider />

    <Paragraph>
      <strong>What Happens Next?</strong>
    </Paragraph>

    <Paragraph>
      1. <strong>Review Process:</strong> Our team will review your refund request within 1-2 business days<br />
      2. <strong>Verification:</strong> We'll verify the order details and refund eligibility<br />
      3. <strong>Notification:</strong> You'll receive an email once your refund is approved<br />
      4. <strong>Processing:</strong> Approved refunds are processed within {estimatedProcessingTime}<br />
      5. <strong>Completion:</strong> You'll receive confirmation when the refund reaches your account
    </Paragraph>

    <HighlightBox>
      <Paragraph style={{ margin: 0 }}>
        <strong style={{ fontSize: '15px', color: '#881337' }}>Important:</strong><br />
        <span style={{ fontSize: '14px', color: '#52525b', lineHeight: '20px' }}>
          Please allow {estimatedProcessingTime} for us to review your request. We'll contact you if we need any additional information. You'll receive an email update as soon as a decision has been made.
        </span>
      </Paragraph>
    </HighlightBox>

    <Divider />

    <Paragraph>
      <strong>Need to Discuss Your Request?</strong>
    </Paragraph>

    <Paragraph>
      If you have any questions or would like to discuss your refund request further, our team is here to help. You can reach us at:
    </Paragraph>

    <InfoBox>
      <table width="100%" cellPadding="0" cellSpacing="0">
        <tr>
          <td style={{ paddingBottom: '4px' }}>
            <strong style={{ fontSize: '14px', color: '#18181b' }}>Phone:</strong>
          </td>
          <td align="right" style={{ paddingBottom: '4px' }}>
            <a href="tel:+64021560307" style={{ fontSize: '14px', color: '#881337', textDecoration: 'none' }}>
              +64 021 560 307
            </a>
          </td>
        </tr>
        <tr>
          <td>
            <strong style={{ fontSize: '14px', color: '#18181b' }}>Email:</strong>
          </td>
          <td align="right">
            <a href="mailto:admin@clubcaddycarts.com" style={{ fontSize: '14px', color: '#881337', textDecoration: 'none' }}>
              admin@clubcaddycarts.com
            </a>
          </td>
        </tr>
      </table>
    </InfoBox>

    <Paragraph style={{ marginTop: '32px' }}>
      We appreciate your patience as we process your request. Our goal is to resolve this matter promptly and to your satisfaction.
    </Paragraph>

    <Paragraph>
      Kind regards,<br />
      <strong>The Club Caddy Carts Team</strong>
    </Paragraph>
  </EmailLayout>
)
