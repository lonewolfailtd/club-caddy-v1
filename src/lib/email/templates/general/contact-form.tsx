import * as React from 'react'
import { EmailLayout, Heading, Paragraph, Divider, InfoBox } from '../base-layout'

interface ContactFormEmailProps {
  name: string
  email: string
  phone?: string
  subject?: string
  message: string
  submittedAt: Date
  interestedIn?: string[]
}

export const ContactFormEmail = ({
  name,
  email,
  phone,
  subject = 'General Enquiry',
  message,
  submittedAt,
  interestedIn,
}: ContactFormEmailProps) => (
  <EmailLayout previewText="We've received your message - Club Caddy Carts">
    <Heading>Thank You for Contacting Us</Heading>

    <Paragraph>
      Hello {name},
    </Paragraph>

    <Paragraph>
      Thank you for reaching out to Club Caddy Carts. We've received your message and our team will review it shortly. We typically respond within 24 hours during business days.
    </Paragraph>

    <Divider />

    <Paragraph>
      <strong>Your Message Details</strong>
    </Paragraph>

    <InfoBox>
      <table width="100%" cellPadding="0" cellSpacing="0">
        <tr>
          <td style={{ paddingBottom: '8px' }}>
            <strong style={{ fontSize: '14px', color: '#18181b' }}>Submitted:</strong>
          </td>
          <td align="right" style={{ paddingBottom: '8px' }}>
            <span style={{ fontSize: '14px', color: '#52525b' }}>
              {submittedAt.toLocaleDateString('en-NZ', { dateStyle: 'long' })} at {submittedAt.toLocaleTimeString('en-NZ', { timeStyle: 'short' })}
            </span>
          </td>
        </tr>
        <tr>
          <td style={{ paddingBottom: '8px' }}>
            <strong style={{ fontSize: '14px', color: '#18181b' }}>Subject:</strong>
          </td>
          <td align="right" style={{ paddingBottom: '8px' }}>
            <span style={{ fontSize: '14px', color: '#52525b' }}>{subject}</span>
          </td>
        </tr>
        <tr>
          <td style={{ paddingBottom: '8px' }}>
            <strong style={{ fontSize: '14px', color: '#18181b' }}>Email:</strong>
          </td>
          <td align="right" style={{ paddingBottom: '8px' }}>
            <span style={{ fontSize: '14px', color: '#52525b' }}>{email}</span>
          </td>
        </tr>
        {phone && (
          <tr>
            <td>
              <strong style={{ fontSize: '14px', color: '#18181b' }}>Phone:</strong>
            </td>
            <td align="right">
              <span style={{ fontSize: '14px', color: '#52525b' }}>{phone}</span>
            </td>
          </tr>
        )}
      </table>
    </InfoBox>

    {interestedIn && interestedIn.length > 0 && (
      <>
        <Paragraph>
          <strong>Areas of Interest:</strong>
        </Paragraph>
        <div style={{
          backgroundColor: '#fafafa',
          padding: '16px',
          borderRadius: '2px',
          marginBottom: '16px',
        }}>
          {interestedIn.map((item, index) => (
            <div key={index} style={{ marginBottom: index < interestedIn.length - 1 ? '8px' : '0' }}>
              <span style={{ fontSize: '14px', color: '#52525b' }}>• {item}</span>
            </div>
          ))}
        </div>
      </>
    )}

    <Paragraph>
      <strong>Your Message:</strong>
    </Paragraph>
    <div style={{
      backgroundColor: '#fafafa',
      padding: '16px',
      borderRadius: '2px',
      borderLeft: '3px solid #881337',
      marginBottom: '20px',
    }}>
      <Paragraph style={{ margin: 0, whiteSpace: 'pre-wrap' }}>
        {message}
      </Paragraph>
    </div>

    <Divider />

    <Paragraph>
      <strong>What Happens Next?</strong>
    </Paragraph>

    <Paragraph>
      Our team is reviewing your enquiry and will respond with detailed information tailored to your needs. In the meantime, feel free to explore our website to learn more about our premium electric golf carts and customisation options.
    </Paragraph>

    <Paragraph>
      If your matter is urgent, please don't hesitate to call us directly at +64 021 560 307.
    </Paragraph>

    <Divider />

    <Paragraph style={{ marginTop: '32px' }}>
      <strong>Quick Links:</strong>
    </Paragraph>

    <table cellPadding="0" cellSpacing="0" style={{ marginBottom: '20px' }}>
      <tr>
        <td>
          <a href="https://clubcaddycarts.com/products" style={{
            color: '#881337',
            textDecoration: 'none',
            fontSize: '14px',
            fontWeight: 600,
          }}>
            Browse Our Collection →
          </a>
        </td>
      </tr>
      <tr>
        <td style={{ paddingTop: '8px' }}>
          <a href="https://clubcaddycarts.com/customise" style={{
            color: '#881337',
            textDecoration: 'none',
            fontSize: '14px',
            fontWeight: 600,
          }}>
            Customisation Options →
          </a>
        </td>
      </tr>
      <tr>
        <td style={{ paddingTop: '8px' }}>
          <a href="https://clubcaddycarts.com/about" style={{
            color: '#881337',
            textDecoration: 'none',
            fontSize: '14px',
            fontWeight: 600,
          }}>
            About Club Caddy Carts →
          </a>
        </td>
      </tr>
    </table>

    <Paragraph style={{ marginTop: '32px' }}>
      Thank you for your interest in Club Caddy Carts. We look forward to speaking with you soon!
    </Paragraph>
  </EmailLayout>
)
