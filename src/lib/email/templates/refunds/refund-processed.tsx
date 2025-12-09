import * as React from 'react'
import { EmailLayout, Heading, Paragraph, Button, Divider, InfoBox, HighlightBox } from '../base-layout'

interface RefundProcessedEmailProps {
  name: string
  orderNumber: string
  refundAmount: number
  processedDate: Date
  transactionId: string
  originalPaymentMethod: string
  accountDetailsLast4?: string
  estimatedArrivalTime?: string
}

export const RefundProcessedEmail = ({
  name,
  orderNumber,
  refundAmount,
  processedDate,
  transactionId,
  originalPaymentMethod,
  accountDetailsLast4,
  estimatedArrivalTime = '3-5 business days',
}: RefundProcessedEmailProps) => (
  <EmailLayout previewText={`Refund Processed - Order #${orderNumber}`}>
    <Heading>Your Refund Has Been Processed</Heading>

    <Paragraph>
      Hello {name},
    </Paragraph>

    <Paragraph>
      Your refund has been successfully processed and the funds have been returned to your original payment method. You should see the credit in your account within {estimatedArrivalTime}.
    </Paragraph>

    <Divider />

    <HighlightBox>
      <table width="100%" cellPadding="0" cellSpacing="0">
        <tr>
          <td style={{ paddingBottom: '8px' }}>
            <strong style={{ fontSize: '14px', color: '#881337', display: 'block' }}>Refund Amount</strong>
          </td>
        </tr>
        <tr>
          <td style={{ paddingBottom: '12px' }}>
            <strong style={{ fontSize: '32px', color: '#18181b', fontFamily: "'Playfair Display', serif" }}>
              ${refundAmount.toLocaleString('en-NZ', { minimumFractionDigits: 2 })} NZD
            </strong>
          </td>
        </tr>
        <tr>
          <td>
            <div style={{
              backgroundColor: '#ffffff',
              padding: '12px',
              borderRadius: '2px',
              border: '1px solid #fecdd3',
            }}>
              <span style={{ fontSize: '12px', color: '#71717a', display: 'block', marginBottom: '4px' }}>
                <strong>Status:</strong>
              </span>
              <span style={{ fontSize: '14px', color: '#15803d', fontWeight: 600 }}>
                ✓ Processed Successfully
              </span>
            </div>
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
            <strong style={{ fontSize: '14px', color: '#18181b' }}>Transaction ID:</strong>
          </td>
          <td align="right" style={{ paddingBottom: '8px' }}>
            <span style={{ fontSize: '13px', color: '#52525b', fontFamily: 'monospace' }}>{transactionId}</span>
          </td>
        </tr>
        <tr>
          <td style={{ paddingBottom: '8px' }}>
            <strong style={{ fontSize: '14px', color: '#18181b' }}>Processed Date:</strong>
          </td>
          <td align="right" style={{ paddingBottom: '8px' }}>
            <span style={{ fontSize: '14px', color: '#52525b' }}>
              {processedDate.toLocaleDateString('en-NZ', { dateStyle: 'long' })}
            </span>
          </td>
        </tr>
        <tr>
          <td style={{ paddingBottom: '8px' }}>
            <strong style={{ fontSize: '14px', color: '#18181b' }}>Refunded To:</strong>
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
            <strong style={{ fontSize: '14px', color: '#18181b' }}>Expected in Account:</strong>
          </td>
          <td align="right">
            <span style={{ fontSize: '14px', color: '#881337', fontWeight: 600 }}>
              {estimatedArrivalTime}
            </span>
          </td>
        </tr>
      </table>
    </InfoBox>

    <Divider />

    <Paragraph>
      <strong>Important Information</strong>
    </Paragraph>

    <Paragraph>
      • <strong>Bank Processing Time:</strong> While we've processed your refund immediately, your financial institution may take {estimatedArrivalTime} to credit your account<br />
      • <strong>Statement Description:</strong> The refund will appear on your bank statement as "Club Caddy Carts Refund" or similar<br />
      • <strong>Reference Number:</strong> Keep your transaction ID ({transactionId}) for your records<br />
      • <strong>Further Queries:</strong> If you have questions about the refund appearing in your account, please contact your bank with the transaction ID provided
    </Paragraph>

    <HighlightBox>
      <Paragraph style={{ margin: 0 }}>
        <strong style={{ fontSize: '15px', color: '#881337' }}>Haven't Received Your Refund?</strong><br />
        <span style={{ fontSize: '14px', color: '#52525b', lineHeight: '20px' }}>
          If the refund hasn't appeared in your account after {estimatedArrivalTime}, please first check with your financial institution, as they may need additional time to process the transaction. If you still need assistance after checking with your bank, please contact us with your transaction ID.
        </span>
      </Paragraph>
    </HighlightBox>

    <Divider />

    <Paragraph>
      <strong>Need Assistance?</strong>
    </Paragraph>

    <Paragraph>
      If you have any questions or concerns about your refund, our team is here to help:
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
      We're sorry to see you go, but we appreciate your business and hope to have the opportunity to serve you again in the future. Thank you for choosing Club Caddy Carts.
    </Paragraph>

    <Paragraph>
      Kind regards,<br />
      <strong>The Club Caddy Carts Team</strong>
    </Paragraph>
  </EmailLayout>
)
