import * as React from 'react'
import { EmailLayout, Heading, Paragraph, Button, Divider, HighlightBox } from '../base-layout'

interface NewsletterWelcomeEmailProps {
  name?: string
  email: string
  subscribedAt: Date
  preferences?: string[]
  welcomeOfferCode?: string
  welcomeOfferDiscount?: number
}

export const NewsletterWelcomeEmail = ({
  name,
  email,
  subscribedAt,
  preferences,
  welcomeOfferCode,
  welcomeOfferDiscount = 5,
}: NewsletterWelcomeEmailProps) => (
  <EmailLayout previewText="Welcome to Club Caddy Carts Newsletter">
    <Heading>Welcome to the Club!</Heading>

    <Paragraph>
      Hello{name ? ` ${name}` : ''},
    </Paragraph>

    <Paragraph>
      Thank you for subscribing to the Club Caddy Carts newsletter. We're thrilled to have you join our community of golf enthusiasts who appreciate quality, performance, and style on the course.
    </Paragraph>

    {welcomeOfferCode && (
      <>
        <Divider />

        <HighlightBox>
          <div style={{ textAlign: 'center' }}>
            <Paragraph style={{ margin: '0 0 12px' }}>
              <strong style={{ fontSize: '16px', color: '#881337' }}>
                Welcome Offer: {welcomeOfferDiscount}% Off Your First Order
              </strong>
            </Paragraph>
            <div style={{
              backgroundColor: '#ffffff',
              border: '2px dashed #881337',
              borderRadius: '2px',
              padding: '16px',
              marginBottom: '12px',
            }}>
              <span style={{
                fontSize: '24px',
                fontWeight: 700,
                color: '#881337',
                fontFamily: 'monospace',
                letterSpacing: '2px',
              }}>
                {welcomeOfferCode}
              </span>
            </div>
            <Paragraph style={{ margin: 0, fontSize: '13px' }}>
              Use this code at checkout to receive {welcomeOfferDiscount}% off your first purchase. Valid for 30 days from subscription.
            </Paragraph>
          </div>
        </HighlightBox>
      </>
    )}

    <Divider />

    <Paragraph>
      <strong>What to Expect</strong>
    </Paragraph>

    <Paragraph>
      As a valued subscriber, you'll be the first to know about:
    </Paragraph>

    <div style={{
      backgroundColor: '#fafafa',
      padding: '20px',
      borderRadius: '2px',
      marginBottom: '20px',
    }}>
      <div style={{ marginBottom: '12px' }}>
        <strong style={{ fontSize: '14px', color: '#881337' }}>✦</strong>
        <span style={{ fontSize: '14px', color: '#52525b', marginLeft: '8px' }}>
          <strong>New Product Launches:</strong> Be first to see our latest golf cart models
        </span>
      </div>
      <div style={{ marginBottom: '12px' }}>
        <strong style={{ fontSize: '14px', color: '#881337' }}>✦</strong>
        <span style={{ fontSize: '14px', color: '#52525b', marginLeft: '8px' }}>
          <strong>Exclusive Offers:</strong> Special discounts and promotions for subscribers
        </span>
      </div>
      <div style={{ marginBottom: '12px' }}>
        <strong style={{ fontSize: '14px', color: '#881337' }}>✦</strong>
        <span style={{ fontSize: '14px', color: '#52525b', marginLeft: '8px' }}>
          <strong>Customisation Ideas:</strong> Inspiration for personalising your cart
        </span>
      </div>
      <div style={{ marginBottom: '12px' }}>
        <strong style={{ fontSize: '14px', color: '#881337' }}>✦</strong>
        <span style={{ fontSize: '14px', color: '#52525b', marginLeft: '8px' }}>
          <strong>Expert Tips:</strong> Maintenance advice and care guides
        </span>
      </div>
      <div>
        <strong style={{ fontSize: '14px', color: '#881337' }}>✦</strong>
        <span style={{ fontSize: '14px', color: '#52525b', marginLeft: '8px' }}>
          <strong>Industry News:</strong> Updates from the electric golf cart world
        </span>
      </div>
    </div>

    {preferences && preferences.length > 0 && (
      <>
        <Paragraph>
          <strong>Your Preferences</strong>
        </Paragraph>
        <div style={{
          backgroundColor: '#fafafa',
          padding: '16px',
          borderRadius: '2px',
          marginBottom: '20px',
        }}>
          {preferences.map((pref, index) => (
            <div key={index} style={{ marginBottom: index < preferences.length - 1 ? '8px' : '0' }}>
              <span style={{ fontSize: '14px', color: '#52525b' }}>• {pref}</span>
            </div>
          ))}
        </div>
        <Paragraph style={{ fontSize: '13px', color: '#71717a' }}>
          You can update your preferences at any time by clicking the link at the bottom of any newsletter email.
        </Paragraph>
      </>
    )}

    <Button href="https://clubcaddycarts.com/products">
      Explore Our Collection
    </Button>

    <Divider />

    <Paragraph>
      <strong>Get Started</strong>
    </Paragraph>

    <Paragraph>
      While you're here, take a moment to explore what makes Club Caddy Carts the premier choice for discerning golfers across New Zealand:
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
            Browse Premium Golf Carts →
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
            Discover Customisation Options →
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
            Learn About Our Craftsmanship →
          </a>
        </td>
      </tr>
    </table>

    <Divider />

    <div style={{
      backgroundColor: '#fafafa',
      padding: '20px',
      borderRadius: '2px',
      textAlign: 'center',
      marginTop: '32px',
    }}>
      <Paragraph style={{ margin: '0 0 8px' }}>
        <strong style={{ fontSize: '15px', color: '#18181b' }}>Stay Connected</strong>
      </Paragraph>
      <Paragraph style={{ margin: 0, fontSize: '14px' }}>
        Have questions? We're here to help!<br />
        Call us at <a href="tel:+64021560307" style={{ color: '#881337', textDecoration: 'none', fontWeight: 600 }}>+64 021 560 307</a>
        <br />or email <a href="mailto:admin@clubcaddycarts.com" style={{ color: '#881337', textDecoration: 'none', fontWeight: 600 }}>admin@clubcaddycarts.com</a>
      </Paragraph>
    </div>

    <Paragraph style={{ marginTop: '32px', fontSize: '13px', color: '#71717a' }}>
      You're receiving this email because you subscribed to the Club Caddy Carts newsletter on {subscribedAt.toLocaleDateString('en-NZ', { dateStyle: 'long' })} using {email}. You can unsubscribe at any time by clicking the link at the bottom of our emails.
    </Paragraph>
  </EmailLayout>
)
