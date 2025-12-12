import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from '@react-email/components';
import * as React from 'react';

interface BalancePaidEmailProps {
  orderNumber: string;
  customerName: string;
  balanceAmount: number;
  totalPaid: number;
  orderUrl: string;
  shippingAddress: {
    addressLine1: string;
    addressLine2?: string;
    city: string;
    postalCode: string;
    country: string;
  };
}

export const BalancePaidEmail = ({
  orderNumber = 'CC-20251213-0001',
  customerName = 'John Smith',
  balanceAmount = 12000,
  totalPaid = 15000,
  orderUrl = 'https://clubcaddycarts.com/orders/123',
  shippingAddress = {
    addressLine1: '123 Golf Course Road',
    city: 'Auckland',
    postalCode: '1010',
    country: 'New Zealand',
  },
}: BalancePaidEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>Payment complete! Delivery is being scheduled - Order #{orderNumber}</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Header */}
          <Section style={header}>
            <Img
              src="https://clubcaddycarts.com/images/logo.png"
              width="60"
              height="60"
              alt="Club Caddy Carts"
              style={logo}
            />
            <Heading style={headerTitle}>Club Caddy Carts</Heading>
          </Section>

          {/* Success Icon */}
          <Section style={successSection}>
            <div style={successIcon}>🎉</div>
            <Heading style={h1}>Payment Complete!</Heading>
            <Text style={text}>
              Congratulations, {customerName}! Your balance payment has been received and your order is fully paid.
            </Text>
          </Section>

          {/* Order Details */}
          <Section style={infoSection}>
            <Text style={infoLabel}>Order Number</Text>
            <Text style={infoValue}>#{orderNumber}</Text>
          </Section>

          <Hr style={hr} />

          {/* Payment Summary */}
          <Section style={summarySection}>
            <Heading as="h2" style={h2}>
              Payment Summary
            </Heading>

            <table style={table}>
              <tr>
                <td style={tableLabel}>Balance Payment:</td>
                <td style={tableValueGreen}>${balanceAmount.toFixed(2)} NZD ✓</td>
              </tr>
              <tr style={totalRow}>
                <td style={tableLabelBold}>Total Paid:</td>
                <td style={tableValueBold}>${totalPaid.toFixed(2)} NZD</td>
              </tr>
            </table>

            <div style={successBox}>
              <Text style={successBoxText}>
                ✅ Your order is fully paid and ready for delivery!
              </Text>
            </div>
          </Section>

          <Hr style={hr} />

          {/* Delivery Information */}
          <Section>
            <Heading as="h2" style={h2}>
              Delivery Address
            </Heading>
            <div style={addressBox}>
              <Text style={address}>
                {shippingAddress.addressLine1}
                {shippingAddress.addressLine2 && (
                  <>
                    <br />
                    {shippingAddress.addressLine2}
                  </>
                )}
                <br />
                {shippingAddress.city} {shippingAddress.postalCode}
                <br />
                {shippingAddress.country}
              </Text>
            </div>
          </Section>

          <Hr style={hr} />

          {/* What Happens Next */}
          <Section style={nextStepsSection}>
            <Heading as="h2" style={h2}>
              What Happens Next?
            </Heading>
            <div style={stepContainer}>
              <div style={stepNumber}>1</div>
              <div style={stepContent}>
                <Text style={stepTitle}>We'll Contact You Within 24 Hours</Text>
                <Text style={stepText}>
                  Our team will reach out to schedule a convenient delivery time
                </Text>
              </div>
            </div>
            <div style={stepContainer}>
              <div style={stepNumber}>2</div>
              <div style={stepContent}>
                <Text style={stepTitle}>Professional Delivery & Setup</Text>
                <Text style={stepText}>
                  We'll deliver your golf cart and provide a complete setup and walkthrough
                </Text>
              </div>
            </div>
            <div style={stepContainer}>
              <div style={stepNumber}>3</div>
              <div style={stepContent}>
                <Text style={stepTitle}>Enjoy Your New Golf Cart!</Text>
                <Text style={stepText}>
                  Start enjoying your premium golf cart experience
                </Text>
              </div>
            </div>
          </Section>

          {/* View Order Button */}
          <Section style={buttonSection}>
            <Button style={button} href={orderUrl}>
              View Order Details
            </Button>
          </Section>

          {/* Thank You Message */}
          <Section style={thankYouSection}>
            <Text style={thankYouText}>
              Thank you for your purchase! We're excited to deliver your new golf cart and look forward to serving you.
            </Text>
          </Section>

          {/* Footer */}
          <Hr style={hr} />
          <Section style={footer}>
            <Text style={footerText}>
              Questions? Contact us at{' '}
              <Link href="mailto:admin@clubcaddycarts.com" style={link}>
                admin@clubcaddycarts.com
              </Link>{' '}
              or call{' '}
              <Link href="tel:+64021560307" style={link}>
                +64 021 560 307
              </Link>
            </Text>
            <Text style={footerText}>
              Thank you for choosing Club Caddy Carts!
            </Text>
            <Text style={copyright}>
              © 2025 Club Caddy Carts. All rights reserved.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export default BalancePaidEmail;

// Styles
const main = {
  backgroundColor: '#f6f9fc',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '20px 0 48px',
  marginBottom: '64px',
  maxWidth: '600px',
};

const header = {
  padding: '32px 20px',
  textAlign: 'center' as const,
  backgroundColor: '#9f1239',
};

const logo = {
  margin: '0 auto',
};

const headerTitle = {
  color: '#ffffff',
  fontSize: '24px',
  fontWeight: 'bold',
  margin: '12px 0 0',
};

const successSection = {
  padding: '32px 20px',
  textAlign: 'center' as const,
};

const successIcon = {
  fontSize: '48px',
  marginBottom: '16px',
};

const h1 = {
  color: '#1e293b',
  fontSize: '28px',
  fontWeight: 'bold',
  margin: '16px 0',
  textAlign: 'center' as const,
};

const h2 = {
  color: '#1e293b',
  fontSize: '20px',
  fontWeight: 'bold',
  margin: '24px 0 16px',
  padding: '0 20px',
};

const text = {
  color: '#475569',
  fontSize: '16px',
  lineHeight: '24px',
  margin: '16px 0',
  padding: '0 20px',
};

const infoSection = {
  padding: '0 20px',
  marginBottom: '8px',
};

const infoLabel = {
  color: '#64748b',
  fontSize: '14px',
  margin: '4px 0',
};

const infoValue = {
  color: '#1e293b',
  fontSize: '18px',
  fontWeight: 'bold',
  margin: '4px 0',
};

const hr = {
  borderColor: '#e2e8f0',
  margin: '24px 20px',
};

const summarySection = {
  padding: '0 20px',
  backgroundColor: '#f8fafc',
  borderRadius: '8px',
  margin: '24px 20px',
};

const table = {
  width: '100%',
  padding: '16px',
};

const tableLabel = {
  color: '#64748b',
  fontSize: '14px',
  padding: '8px 0',
};

const tableValueGreen = {
  color: '#16a34a',
  fontSize: '14px',
  textAlign: 'right' as const,
  padding: '8px 0',
  fontWeight: '600',
};

const totalRow = {
  borderTop: '2px solid #e2e8f0',
};

const tableLabelBold = {
  color: '#1e293b',
  fontSize: '16px',
  fontWeight: 'bold',
  padding: '12px 0 8px',
};

const tableValueBold = {
  color: '#16a34a',
  fontSize: '20px',
  fontWeight: 'bold',
  textAlign: 'right' as const,
  padding: '12px 0 8px',
};

const successBox = {
  backgroundColor: '#dcfce7',
  borderLeft: '4px solid #16a34a',
  padding: '12px 16px',
  margin: '16px',
  borderRadius: '4px',
};

const successBoxText = {
  color: '#166534',
  fontSize: '14px',
  margin: '0',
  lineHeight: '20px',
  fontWeight: '600',
};

const addressBox = {
  backgroundColor: '#f8fafc',
  padding: '16px 20px',
  borderRadius: '8px',
  margin: '0 20px',
};

const address = {
  color: '#475569',
  fontSize: '14px',
  lineHeight: '20px',
  margin: '0',
};

const buttonSection = {
  padding: '32px 20px',
  textAlign: 'center' as const,
};

const button = {
  backgroundColor: '#9f1239',
  borderRadius: '4px',
  color: '#fff',
  fontSize: '16px',
  fontWeight: 'bold',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'block',
  width: '100%',
  padding: '14px 0',
  margin: '8px 0',
};

const link = {
  color: '#9f1239',
  textDecoration: 'underline',
};

const nextStepsSection = {
  padding: '0 20px',
  marginTop: '32px',
};

const stepContainer = {
  display: 'flex',
  gap: '16px',
  marginBottom: '24px',
};

const stepNumber = {
  width: '32px',
  height: '32px',
  borderRadius: '50%',
  backgroundColor: '#16a34a',
  color: '#ffffff',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '16px',
  fontWeight: 'bold',
  flexShrink: 0,
};

const stepContent = {
  flex: 1,
};

const stepTitle = {
  color: '#1e293b',
  fontSize: '16px',
  fontWeight: '600',
  margin: '0 0 4px',
};

const stepText = {
  color: '#64748b',
  fontSize: '14px',
  margin: '0',
  lineHeight: '20px',
};

const thankYouSection = {
  backgroundColor: '#f1f5f9',
  padding: '24px 20px',
  textAlign: 'center' as const,
  marginTop: '32px',
};

const thankYouText = {
  color: '#475569',
  fontSize: '16px',
  lineHeight: '24px',
  margin: '0',
  fontStyle: 'italic',
};

const footer = {
  padding: '0 20px',
  textAlign: 'center' as const,
};

const footerText = {
  color: '#64748b',
  fontSize: '14px',
  lineHeight: '20px',
  margin: '8px 0',
};

const copyright = {
  color: '#94a3b8',
  fontSize: '12px',
  margin: '16px 0 0',
};
