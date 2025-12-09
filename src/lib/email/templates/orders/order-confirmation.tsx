import * as React from 'react'
import { EmailLayout, Heading, Paragraph, Button, Divider, InfoBox } from '../base-layout'

interface OrderItem {
  name: string
  quantity: number
  price: number
  customizations?: string[]
}

interface OrderConfirmationEmailProps {
  name: string
  orderNumber: string
  orderDate: Date
  items: OrderItem[]
  subtotal: number
  tax?: number
  depositAmount: number
  totalAmount: number
  estimatedDelivery?: string
  trackingUrl?: string
}

export const OrderConfirmationEmail = ({
  name,
  orderNumber,
  orderDate,
  items,
  subtotal,
  tax = 0,
  depositAmount,
  totalAmount,
  estimatedDelivery = '6 weeks',
  trackingUrl,
}: OrderConfirmationEmailProps) => (
  <EmailLayout previewText={`Order Confirmation - #${orderNumber}`}>
    <Heading>Thank You for Your Order!</Heading>

    <Paragraph>
      Hello {name},
    </Paragraph>

    <Paragraph>
      We've received your order and are excited to start customizing your premium electric golf cart. Your deposit has been processed and your cart is now in our production queue.
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
            <strong style={{ fontSize: '14px', color: '#18181b' }}>Order Date:</strong>
          </td>
          <td align="right" style={{ paddingBottom: '8px' }}>
            <span style={{ fontSize: '14px', color: '#52525b' }}>
              {orderDate.toLocaleDateString('en-NZ', { dateStyle: 'long' })}
            </span>
          </td>
        </tr>
        <tr>
          <td>
            <strong style={{ fontSize: '14px', color: '#18181b' }}>Estimated Delivery:</strong>
          </td>
          <td align="right">
            <span style={{ fontSize: '14px', color: '#881337', fontWeight: 600 }}>{estimatedDelivery}</span>
          </td>
        </tr>
      </table>
    </InfoBox>

    {trackingUrl && (
      <Button href={trackingUrl}>
        Track Your Order
      </Button>
    )}

    <Divider />

    <Paragraph>
      <strong style={{ fontSize: '16px' }}>Order Summary</strong>
    </Paragraph>

    {items.map((item, index) => (
      <div key={index} style={{
        borderBottom: index < items.length - 1 ? '1px solid #e4e4e7' : 'none',
        paddingBottom: '16px',
        marginBottom: '16px',
      }}>
        <table width="100%" cellPadding="0" cellSpacing="0">
          <tr>
            <td>
              <strong style={{ fontSize: '15px', color: '#18181b' }}>{item.name}</strong><br />
              <span style={{ fontSize: '13px', color: '#71717a' }}>Quantity: {item.quantity}</span>
            </td>
            <td align="right" style={{ verticalAlign: 'top' }}>
              <strong style={{ fontSize: '15px', color: '#18181b' }}>
                ${item.price.toLocaleString('en-NZ', { minimumFractionDigits: 2 })}
              </strong>
            </td>
          </tr>
          {item.customizations && item.customizations.length > 0 && (
            <tr>
              <td colSpan={2} style={{ paddingTop: '8px' }}>
                <div style={{
                  backgroundColor: '#fafafa',
                  padding: '12px',
                  borderRadius: '2px',
                  marginTop: '8px',
                }}>
                  <span style={{ fontSize: '12px', color: '#71717a', display: 'block', marginBottom: '4px' }}>
                    <strong>Customizations:</strong>
                  </span>
                  {item.customizations.map((custom, idx) => (
                    <span key={idx} style={{ fontSize: '12px', color: '#52525b', display: 'block' }}>
                      • {custom}
                    </span>
                  ))}
                </div>
              </td>
            </tr>
          )}
        </table>
      </div>
    ))}

    <Divider />

    <table width="100%" cellPadding="0" cellSpacing="0" style={{ marginTop: '20px' }}>
      <tr>
        <td style={{ padding: '8px 0' }}>
          <span style={{ fontSize: '14px', color: '#52525b' }}>Subtotal:</span>
        </td>
        <td align="right" style={{ padding: '8px 0' }}>
          <span style={{ fontSize: '14px', color: '#18181b' }}>
            ${subtotal.toLocaleString('en-NZ', { minimumFractionDigits: 2 })}
          </span>
        </td>
      </tr>
      {tax > 0 && (
        <tr>
          <td style={{ padding: '8px 0' }}>
            <span style={{ fontSize: '14px', color: '#52525b' }}>Tax (GST):</span>
          </td>
          <td align="right" style={{ padding: '8px 0' }}>
            <span style={{ fontSize: '14px', color: '#18181b' }}>
              ${tax.toLocaleString('en-NZ', { minimumFractionDigits: 2 })}
            </span>
          </td>
        </tr>
      )}
      <tr>
        <td style={{ padding: '8px 0', borderTop: '1px solid #e4e4e7' }}>
          <strong style={{ fontSize: '15px', color: '#18181b' }}>Deposit Paid:</strong>
        </td>
        <td align="right" style={{ padding: '8px 0', borderTop: '1px solid #e4e4e7' }}>
          <strong style={{ fontSize: '15px', color: '#15803d' }}>
            ${depositAmount.toLocaleString('en-NZ', { minimumFractionDigits: 2 })}
          </strong>
        </td>
      </tr>
      <tr>
        <td style={{ padding: '8px 0' }}>
          <span style={{ fontSize: '14px', color: '#52525b' }}>Balance Due:</span>
        </td>
        <td align="right" style={{ padding: '8px 0' }}>
          <span style={{ fontSize: '14px', color: '#18181b' }}>
            ${(totalAmount - depositAmount).toLocaleString('en-NZ', { minimumFractionDigits: 2 })}
          </span>
        </td>
      </tr>
      <tr>
        <td style={{ padding: '12px 0', borderTop: '2px solid #18181b' }}>
          <strong style={{ fontSize: '16px', color: '#18181b' }}>Total Amount:</strong>
        </td>
        <td align="right" style={{ padding: '12px 0', borderTop: '2px solid #18181b' }}>
          <strong style={{ fontSize: '18px', color: '#881337' }}>
            ${totalAmount.toLocaleString('en-NZ', { minimumFractionDigits: 2 })} NZD
          </strong>
        </td>
      </tr>
    </table>

    <Divider />

    <Paragraph>
      <strong>What Happens Next?</strong>
    </Paragraph>

    <Paragraph>
      1. <strong>Production Begins:</strong> Your custom golf cart enters our production queue<br />
      2. <strong>Quality Checks:</strong> Each component is carefully inspected and tested<br />
      3. <strong>Updates:</strong> We'll keep you informed throughout the process<br />
      4. <strong>Final Payment:</strong> Balance due before delivery ({estimatedDelivery})<br />
      5. <strong>Delivery:</strong> Your cart arrives ready to enjoy!
    </Paragraph>

    <Paragraph style={{ marginTop: '32px' }}>
      If you have any questions about your order, please don't hesitate to contact us at +64 021 560 307 or reply to this email.
    </Paragraph>
  </EmailLayout>
)
