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

interface DepositConfirmationEmailProps {
  orderNumber: string;
  customerName: string;
  depositAmount: number;
  balanceDue: number;
  totalAmount: number;
  items: Array<{
    productName: string;
    variantName?: string;
    quantity: number;
    total: number;
  }>;
  orderUrl: string;
}

export const DepositConfirmationEmail = ({
  orderNumber = 'CC-20251213-0001',
  customerName = 'John Smith',
  depositAmount = 3000,
  balanceDue = 12000,
  totalAmount = 15000,
  items = [
    {
      productName: 'Premium Golf Cart',
      variantName: 'Blue Metallic',
      quantity: 1,
      total: 15000,
    },
  ],
  orderUrl = 'https://clubcaddycarts.com/orders/123',
}: DepositConfirmationEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>Deposit received! Your golf cart order is being processed - #{orderNumber}</Preview>
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
            <div style={successIcon}>✅</div>
            <Heading style={h1}>Deposit Payment Confirmed!</Heading>
            <Text style={text}>
              Thank you, {customerName}! We've received your deposit and your order is now being processed.
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
                <td style={tableLabel}>Total Order Amount:</td>
                <td style={tableValue}>${totalAmount.toFixed(2)} NZD</td>
              </tr>
              <tr>
                <td style={tableLabel}>Deposit Paid Today:</td>
                <td style={tableValueGreen}>${depositAmount.toFixed(2)} NZD ✓</td>
              </tr>
              <tr style={totalRow}>
                <td style={tableLabelBold}>Balance Due Later:</td>
                <td style={tableValueBold}>${balanceDue.toFixed(2)} NZD</td>
              </tr>
            </table>

            <div style={infoBox}>
              <Text style={infoBoxText}>
                💡 You'll receive an invoice for the balance when your golf cart is ready (approximately 6 weeks)
              </Text>
            </div>
          </Section>

          <Hr style={hr} />

          {/* Order Items */}
          <Section>
            <Heading as="h2" style={h2}>
              Your Order
            </Heading>
            {items.map((item, index) => (
              <div key={index} style={itemContainer}>
                <div style={itemDetails}>
                  <Text style={itemName}>{item.productName}</Text>
                  {item.variantName && (
                    <Text style={itemVariant}>{item.variantName}</Text>
                  )}
                  <Text style={itemQuantity}>Quantity: {item.quantity}</Text>
                </div>
                <div style={itemPrice}>${(item.total / 100).toFixed(2)}</div>
              </div>
            ))}
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
                <Text style={stepTitle}>Cart Preparation Begins</Text>
                <Text style={stepText}>
                  Our team will start preparing and customizing your golf cart
                </Text>
              </div>
            </div>
            <div style={stepContainer}>
              <div style={stepNumber}>2</div>
              <div style={stepContent}>
                <Text style={stepTitle}>We Keep You Updated</Text>
                <Text style={stepText}>
                  We'll contact you with progress updates throughout the process
                </Text>
              </div>
            </div>
            <div style={stepContainer}>
              <div style={stepNumber}>3</div>
              <div style={stepContent}>
                <Text style={stepTitle}>Balance Invoice Sent</Text>
                <Text style={stepText}>
                  When your cart is ready (~6 weeks), we'll email you the balance invoice
                </Text>
              </div>
            </div>
            <div style={stepContainer}>
              <div style={stepNumber}>4</div>
              <div style={stepContent}>
                <Text style={stepTitle}>Delivery & Enjoyment</Text>
                <Text style={stepText}>
                  After final payment, we'll deliver and set up your cart
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

export default DepositConfirmationEmail;

// Styles (same as balance-invoice.tsx for consistency)
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

const tableValue = {
  color: '#1e293b',
  fontSize: '14px',
  textAlign: 'right' as const,
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
  color: '#9f1239',
  fontSize: '20px',
  fontWeight: 'bold',
  textAlign: 'right' as const,
  padding: '12px 0 8px',
};

const infoBox = {
  backgroundColor: '#dbeafe',
  borderLeft: '4px solid #3b82f6',
  padding: '12px 16px',
  margin: '16px',
  borderRadius: '4px',
};

const infoBoxText = {
  color: '#1e40af',
  fontSize: '14px',
  margin: '0',
  lineHeight: '20px',
};

const itemContainer = {
  display: 'flex',
  justifyContent: 'space-between',
  padding: '16px 20px',
  backgroundColor: '#f8fafc',
  borderRadius: '8px',
  marginBottom: '8px',
};

const itemDetails = {
  flex: 1,
};

const itemName = {
  color: '#1e293b',
  fontSize: '16px',
  fontWeight: '600',
  margin: '0 0 4px',
};

const itemVariant = {
  color: '#64748b',
  fontSize: '14px',
  margin: '0 0 4px',
};

const itemQuantity = {
  color: '#64748b',
  fontSize: '14px',
  margin: '4px 0 0',
};

const itemPrice = {
  color: '#9f1239',
  fontSize: '16px',
  fontWeight: 'bold',
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
  backgroundColor: '#9f1239',
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
