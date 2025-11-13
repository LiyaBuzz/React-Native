import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Pressable, Alert } from 'react-native';
import { useCart } from '../components/CartContext';
import { Colors } from '../constants/Colors';
import { Link, useRouter } from 'expo-router';

export default function CheckoutScreen() {
  const { items, subtotal, clearCart, placeOrder } = useCart();
  const router = useRouter();
  const [method, setMethod] = useState('pickup'); // 'pickup' or 'delivery'
  const [address, setAddress] = useState('');

  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');

  function handlePay() {
    // Very simple validation
    if (method === 'delivery' && address.trim().length < 5) {
      Alert.alert('Address required', 'Please enter a delivery address');
      return;
    }
    if (!/^[0-9]{12,19}$/.test(cardNumber.replace(/\s+/g, ''))) {
      Alert.alert('Invalid card', 'Enter a valid card number (digits only)');
      return;
    }
    if (!/^[0-9]{3,4}$/.test(cvv)) {
      Alert.alert('Invalid CVV', 'Enter a 3 or 4 digit CVV');
      return;
    }

    const order = placeOrder();
    
    // Mock payment success
    Alert.alert(
      'Payment successful', 
      `Paid R ${subtotal().toFixed(2)} — Thank you!\nYour order #${order.orderId.slice(-4)} is being prepared.`,
      [
        {
          text: 'Track Order',
          onPress: () => router.push('/orders'),
        },
        {
          text: 'OK',
          onPress: () => router.push('/'),
        },
      ]
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Checkout</Text>

      <View style={styles.section}>
        <Text style={styles.label}>Pickup or Delivery</Text>
        <View style={styles.row}>
          <Pressable onPress={() => setMethod('pickup')} style={[styles.option, method === 'pickup' && styles.optionActive]}>
            <Text>Pickup</Text>
          </Pressable>
          <Pressable onPress={() => setMethod('delivery')} style={[styles.option, method === 'delivery' && styles.optionActive]}>
            <Text>Delivery</Text>
          </Pressable>
        </View>
        {method === 'delivery' && (
          <TextInput placeholder="Delivery address" value={address} onChangeText={setAddress} style={styles.input} />
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Payment (Card)</Text>
        <TextInput placeholder="Card number" keyboardType="number-pad" value={cardNumber} onChangeText={setCardNumber} style={styles.input} />
        <View style={{ flexDirection: 'row', gap: 8 }}>
          <TextInput placeholder="MM/YY" value={expiry} onChangeText={setExpiry} style={[styles.input, { flex: 1 }]} />
          <TextInput placeholder="CVV" keyboardType="number-pad" value={cvv} onChangeText={setCvv} style={[styles.input, { width: 100 }]} />
        </View>
      </View>

      <View style={styles.section}>
  <Text style={styles.total}>Total: R {subtotal().toFixed(2)}</Text>
        <Pressable style={styles.payBtn} onPress={handlePay}>
          <Text style={{ color: '#fff' }}>Pay</Text>
        </Pressable>
        <Link href="/" asChild>
          <Pressable style={styles.backBtn}><Text>Back to Menu</Text></Pressable>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 16, 
    backgroundColor: Colors.cream,
    minHeight: '100%'
  },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 12, color: Colors.textDark },
  section: { marginBottom: 12 },
  label: { marginBottom: 8, color: Colors.textLight },
  row: { flexDirection: 'row', gap: 8 },
  option: { 
    padding: 10, 
    borderWidth: 1, 
    borderColor: Colors.border, 
    borderRadius: 6,
    backgroundColor: Colors.white
  },
  optionActive: { 
    backgroundColor: Colors.latte,
    borderColor: Colors.primary
  },
  input: { 
    borderWidth: 1, 
    borderColor: Colors.border, 
    padding: 12,
    borderRadius: 8, 
    marginBottom: 8,
    backgroundColor: Colors.white,
    fontSize: 16
  },
  total: { fontSize: 18, fontWeight: '600', marginBottom: 8 },
  payBtn: { backgroundColor: Colors.primary, padding: 12, borderRadius: 8, alignItems: 'center', marginBottom: 8 },
  backBtn: { padding: 10, alignItems: 'center' },
});
