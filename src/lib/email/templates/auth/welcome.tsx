import * as React from 'react'
import { EmailLayout, Heading, Paragraph, Button, Divider } from '../base-layout'

interface WelcomeEmailProps {
  name: string
  email: string
}

export const WelcomeEmail = ({ name, email }: WelcomeEmailProps) => (
  <EmailLayout previewText={`Welcome to Club Caddy Carts, ${name}!`}>
    <Heading>Welcome to Club Caddy Carts!</Heading>

    <Paragraph>
      Hello {name},
    </Paragraph>

    <Paragraph>
      Thank you for joining New Zealand's premier electric golf cart community. We're thrilled to have you with us!
    </Paragraph>

    <Divider />

    <Paragraph>
      <strong>What's Next?</strong>
    </Paragraph>

    <Paragraph>
      ✓ Browse our collection of premium 72V lithium electric golf carts<br />
      ✓ Customize your cart with lift kits, wheels, and accessories<br />
      ✓ Request a personalized quote for your perfect cart<br />
      ✓ Schedule a viewing or test drive
    </Paragraph>

    <Button href="https://clubcaddycarts.com/products">
      Explore Our Collection
    </Button>

    <Paragraph>
      If you have any questions or need assistance, our team is here to help. Simply reply to this email or give us a call.
    </Paragraph>

    <Paragraph style={{ marginTop: '32px', fontSize: '13px', color: '#71717a' }}>
      <strong>Account Details:</strong><br />
      Email: {email}<br />
      Registered: {new Date().toLocaleDateString('en-NZ', { dateStyle: 'long' })}
    </Paragraph>
  </EmailLayout>
)
