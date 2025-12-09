import * as React from 'react'
import { EmailLayout, Heading, Paragraph, Button, Divider } from '../base-layout'

interface EmailVerificationProps {
  name: string
  verificationLink: string
}

export const EmailVerificationEmail = ({ name, verificationLink }: EmailVerificationProps) => (
  <EmailLayout previewText="Verify your email address">
    <Heading>Verify Your Email</Heading>

    <Paragraph>
      Hello {name},
    </Paragraph>

    <Paragraph>
      Thank you for creating an account with Club Caddy Carts! To complete your registration and access all features, please verify your email address.
    </Paragraph>

    <Divider />

    <Button href={verificationLink}>
      Verify Email Address
    </Button>

    <Paragraph style={{ fontSize: '13px', color: '#71717a' }}>
      Or copy and paste this link into your browser:<br />
      <a href={verificationLink} style={{ color: '#881337', wordBreak: 'break-all' }}>
        {verificationLink}
      </a>
    </Paragraph>

    <Divider />

    <Paragraph>
      Once verified, you'll be able to:
    </Paragraph>

    <Paragraph>
      ✓ Save your favorite products<br />
      ✓ Track your orders<br />
      ✓ Manage your quote requests<br />
      ✓ Receive exclusive offers and updates
    </Paragraph>

    <Paragraph style={{ fontSize: '13px', color: '#71717a', marginTop: '32px' }}>
      If you didn't create this account, you can safely ignore this email.
    </Paragraph>
  </EmailLayout>
)
