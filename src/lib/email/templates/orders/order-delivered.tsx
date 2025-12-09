import * as React from 'react'
import { EmailLayout, Heading, Paragraph, Button, Divider, InfoBox, HighlightBox } from '../base-layout'

interface OrderDeliveredEmailProps {
  name: string
  orderNumber: string
  deliveryDate: Date
  cartModel: string
  serialNumber?: string
  warrantyUrl?: string
  supportUrl?: string
}

export const OrderDeliveredEmail = ({
  name,
  orderNumber,
  deliveryDate,
  cartModel,
  serialNumber,
  warrantyUrl = 'https://clubcaddycarts.com/warranty',
  supportUrl = 'https://clubcaddycarts.com/support',
}: OrderDeliveredEmailProps) => (
  <EmailLayout previewText={`Your Order #${orderNumber} Has Been Delivered!`}>
    <Heading>Your Cart Has Been Delivered!</Heading>

    <Paragraph>
      Hello {name},
    </Paragraph>

    <Paragraph>
      Congratulations! Your custom electric golf cart has been successfully delivered. We hope you're as excited as we are for you to start enjoying your premium Club Caddy Cart.
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
            <strong style={{ fontSize: '14px', color: '#18181b' }}>Delivery Date:</strong>
          </td>
          <td align="right" style={{ paddingBottom: '8px' }}>
            <span style={{ fontSize: '14px', color: '#52525b' }}>
              {deliveryDate.toLocaleDateString('en-NZ', { dateStyle: 'long' })}
            </span>
          </td>
        </tr>
        <tr>
          <td style={{ paddingBottom: '8px' }}>
            <strong style={{ fontSize: '14px', color: '#18181b' }}>Cart Model:</strong>
          </td>
          <td align="right" style={{ paddingBottom: '8px' }}>
            <span style={{ fontSize: '14px', color: '#881337', fontWeight: 600 }}>{cartModel}</span>
          </td>
        </tr>
        {serialNumber && (
          <tr>
            <td>
              <strong style={{ fontSize: '14px', color: '#18181b' }}>Serial Number:</strong>
            </td>
            <td align="right">
              <span style={{ fontSize: '14px', color: '#52525b', fontFamily: 'monospace' }}>{serialNumber}</span>
            </td>
          </tr>
        )}
      </table>
    </InfoBox>

    <HighlightBox>
      <Paragraph style={{ margin: 0 }}>
        <strong style={{ fontSize: '15px', color: '#881337' }}>Important: Warranty Registration</strong>
      </Paragraph>
      <Paragraph style={{ marginBottom: 0 }}>
        Your cart comes with a comprehensive manufacturer's warranty. Please keep this email and your serial number for warranty claims and service records.
      </Paragraph>
    </HighlightBox>

    <Divider />

    <Paragraph>
      <strong>Getting Started with Your Cart</strong>
    </Paragraph>

    <Paragraph>
      1. <strong>Initial Charge:</strong> Fully charge your cart before first use (8-10 hours)<br />
      2. <strong>Safety Check:</strong> Review all safety features and controls<br />
      3. <strong>Customisation Review:</strong> Verify all custom features are working correctly<br />
      4. <strong>Regular Maintenance:</strong> Follow the maintenance schedule in your manual<br />
      5. <strong>Enjoy:</strong> Take your cart out and experience the difference!
    </Paragraph>

    <Button href={warrantyUrl}>
      View Warranty Information
    </Button>

    <Divider />

    <Paragraph>
      <strong>Need Support?</strong>
    </Paragraph>

    <Paragraph>
      Our team is here to help you get the most out of your new cart. Whether you have questions about features, maintenance, or customisation options, we're just a call or email away.
    </Paragraph>

    <Paragraph>
      <a href={supportUrl} style={{ color: '#881337', textDecoration: 'none', fontWeight: 600 }}>
        Visit our Support Centre →
      </a>
    </Paragraph>

    <Divider />

    <Paragraph style={{ marginTop: '32px' }}>
      Thank you for choosing Club Caddy Carts. We're honoured to be part of your golfing experience and look forward to seeing you on the course!
    </Paragraph>

    <Paragraph>
      If you have any questions or concerns about your delivery, please contact us at +64 021 560 307 or reply to this email.
    </Paragraph>
  </EmailLayout>
)
