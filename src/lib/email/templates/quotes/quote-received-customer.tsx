import * as React from 'react'
import { EmailLayout, Heading, Paragraph, Button, Divider, InfoBox, HighlightBox } from '../base-layout'

interface Customisation {
  category: string
  selection: string
  notes?: string
}

interface QuoteReceivedCustomerEmailProps {
  name: string
  email: string
  phone: string
  quoteNumber: string
  submittedDate: Date
  productName: string
  customisations: Customisation[]
  budgetRange?: string
  timeline?: string
  additionalNotes?: string
}

export const QuoteReceivedCustomerEmail = ({
  name,
  email,
  phone,
  quoteNumber,
  submittedDate,
  productName,
  customisations,
  budgetRange,
  timeline,
  additionalNotes,
}: QuoteReceivedCustomerEmailProps) => (
  <EmailLayout previewText={`Quote Request Received - #${quoteNumber}`}>
    <Heading>Your Quote Request Has Been Received</Heading>

    <Paragraph>
      Hello {name},
    </Paragraph>

    <Paragraph>
      Thank you for your interest in Club Caddy Carts. We've received your quote request and our team is already reviewing your customisation requirements. We're excited to help you design the perfect electric golf cart tailored to your needs.
    </Paragraph>

    <Divider />

    <InfoBox>
      <table width="100%" cellPadding="0" cellSpacing="0">
        <tr>
          <td style={{ paddingBottom: '8px' }}>
            <strong style={{ fontSize: '14px', color: '#18181b' }}>Quote Number:</strong>
          </td>
          <td align="right" style={{ paddingBottom: '8px' }}>
            <span style={{ fontSize: '14px', color: '#52525b', fontFamily: 'monospace' }}>#{quoteNumber}</span>
          </td>
        </tr>
        <tr>
          <td style={{ paddingBottom: '8px' }}>
            <strong style={{ fontSize: '14px', color: '#18181b' }}>Submitted:</strong>
          </td>
          <td align="right" style={{ paddingBottom: '8px' }}>
            <span style={{ fontSize: '14px', color: '#52525b' }}>
              {submittedDate.toLocaleDateString('en-NZ', { dateStyle: 'long' })}
            </span>
          </td>
        </tr>
        <tr>
          <td>
            <strong style={{ fontSize: '14px', color: '#18181b' }}>Expected Response:</strong>
          </td>
          <td align="right">
            <span style={{ fontSize: '14px', color: '#881337', fontWeight: 600 }}>Within 48 hours</span>
          </td>
        </tr>
      </table>
    </InfoBox>

    <Divider />

    <Paragraph>
      <strong style={{ fontSize: '16px' }}>Quote Request Summary</strong>
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

    <HighlightBox>
      <Paragraph style={{ marginBottom: '8px' }}>
        <strong style={{ fontSize: '15px', color: '#881337' }}>What Happens Next?</strong>
      </Paragraph>
      <Paragraph style={{ marginBottom: '8px' }}>
        <strong>1. Review:</strong> Our team will carefully review your customisation requirements
      </Paragraph>
      <Paragraph style={{ marginBottom: '8px' }}>
        <strong>2. Pricing:</strong> We'll prepare a detailed quote with pricing for all requested features
      </Paragraph>
      <Paragraph style={{ marginBottom: '8px' }}>
        <strong>3. Contact:</strong> We'll reach out within 48 hours with your personalised quote
      </Paragraph>
      <Paragraph style={{ marginBottom: '0' }}>
        <strong>4. Discussion:</strong> We're happy to discuss any adjustments or answer questions
      </Paragraph>
    </HighlightBox>

    <Paragraph>
      <strong style={{ fontSize: '16px' }}>Your Contact Details</strong>
    </Paragraph>

    <InfoBox>
      <table width="100%" cellPadding="0" cellSpacing="0">
        <tr>
          <td style={{ paddingBottom: '8px' }}>
            <strong style={{ fontSize: '13px', color: '#18181b' }}>Email:</strong>
          </td>
          <td align="right" style={{ paddingBottom: '8px' }}>
            <span style={{ fontSize: '13px', color: '#52525b' }}>{email}</span>
          </td>
        </tr>
        <tr>
          <td>
            <strong style={{ fontSize: '13px', color: '#18181b' }}>Phone:</strong>
          </td>
          <td align="right">
            <span style={{ fontSize: '13px', color: '#52525b' }}>{phone}</span>
          </td>
        </tr>
      </table>
    </InfoBox>

    <Paragraph style={{ marginTop: '32px' }}>
      If you have any questions or would like to discuss your requirements further, please don't hesitate to contact us at +64 021 560 307 or reply to this email.
    </Paragraph>

    <Paragraph style={{ marginBottom: '0' }}>
      We look forward to creating your perfect golf cart!
    </Paragraph>
  </EmailLayout>
)
