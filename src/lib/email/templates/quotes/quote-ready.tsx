import * as React from 'react'
import { EmailLayout, Heading, Paragraph, Button, Divider, InfoBox, HighlightBox } from '../base-layout'

interface QuoteItem {
  category: string
  description: string
  price: number
}

interface QuoteReadyEmailProps {
  name: string
  quoteNumber: string
  productName: string
  quoteDate: Date
  validUntil: Date
  items: QuoteItem[]
  subtotal: number
  tax?: number
  totalAmount: number
  depositAmount?: number
  estimatedDelivery?: string
  specialConditions?: string[]
  viewQuoteUrl?: string
  contactNotes?: string
}

export const QuoteReadyEmail = ({
  name,
  quoteNumber,
  productName,
  quoteDate,
  validUntil,
  items,
  subtotal,
  tax = 0,
  totalAmount,
  depositAmount,
  estimatedDelivery = '6-8 weeks from order confirmation',
  specialConditions,
  viewQuoteUrl,
  contactNotes,
}: QuoteReadyEmailProps) => (
  <EmailLayout previewText={`Your Custom Quote is Ready - #${quoteNumber}`}>
    <Heading>Your Custom Quote is Ready</Heading>

    <Paragraph>
      Hello {name},
    </Paragraph>

    <Paragraph>
      Thank you for your patience. We've carefully reviewed your requirements and prepared a personalised quote for your custom electric golf cart. We're excited to bring your vision to life with Club Caddy Carts.
    </Paragraph>

    <Divider />

    <HighlightBox>
      <table width="100%" cellPadding="0" cellSpacing="0">
        <tr>
          <td style={{ paddingBottom: '8px' }}>
            <strong style={{ fontSize: '14px', color: '#881337' }}>Quote Number:</strong>
          </td>
          <td align="right" style={{ paddingBottom: '8px' }}>
            <span style={{ fontSize: '15px', color: '#881337', fontFamily: 'monospace', fontWeight: 600 }}>#{quoteNumber}</span>
          </td>
        </tr>
        <tr>
          <td style={{ paddingBottom: '8px' }}>
            <strong style={{ fontSize: '14px', color: '#18181b' }}>Quote Date:</strong>
          </td>
          <td align="right" style={{ paddingBottom: '8px' }}>
            <span style={{ fontSize: '14px', color: '#52525b' }}>
              {quoteDate.toLocaleDateString('en-NZ', { dateStyle: 'long' })}
            </span>
          </td>
        </tr>
        <tr>
          <td>
            <strong style={{ fontSize: '14px', color: '#18181b' }}>Valid Until:</strong>
          </td>
          <td align="right">
            <span style={{ fontSize: '14px', color: '#881337', fontWeight: 600 }}>
              {validUntil.toLocaleDateString('en-NZ', { dateStyle: 'long' })}
            </span>
          </td>
        </tr>
      </table>
    </HighlightBox>

    {viewQuoteUrl && (
      <Button href={viewQuoteUrl}>
        View Full Quote
      </Button>
    )}

    <Divider />

    <Paragraph>
      <strong style={{ fontSize: '16px' }}>Quote Summary</strong>
    </Paragraph>

    <Paragraph>
      <strong style={{ fontSize: '15px', color: '#18181b' }}>Selected Model:</strong><br />
      <span style={{ fontSize: '15px', color: '#881337', fontWeight: 600 }}>{productName}</span>
    </Paragraph>

    <Paragraph>
      <strong style={{ fontSize: '15px', color: '#18181b' }}>Customisations & Pricing:</strong>
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
              <strong style={{ fontSize: '14px', color: '#18181b' }}>{item.category}</strong><br />
              <span style={{ fontSize: '13px', color: '#71717a' }}>{item.description}</span>
            </td>
            <td align="right" style={{ verticalAlign: 'top' }}>
              <strong style={{ fontSize: '14px', color: '#18181b' }}>
                ${item.price.toLocaleString('en-NZ', { minimumFractionDigits: 2 })}
              </strong>
            </td>
          </tr>
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
        <td style={{ padding: '12px 0', borderTop: '2px solid #18181b' }}>
          <strong style={{ fontSize: '16px', color: '#18181b' }}>Total Quote Amount:</strong>
        </td>
        <td align="right" style={{ padding: '12px 0', borderTop: '2px solid #18181b' }}>
          <strong style={{ fontSize: '18px', color: '#881337' }}>
            ${totalAmount.toLocaleString('en-NZ', { minimumFractionDigits: 2 })} NZD
          </strong>
        </td>
      </tr>
      {depositAmount && (
        <tr>
          <td style={{ padding: '8px 0', borderTop: '1px solid #e4e4e7' }}>
            <strong style={{ fontSize: '14px', color: '#18181b' }}>Deposit Required:</strong>
          </td>
          <td align="right" style={{ padding: '8px 0', borderTop: '1px solid #e4e4e7' }}>
            <strong style={{ fontSize: '15px', color: '#15803d' }}>
              ${depositAmount.toLocaleString('en-NZ', { minimumFractionDigits: 2 })}
            </strong>
          </td>
        </tr>
      )}
    </table>

    <Divider />

    <InfoBox>
      <Paragraph style={{ marginBottom: '8px' }}>
        <strong style={{ fontSize: '15px', color: '#18181b' }}>Estimated Delivery:</strong>
      </Paragraph>
      <Paragraph style={{ marginBottom: '0' }}>
        <span style={{ fontSize: '14px', color: '#881337', fontWeight: 600 }}>
          {estimatedDelivery}
        </span>
      </Paragraph>
    </InfoBox>

    {specialConditions && specialConditions.length > 0 && (
      <>
        <Paragraph>
          <strong style={{ fontSize: '15px', color: '#18181b' }}>Special Conditions:</strong>
        </Paragraph>
        <InfoBox>
          {specialConditions.map((condition, index) => (
            <Paragraph key={index} style={{ marginBottom: index < specialConditions.length - 1 ? '8px' : '0' }}>
              <span style={{ fontSize: '13px', color: '#52525b' }}>
                • {condition}
              </span>
            </Paragraph>
          ))}
        </InfoBox>
      </>
    )}

    <Divider />

    <HighlightBox>
      <Paragraph style={{ marginBottom: '8px' }}>
        <strong style={{ fontSize: '15px', color: '#881337' }}>Next Steps</strong>
      </Paragraph>
      <Paragraph style={{ marginBottom: '8px' }}>
        <strong>1. Review:</strong> Carefully review your quote and customisation details
      </Paragraph>
      <Paragraph style={{ marginBottom: '8px' }}>
        <strong>2. Questions:</strong> Contact us if you'd like to discuss any aspect of the quote
      </Paragraph>
      <Paragraph style={{ marginBottom: '8px' }}>
        <strong>3. Adjustments:</strong> We're happy to modify your quote if you'd like to change anything
      </Paragraph>
      <Paragraph style={{ marginBottom: '8px' }}>
        <strong>4. Accept:</strong> When ready, confirm your order and pay the deposit to begin production
      </Paragraph>
      <Paragraph style={{ marginBottom: '0' }}>
        <strong>5. Build:</strong> Your custom cart enters our production queue
      </Paragraph>
    </HighlightBox>

    {contactNotes && (
      <>
        <Paragraph>
          <strong style={{ fontSize: '15px', color: '#18181b' }}>Additional Information:</strong>
        </Paragraph>
        <Paragraph>
          {contactNotes}
        </Paragraph>
      </>
    )}

    <Paragraph style={{ marginTop: '32px' }}>
      <strong>This quote is valid until {validUntil.toLocaleDateString('en-NZ', { dateStyle: 'long' })}.</strong> Pricing and availability are subject to change after this date.
    </Paragraph>

    <Paragraph>
      We're here to answer any questions you may have. Please don't hesitate to contact us at +64 021 560 307 or reply to this email to discuss your quote.
    </Paragraph>

    <Paragraph style={{ marginBottom: '0' }}>
      We look forward to building your dream golf cart!
    </Paragraph>
  </EmailLayout>
)
