import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';

interface OrderItem {
  productName: string;
  variantName?: string;
  quantity: number;
  total: number;
}

interface DepositInvoicePDFProps {
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  deliveryMethod: 'delivery' | 'pickup';
  shippingAddress: string | null;
  subtotal: number;
  deliveryCost: number;
  depositAmount: number;
  balanceDue: number;
  totalAmount: number;
  items: OrderItem[];
  orderDate: string;
}

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 10,
    fontFamily: 'Helvetica',
    backgroundColor: '#ffffff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 30,
    paddingBottom: 20,
    borderBottomWidth: 2,
    borderBottomColor: '#9f1239',
  },
  logo: {
    width: 50,
    height: 50,
  },
  companyInfo: {
    alignItems: 'flex-end',
  },
  companyName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#9f1239',
    marginBottom: 5,
  },
  companyDetails: {
    fontSize: 9,
    color: '#64748b',
    marginBottom: 2,
  },
  invoiceTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 20,
  },
  depositBadge: {
    backgroundColor: '#dbeafe',
    color: '#1e40af',
    fontSize: 10,
    fontWeight: 'bold',
    padding: 6,
    borderRadius: 4,
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 8,
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  infoLabel: {
    width: 120,
    fontSize: 10,
    color: '#64748b',
  },
  infoValue: {
    fontSize: 10,
    color: '#1e293b',
    flex: 1,
  },
  table: {
    marginTop: 10,
    marginBottom: 20,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#f8fafc',
    padding: 8,
    fontWeight: 'bold',
    fontSize: 10,
    color: '#1e293b',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  tableRow: {
    flexDirection: 'row',
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  tableColItem: {
    flex: 3,
    fontSize: 10,
  },
  tableColQty: {
    flex: 1,
    textAlign: 'center',
    fontSize: 10,
  },
  tableColPrice: {
    flex: 1.5,
    textAlign: 'right',
    fontSize: 10,
  },
  summaryBox: {
    backgroundColor: '#f8fafc',
    padding: 15,
    marginTop: 10,
    borderRadius: 4,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  summaryLabel: {
    fontSize: 10,
    color: '#64748b',
  },
  summaryValue: {
    fontSize: 10,
    color: '#1e293b',
  },
  summaryTotal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: '#e2e8f0',
  },
  summaryTotalLabel: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  summaryTotalValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#9f1239',
  },
  depositPaid: {
    backgroundColor: '#dcfce7',
    padding: 12,
    marginTop: 15,
    borderRadius: 4,
    borderLeftWidth: 4,
    borderLeftColor: '#16a34a',
  },
  depositPaidText: {
    fontSize: 10,
    color: '#166534',
    marginBottom: 4,
  },
  depositPaidAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#16a34a',
  },
  balanceDue: {
    backgroundColor: '#fef3c7',
    padding: 12,
    marginTop: 10,
    borderRadius: 4,
    borderLeftWidth: 4,
    borderLeftColor: '#f59e0b',
  },
  balanceDueText: {
    fontSize: 10,
    color: '#92400e',
    marginBottom: 4,
  },
  balanceDueAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#92400e',
  },
  footer: {
    marginTop: 30,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
  },
  footerText: {
    fontSize: 9,
    color: '#64748b',
    marginBottom: 3,
    textAlign: 'center',
  },
  footerNote: {
    fontSize: 8,
    color: '#94a3b8',
    marginTop: 10,
    textAlign: 'center',
    fontStyle: 'italic',
  },
});

export const DepositInvoicePDF = ({
  orderNumber,
  customerName,
  customerEmail,
  customerPhone,
  deliveryMethod,
  shippingAddress,
  subtotal,
  deliveryCost,
  depositAmount,
  balanceDue,
  totalAmount,
  items,
  orderDate,
}: DepositInvoicePDFProps) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.companyName}>Club Caddy Carts</Text>
          <Text style={styles.companyDetails}>admin@clubcaddycarts.com</Text>
          <Text style={styles.companyDetails}>+64 021 560 307</Text>
        </View>
        <View style={styles.companyInfo}>
          <Text style={styles.companyDetails}>Date: {orderDate}</Text>
          <Text style={styles.companyDetails}>Invoice #: {orderNumber}</Text>
        </View>
      </View>

      {/* Title */}
      <Text style={styles.invoiceTitle}>Deposit Invoice</Text>
      <Text style={styles.depositBadge}>DEPOSIT PAYMENT - BALANCE DUE ON DELIVERY</Text>

      {/* Customer Information */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Customer Information</Text>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Name:</Text>
          <Text style={styles.infoValue}>{customerName}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Email:</Text>
          <Text style={styles.infoValue}>{customerEmail}</Text>
        </View>
        {customerPhone && (
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Phone:</Text>
            <Text style={styles.infoValue}>{customerPhone}</Text>
          </View>
        )}
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Delivery Method:</Text>
          <Text style={styles.infoValue}>{deliveryMethod === 'delivery' ? 'Home Delivery' : 'Pickup'}</Text>
        </View>
        {deliveryMethod === 'delivery' && shippingAddress && (
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Delivery Address:</Text>
            <Text style={styles.infoValue}>{shippingAddress}</Text>
          </View>
        )}
      </View>

      {/* Order Items */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Order Items</Text>
        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={styles.tableColItem}>Item</Text>
            <Text style={styles.tableColQty}>Qty</Text>
            <Text style={styles.tableColPrice}>Total</Text>
          </View>
          {items.map((item, index) => (
            <View key={index} style={styles.tableRow}>
              <View style={styles.tableColItem}>
                <Text>{item.productName}</Text>
                {item.variantName && (
                  <Text style={{ fontSize: 9, color: '#64748b', marginTop: 2 }}>
                    {item.variantName}
                  </Text>
                )}
              </View>
              <Text style={styles.tableColQty}>{item.quantity}</Text>
              <Text style={styles.tableColPrice}>${(item.total / 100).toFixed(2)}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Payment Summary */}
      <View style={styles.summaryBox}>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Subtotal:</Text>
          <Text style={styles.summaryValue}>${(subtotal / 100).toFixed(2)} NZD</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Delivery ({deliveryMethod === 'delivery' ? 'Home Delivery' : 'Pickup'}):</Text>
          <Text style={styles.summaryValue}>{deliveryCost > 0 ? `$${(deliveryCost / 100).toFixed(2)} NZD` : 'Free'}</Text>
        </View>
        <View style={styles.summaryTotal}>
          <Text style={styles.summaryTotalLabel}>Total Order Amount:</Text>
          <Text style={styles.summaryTotalValue}>${(totalAmount / 100).toFixed(2)} NZD</Text>
        </View>
      </View>

      {/* Deposit Paid */}
      <View style={styles.depositPaid}>
        <Text style={styles.depositPaidText}>✓ Deposit Paid Today</Text>
        <Text style={styles.depositPaidAmount}>${(depositAmount / 100).toFixed(2)} NZD</Text>
      </View>

      {/* Balance Due */}
      <View style={styles.balanceDue}>
        <Text style={styles.balanceDueText}>Balance Due on Delivery (~6 weeks)</Text>
        <Text style={styles.balanceDueAmount}>${(balanceDue / 100).toFixed(2)} NZD</Text>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>Thank you for your business!</Text>
        <Text style={styles.footerText}>
          Questions? Contact us at admin@clubcaddycarts.com or +64 021 560 307
        </Text>
        <Text style={styles.footerNote}>
          This is a deposit invoice. Full payment will be due before delivery of your golf cart.
        </Text>
        <Text style={styles.footerNote}>© 2025 Club Caddy Carts. All rights reserved.</Text>
      </View>
    </Page>
  </Document>
);

export default DepositInvoicePDF;
