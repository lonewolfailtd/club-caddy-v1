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

interface BalanceInvoiceEmailProps {
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
  paymentLink: string;
  shippingAddress: {
    addressLine1: string;
    addressLine2?: string;
    city: string;
    postalCode: string;
    country: string;
  };
}

export const BalanceInvoiceEmail = ({
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
  paymentLink = 'https://clubcaddycarts.com/orders/pay/123',
  shippingAddress = {
    addressLine1: '123 Golf Course Road',
    city: 'Auckland',
    postalCode: '1010',
    country: 'New Zealand',
  },
}: BalanceInvoiceEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>Your golf cart is ready! Final payment required - Order #{orderNumber}</Preview>
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
            <Heading style={h1}>Your Golf Cart is Ready!</Heading>
            <Text style={text}>
              Great news, {customerName}! Your custom golf cart has been prepared and is ready for delivery.
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
                <td style={tableLabel}>Deposit Paid:</td>
                <td style={tableValueGreen}>-${depositAmount.toFixed(2)} NZD</td>
              </tr>
              <tr style={totalRow}>
                <td style={tableLabelBold}>Balance Due:</td>
                <td style={tableValueBold}>${balanceDue.toFixed(2)} NZD</td>
              </tr>
            </table>
          </Section>

          <Hr style={hr} />

          {/* Order Items */}
          <Section>
            <Heading as="h2" style={h2}>
              Order Items
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

          {/* Shipping Address */}
          <Section>
            <Heading as="h2" style={h2}>
              Delivery Address
            </Heading>
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
          </Section>

          <Hr style={hr} />

          {/* Payment Button */}
          <Section style={buttonSection}>
            <Text style={urgentText}>
              🚨 Please complete your payment to schedule delivery
            </Text>
            <Button style={button} href={paymentLink}>
              Pay Balance - ${balanceDue.toFixed(2)} NZD
            </Button>
            <Text style={linkText}>
              Or copy this link:{' '}
              <Link href={paymentLink} style={link}>
                {paymentLink}
              </Link>
            </Text>
          </Section>

          {/* What Happens Next */}
          <Section style={nextStepsSection}>
            <Heading as="h2" style={h2}>
              What Happens Next?
            </Heading>
            <div style={stepContainer}>
              <div style={stepNumber}>1</div>
              <div style={stepContent}>
                <Text style={stepTitle}>Complete Payment</Text>
                <Text style={stepText}>
                  Click the button above to securely pay the balance amount
                </Text>
              </div>
            </div>
            <div style={stepContainer}>
              <div style={stepNumber}>2</div>
              <div style={stepContent}>
                <Text style={stepTitle}>We'll Contact You</Text>
                <Text style={stepText}>
                  Our team will reach out within 24 hours to schedule delivery
                </Text>
              </div>
            </div>
            <div style={stepContainer}>
              <div style={stepNumber}>3</div>
              <div style={stepContent}>
                <Text style={stepTitle}>Delivery & Setup</Text>
                <Text style={stepText}>
                  We'll deliver and set up your golf cart at your location
                </Text>
              </div>
            </div>
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

export default BalanceInvoiceEmail;

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

const address = {
  color: '#475569',
  fontSize: '14px',
  lineHeight: '20px',
  margin: '8px 0',
  padding: '0 20px',
};

const buttonSection = {
  padding: '32px 20px',
  textAlign: 'center' as const,
};

const urgentText = {
  color: '#dc2626',
  fontSize: '16px',
  fontWeight: '600',
  margin: '0 0 24px',
};

const button = {
  backgroundColor: '#9f1239',
  borderRadius: '4px',
  color: '#fff',
  fontSize: '18px',
  fontWeight: 'bold',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'block',
  width: '100%',
  padding: '16px 0',
  margin: '16px 0',
};

const linkText = {
  color: '#64748b',
  fontSize: '12px',
  margin: '16px 0 0',
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
