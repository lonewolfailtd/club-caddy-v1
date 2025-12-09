import * as React from 'react'
import { EmailLayout, Heading, Paragraph, Button, Divider, InfoBox } from '../base-layout'

interface OrderCancelledEmailProps {
  name: string
  orderNumber: string
  orderDate: Date
  cancellationDate: Date
  refundAmount: number
  refundMethod: string
  refundProcessingDays?: number
  reason?: string
  contactUrl?: string
}

export const OrderCancelledEmail = ({
  name,
  orderNumber,
  orderDate,
  cancellationDate,
  refundAmount,
  refundMethod,
  refundProcessingDays = 5,
  reason,
  contactUrl = 'https://clubcaddycarts.com/contact',
}: OrderCancelledEmailProps) => (
  <EmailLayout previewText={`Order #${orderNumber} Cancellation Confirmed`}>
    <Heading>Order Cancellation Confirmed</Heading>

    <Paragraph>
      Hello {name},
    </Paragraph>

    <Paragraph>
      We're writing to confirm that your order has been cancelled as requested. We're sorry to see you go, but we understand that circumstances change.
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
            <strong style={{ fontSize: '14px', color: '#18181b' }}>Original Order Date:</strong>
          </td>
          <td align="right" style={{ paddingBottom: '8px' }}>
            <span style={{ fontSize: '14px', color: '#52525b' }}>
              {orderDate.toLocaleDateString('en-NZ', { dateStyle: 'long' })}
            </span>
          </td>
        </tr>
        <tr>
          <td>
            <strong style={{ fontSize: '14px', color: '#18181b' }}>Cancellation Date:</strong>
          </td>
          <td align="right">
            <span style={{ fontSize: '14px', color: '#52525b' }}>
              {cancellationDate.toLocaleDateString('en-NZ', { dateStyle: 'long' })}
            </span>
          </td>
        </tr>
      </table>
    </InfoBox>

    <Divider />

    <Paragraph>
      <strong>Refund Details</strong>
    </Paragraph>

    <InfoBox>
      <table width="100%" cellPadding="0" cellSpacing="0">
        <tr>
          <td style={{ paddingBottom: '8px' }}>
            <strong style={{ fontSize: '14px', color: '#18181b' }}>Refund Amount:</strong>
          </td>
          <td align="right" style={{ paddingBottom: '8px' }}>
            <strong style={{ fontSize: '16px', color: '#15803d' }}>
              ${refundAmount.toLocaleString('en-NZ', { minimumFractionDigits: 2 })} NZD
            </strong>
          </td>
        </tr>
        <tr>
          <td style={{ paddingBottom: '8px' }}>
            <strong style={{ fontSize: '14px', color: '#18181b' }}>Refund Method:</strong>
          </td>
          <td align="right" style={{ paddingBottom: '8px' }}>
            <span style={{ fontSize: '14px', color: '#52525b' }}>{refundMethod}</span>
          </td>
        </tr>
        <tr>
          <td>
            <strong style={{ fontSize: '14px', color: '#18181b' }}>Processing Time:</strong>
          </td>
          <td align="right">
            <span style={{ fontSize: '14px', color: '#52525b' }}>{refundProcessingDays} business days</span>
          </td>
        </tr>
      </table>
    </InfoBox>

    <Paragraph>
      Your refund will be processed within {refundProcessingDays} business days and will appear in your account according to your financial institution's processing times. You'll receive a separate confirmation once the refund has been processed.
    </Paragraph>

    {reason && (
      <>
        <Divider />
        <Paragraph>
          <strong>Cancellation Reason:</strong>
        </Paragraph>
        <Paragraph style={{
          backgroundColor: '#fafafa',
          padding: '16px',
          borderRadius: '2px',
          borderLeft: '3px solid #881337',
        }}>
          {reason}
        </Paragraph>
      </>
    )}

    <Divider />

    <Paragraph>
      <strong>We'd Love to Have You Back</strong>
    </Paragraph>

    <Paragraph>
      If your circumstances change or you'd like to explore our cart options in the future, we'd be delighted to assist you. Our team is always here to answer questions and help you find the perfect golf cart for your needs.
    </Paragraph>

    <Button href={contactUrl}>
      Browse Our Collection
    </Button>

    <Divider />

    <Paragraph style={{ marginTop: '32px' }}>
      If you have any questions about this cancellation or your refund, please don't hesitate to contact us at +64 021 560 307 or reply to this email. We're here to help.
    </Paragraph>

    <Paragraph>
      Thank you for considering Club Caddy Carts. We hope to serve you in the future.
    </Paragraph>
  </EmailLayout>
)
