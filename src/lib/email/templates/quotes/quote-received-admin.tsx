import * as React from 'react'
import { EmailLayout, Heading, Paragraph, Button, Divider, InfoBox, HighlightBox } from '../base-layout'

interface Customisation {
  category: string
  selection: string
  notes?: string
}

interface QuoteReceivedAdminEmailProps {
  customerName: string
  customerEmail: string
  customerPhone: string
  quoteNumber: string
  submittedDate: Date
  productName: string
  customisations: Customisation[]
  budgetRange?: string
  timeline?: string
  additionalNotes?: string
  viewQuoteUrl?: string
}

export const QuoteReceivedAdminEmail = ({
  customerName,
  customerEmail,
  customerPhone,
  quoteNumber,
  submittedDate,
  productName,
  customisations,
  budgetRange,
  timeline,
  additionalNotes,
  viewQuoteUrl,
}: QuoteReceivedAdminEmailProps) => (
  <EmailLayout previewText={`New Quote Request - #${quoteNumber} from ${customerName}`}>
    <Heading>New Quote Request Received</Heading>

    <Paragraph>
      A new quote request has been submitted and requires your attention.
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
            <strong style={{ fontSize: '14px', color: '#18181b' }}>Submitted:</strong>
          </td>
          <td align="right" style={{ paddingBottom: '8px' }}>
            <span style={{ fontSize: '14px', color: '#52525b' }}>
              {submittedDate.toLocaleDateString('en-NZ', { dateStyle: 'long' })} at {submittedDate.toLocaleTimeString('en-NZ', { timeStyle: 'short' })}
            </span>
          </td>
        </tr>
        <tr>
          <td>
            <strong style={{ fontSize: '14px', color: '#18181b' }}>Response Due:</strong>
          </td>
          <td align="right">
            <span style={{ fontSize: '14px', color: '#881337', fontWeight: 600 }}>
              Within 48 hours
            </span>
          </td>
        </tr>
      </table>
    </HighlightBox>

    {viewQuoteUrl && (
      <Button href={viewQuoteUrl}>
        View Quote Request
      </Button>
    )}

    <Divider />

    <Paragraph>
      <strong style={{ fontSize: '16px' }}>Customer Information</strong>
    </Paragraph>

    <InfoBox>
      <table width="100%" cellPadding="0" cellSpacing="0">
        <tr>
          <td style={{ paddingBottom: '8px' }}>
            <strong style={{ fontSize: '14px', color: '#18181b' }}>Name:</strong>
          </td>
          <td align="right" style={{ paddingBottom: '8px' }}>
            <span style={{ fontSize: '14px', color: '#52525b' }}>{customerName}</span>
          </td>
        </tr>
        <tr>
          <td style={{ paddingBottom: '8px' }}>
            <strong style={{ fontSize: '14px', color: '#18181b' }}>Email:</strong>
          </td>
          <td align="right" style={{ paddingBottom: '8px' }}>
            <a href={`mailto:${customerEmail}`} style={{ fontSize: '14px', color: '#881337', textDecoration: 'none' }}>
              {customerEmail}
            </a>
          </td>
        </tr>
        <tr>
          <td>
            <strong style={{ fontSize: '14px', color: '#18181b' }}>Phone:</strong>
          </td>
          <td align="right">
            <a href={`tel:${customerPhone}`} style={{ fontSize: '14px', color: '#881337', textDecoration: 'none' }}>
              {customerPhone}
            </a>
          </td>
        </tr>
      </table>
    </InfoBox>

    <Divider />

    <Paragraph>
      <strong style={{ fontSize: '16px' }}>Quote Request Details</strong>
    </Paragraph>

    <Paragraph>
      <strong style={{ fontSize: '15px', color: '#18181b' }}>Selected Model:</strong><br />
      <span style={{ fontSize: '15px', color: '#881337', fontWeight: 600 }}>{productName}</span>
    </Paragraph>

    {customisations.length > 0 && (
      <>
        <Paragraph>
          <strong style={{ fontSize: '15px', color: '#18181b' }}>Requested Customisations:</strong>
        </Paragraph>

        <div style={{
          backgroundColor: '#fafafa',
          border: '1px solid #e4e4e7',
          borderRadius: '2px',
          padding: '16px',
          marginBottom: '16px',
        }}>
          {customisations.map((custom, index) => (
            <div key={index} style={{
              borderBottom: index < customisations.length - 1 ? '1px solid #e4e4e7' : 'none',
              paddingBottom: index < customisations.length - 1 ? '12px' : '0',
              marginBottom: index < customisations.length - 1 ? '12px' : '0',
            }}>
              <strong style={{ fontSize: '13px', color: '#18181b', display: 'block', marginBottom: '4px' }}>
                {custom.category}
              </strong>
              <span style={{ fontSize: '13px', color: '#52525b', display: 'block' }}>
                {custom.selection}
              </span>
              {custom.notes && (
                <span style={{ fontSize: '12px', color: '#71717a', display: 'block', marginTop: '4px', fontStyle: 'italic' }}>
                  Note: {custom.notes}
                </span>
              )}
            </div>
          ))}
        </div>
      </>
    )}

    {budgetRange && (
      <Paragraph>
        <strong style={{ fontSize: '14px', color: '#18181b' }}>Budget Range:</strong>{' '}
        <span style={{ fontSize: '14px', color: '#52525b' }}>{budgetRange}</span>
      </Paragraph>
    )}

    {timeline && (
      <Paragraph>
        <strong style={{ fontSize: '14px', color: '#18181b' }}>Desired Timeline:</strong>{' '}
        <span style={{ fontSize: '14px', color: '#52525b' }}>{timeline}</span>
      </Paragraph>
    )}

    {additionalNotes && (
      <>
        <Paragraph>
          <strong style={{ fontSize: '14px', color: '#18181b' }}>Additional Notes:</strong>
        </Paragraph>
        <InfoBox>
          <span style={{ fontSize: '13px', color: '#52525b', lineHeight: '20px' }}>
            {additionalNotes}
          </span>
        </InfoBox>
      </>
    )}

    <Divider />

    <Paragraph>
      <strong style={{ fontSize: '16px' }}>Action Required</strong>
    </Paragraph>

    <Paragraph>
      Please review this quote request and prepare a detailed quote including:
    </Paragraph>

    <Paragraph>
      • Pricing for the selected model<br />
      • Costs for all requested customisations<br />
      • Any relevant package discounts or promotions<br />
      • Estimated delivery timeframe<br />
      • Payment terms and deposit requirements
    </Paragraph>

    <Paragraph style={{ marginTop: '32px', marginBottom: '0' }}>
      <strong>Customer Response Expectation:</strong> Within 48 hours<br />
      <strong>Confirmation Email:</strong> Sent to {customerEmail}
    </Paragraph>
  </EmailLayout>
)
