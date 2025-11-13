import React from 'react';
import { View, Text, StyleSheet, Pressable, Linking } from 'react-native';
import { Colors } from '../constants/Colors';
import { Ionicons } from '@expo/vector-icons';

export default function ContactScreen() {
  const contactMethods = [
    {
      title: 'Phone',
      value: '+27 123 456 789',
      icon: 'call',
      action: () => Linking.openURL('tel:+27123456789'),
    },
    {
      title: 'Email',
      value: 'coffee@shop.com',
      icon: 'mail',
      action: () => Linking.openURL('mailto:coffee@shop.com'),
    },
    {
      title: 'Address',
      value: '123 Coffee Street\nCity Center\nJohannesburg',
      icon: 'location',
      action: () => Linking.openURL('https://maps.google.com/?q=123+Coffee+Street+Johannesburg'),
    },
    {
      title: 'Hours',
      value: 'Mon-Fri: 6:00 - 20:00\nSat-Sun: 8:00 - 22:00',
      icon: 'time',
      action: null,
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Contact Us</Text>
      <Text style={styles.subtitle}>Get in touch with us</Text>

      <View style={styles.methodsContainer}>
        {contactMethods.map((method) => (
          <Pressable
            key={method.title}
            style={styles.methodCard}
            onPress={method.action}
            disabled={!method.action}>
            <View style={styles.iconContainer}>
              <Ionicons name={method.icon} size={24} color={Colors.primary} />
            </View>
            <View style={styles.methodInfo}>
              <Text style={styles.methodTitle}>{method.title}</Text>
              <Text style={styles.methodValue}>{method.value}</Text>
            </View>
            {method.action && (
              <Ionicons name="chevron-forward" size={20} color={Colors.textLight} />
            )}
          </Pressable>
        ))}
      </View>

      <View style={styles.socialsContainer}>
        <Text style={styles.socialsTitle}>Follow Us</Text>
        <View style={styles.socialsRow}>
          <Pressable
            style={styles.socialButton}
            onPress={() => Linking.openURL('https://facebook.com')}>
            <Ionicons name="logo-facebook" size={24} color={Colors.primary} />
          </Pressable>
          <Pressable
            style={styles.socialButton}
            onPress={() => Linking.openURL('https://instagram.com')}>
            <Ionicons name="logo-instagram" size={24} color={Colors.primary} />
          </Pressable>
          <Pressable
            style={styles.socialButton}
            onPress={() => Linking.openURL('https://twitter.com')}>
            <Ionicons name="logo-twitter" size={24} color={Colors.primary} />
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: Colors.cream,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.textDark,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.textLight,
    marginBottom: 24,
  },
  methodsContainer: {
    gap: 16,
  },
  methodCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: Colors.white,
    borderRadius: 12,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.foam,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  methodInfo: {
    flex: 1,
  },
  methodTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.textDark,
    marginBottom: 4,
  },
  methodValue: {
    color: Colors.textLight,
  },
  socialsContainer: {
    marginTop: 32,
  },
  socialsTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.textDark,
    marginBottom: 16,
  },
  socialsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
  },
  socialButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.foam,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
});
