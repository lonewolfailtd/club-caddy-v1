import * as React from 'react'
import { EmailLayout, Heading, Paragraph, Button, Divider, HighlightBox } from '../base-layout'

interface PasswordResetEmailProps {
  name: string
  resetLink: string
  expiryMinutes?: number
}

export const PasswordResetEmail = ({ name, resetLink, expiryMinutes = 60 }: PasswordResetEmailProps) => (
  <EmailLayout previewText="Reset your Club Caddy Carts password">
    <Heading>Password Reset Request</Heading>

    <Paragraph>
      Hello {name},
    </Paragraph>

    <Paragraph>
      We received a request to reset the password for your Club Caddy Carts account. If you didn't make this request, you can safely ignore this email.
    </Paragraph>

    <Divider />

    <HighlightBox>
      <Paragraph style={{ margin: '0 0 12px' }}>
        <strong style={{ color: '#881337' }}>Security Notice</strong>
      </Paragraph>
      <Paragraph style={{ margin: 0, fontSize: '14px' }}>
        This password reset link will expire in {expiryMinutes} minutes for your security.
      </Paragraph>
    </HighlightBox>

    <Button href={resetLink}>
      Reset Your Password
    </Button>

    <Paragraph style={{ fontSize: '13px', color: '#71717a' }}>
      Or copy and paste this link into your browser:<br />
      <a href={resetLink} style={{ color: '#881337', wordBreak: 'break-all' }}>
        {resetLink}
      </a>
    </Paragraph>

    <Divider />

    <Paragraph style={{ fontSize: '13px', color: '#71717a' }}>
      <strong>Didn't request this?</strong><br />
      If you didn't request a password reset, please contact us immediately at admin@clubcaddycarts.com or call +64 021 560 307.
    </Paragraph>
  </EmailLayout>
)
