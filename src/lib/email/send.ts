import { resend, FROM_EMAIL } from './resend'
import { render } from '@react-email/render'

interface SendEmailOptions {
  to: string | string[]
  subject: string
  react: React.ReactElement
  replyTo?: string
  cc?: string | string[]
  bcc?: string | string[]
  attachments?: Array<{
    filename: string
    content: Buffer | string
  }>
}

/**
 * Send an email using Resend
 */
export async function sendEmail({
  to,
  subject,
  react,
  replyTo,
  cc,
  bcc,
  attachments,
}: SendEmailOptions) {
  try {
    const html = await render(react, { pretty: false })

    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: Array.isArray(to) ? to : [to],
      subject,
      html,
      replyTo,
      cc: cc ? (Array.isArray(cc) ? cc : [cc]) : undefined,
      bcc: bcc ? (Array.isArray(bcc) ? bcc : [bcc]) : undefined,
      attachments,
    })

    if (error) {
      console.error('Failed to send email:', error)
      throw new Error(`Failed to send email: ${error.message}`)
    }

    console.log('Email sent successfully:', data?.id)
    return { success: true, id: data?.id }
  } catch (error) {
    console.error('Email sending error:', error)
    return { success: false, error }
  }
}

/**
 * Send a batch of emails
 */
export async function sendBatchEmails(emails: SendEmailOptions[]) {
  try {
    const htmlEmails = await Promise.all(emails.map(async email => ({
      from: FROM_EMAIL,
      to: Array.isArray(email.to) ? email.to : [email.to],
      subject: email.subject,
      html: await render(email.react, { pretty: false }),
      replyTo: email.replyTo,
      cc: email.cc ? (Array.isArray(email.cc) ? email.cc : [email.cc]) : undefined,
      bcc: email.bcc ? (Array.isArray(email.bcc) ? email.bcc : [email.bcc]) : undefined,
    })))

    const { data, error } = await resend.batch.send(htmlEmails)

    if (error) {
      console.error('Failed to send batch emails:', error)
      throw new Error(`Failed to send batch emails: ${error.message}`)
    }

    console.log('Batch emails sent successfully')
    return { success: true, data }
  } catch (error) {
    console.error('Batch email sending error:', error)
    return { success: false, error }
  }
}
