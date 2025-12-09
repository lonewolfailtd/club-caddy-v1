import * as React from 'react'
import { EmailLayout, Heading, Paragraph, Divider, HighlightBox } from '../base-layout'

interface PasswordChangedEmailProps {
  name: string
  changeDate: Date
}

export const PasswordChangedEmail = ({ name, changeDate }: PasswordChangedEmailProps) => (
  <EmailLayout previewText="Your password has been changed">
    <Heading>Password Changed Successfully</Heading>

    <Paragraph>
      Hello {name},
    </Paragraph>

    <Paragraph>
      This email confirms that your Club Caddy Carts account password was successfully changed on{' '}
      {changeDate.toLocaleDateString('en-NZ', { dateStyle: 'long' })} at{' '}
      {changeDate.toLocaleTimeString('en-NZ', { timeStyle: 'short' })}.
    </Paragraph>

    <Divider />

    <HighlightBox>
      <Paragraph style={{ margin: '0 0 12px' }}>
        <strong style={{ color: '#881337' }}>Security Alert</strong>
      </Paragraph>
      <Paragraph style={{ margin: 0, fontSize: '14px' }}>
        If you did not make this change, please contact us immediately at +64 021 560 307 or email admin@clubcaddycarts.com.
      </Paragraph>
    </HighlightBox>

    <Divider />

    <Paragraph style={{ fontSize: '14px' }}>
      <strong>Security Tips:</strong>
    </Paragraph>

    <Paragraph style={{ fontSize: '14px' }}>
      • Use a unique password for your account<br />
      • Never share your password with anyone<br />
      • Update your password regularly<br />
      • Enable two-factor authentication when available
    </Paragraph>

    <Paragraph style={{ marginTop: '32px' }}>
      If you have any questions or concerns about your account security, please don't hesitate to contact our support team.
    </Paragraph>
  </EmailLayout>
)
