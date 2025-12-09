import * as React from 'react'
import { EmailLayout, Heading, Paragraph, Button, Divider, InfoBox, HighlightBox } from '../base-layout'

interface RefundApprovedEmailProps {
  name: string
  orderNumber: string
  refundAmount: number
  approvalDate: Date
  originalPaymentMethod: string
  estimatedProcessingTime?: string
  accountDetailsLast4?: string
}

export const RefundApprovedEmail = ({
  name,
  orderNumber,
  refundAmount,
  approvalDate,
  originalPaymentMethod,
  estimatedProcessingTime = '5-7 business days',
  accountDetailsLast4,
}: RefundApprovedEmailProps) => (
  <EmailLayout previewText={`Refund Approved - Order #${orderNumber}`}>
    <Heading>Your Refund Has Been Approved</Heading>

    <Paragraph>
      Hello {name},
    </Paragraph>

    <Paragraph>
      Good news! We've reviewed your refund request and we're pleased to confirm that it has been approved. Your refund is now being processed and will be returned to your original payment method.
    </Paragraph>

    <Divider />

    <HighlightBox>
      <table width="100%" cellPadding="0" cellSpacing="0">
        <tr>
          <td style={{ paddingBottom: '12px' }}>
            <strong style={{ fontSize: '16px', color: '#881337', display: 'block' }}>Refund Amount</strong>
          </td>
        </tr>
        <tr>
          <td>
            <strong style={{ fontSize: '32px', color: '#18181b', fontFamily: "'Playfair Display', serif" }}>
              ${refundAmount.toLocaleString('en-NZ', { minimumFractionDigits: 2 })} NZD
            </strong>
          </td>
        </tr>
      </table>
    </HighlightBox>

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
            <strong style={{ fontSize: '14px', color: '#18181b' }}>Approval Date:</strong>
          </td>
          <td align="right" style={{ paddingBottom: '8px' }}>
            <span style={{ fontSize: '14px', color: '#52525b' }}>
              {approvalDate.toLocaleDateString('en-NZ', { dateStyle: 'long' })}
            </span>
          </td>
        </tr>
        <tr>
          <td style={{ paddingBottom: '8px' }}>
            <strong style={{ fontSize: '14px', color: '#18181b' }}>Refund Method:</strong>
          </td>
          <td align="right" style={{ paddingBottom: '8px' }}>
            <span style={{ fontSize: '14px', color: '#52525b' }}>
              {originalPaymentMethod}
              {accountDetailsLast4 && ` ****${accountDetailsLast4}`}
            </span>
          </td>
        </tr>
        <tr>
          <td>
            <strong style={{ fontSize: '14px', color: '#18181b' }}>Estimated Timeframe:</strong>
          </td>
          <td align="right">
            <span style={{ fontSize: '14px', color: '#881337', fontWeight: 600 }}>
              {estimatedProcessingTime}
            </span>
          </td>
        </tr>
      </table>
    </InfoBox>

    <Divider />

    <Paragraph>
      <strong>What Happens Next?</strong>
    </Paragraph>

    <Paragraph>
      1. <strong>Processing:</strong> Your refund is now being processed by our payment provider<br />
      2. <strong>Return to Source:</strong> The funds will be credited to your original payment method<br />
      3. <strong>Bank Processing:</strong> Your bank may take 3-5 business days to show the refund<br />
      4. <strong>Confirmation:</strong> You'll receive a final confirmation email once the refund is complete<br />
      5. <strong>Statement:</strong> The refund will appear on your bank statement within {estimatedProcessingTime}
    </Paragraph>

    <HighlightBox>
      <Paragraph style={{ margin: 0 }}>
        <strong style={{ fontSize: '15px', color: '#881337' }}>Please Note:</strong><br />
        <span style={{ fontSize: '14px', color: '#52525b', lineHeight: '20px' }}>
          While we process refunds immediately, the time it takes for the funds to appear in your account depends on your financial institution. If you don't see the refund within {estimatedProcessingTime}, please check with your bank first, as processing times can vary.
        </span>
      </Paragraph>
    </HighlightBox>

    <Divider />

    <Paragraph>
      <strong>Questions About Your Refund?</strong>
    </Paragraph>

    <Paragraph>
      If you have any questions or don't receive your refund within the expected timeframe, please don't hesitate to contact us:
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
      We apologise for any inconvenience this may have caused. Thank you for your understanding, and we hope to have the opportunity to serve you again in the future.
    </Paragraph>

    <Paragraph>
      Kind regards,<br />
      <strong>The Club Caddy Carts Team</strong>
    </Paragraph>
  </EmailLayout>
)
