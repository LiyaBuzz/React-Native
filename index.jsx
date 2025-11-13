 import { View, Text, StyleSheet, ImageBackground, Pressable } from 'react-native';
import { Link } from 'expo-router';
import { Colors } from "../constants/Colors";
import { useCart } from '../components/CartContext';
import HotcoffeeImg from '../assets/images/Hotcoffee.jpg';

const App = () => {
  const { cartItems } = useCart();
  const cartCount = cartItems.reduce((s, it) => s + (it.quantity || 0), 0);

  return (
    <View style={styles.container}>
      <ImageBackground source={HotcoffeeImg} resizeMode="cover" style={styles.Image}>
        <Text style={styles.buttonText}>COFFEE SHOP</Text>

        <View style={styles.quickRow}>
          <Link href="/menu" asChild>
            <Pressable style={({ pressed }) => [styles.quickBtn, pressed && styles.quickBtnPressed]}>
              <Text style={styles.quickBtnText}>Menu</Text>
            </Pressable>
          </Link>

          <Link href="/cart" asChild>
            <Pressable style={({ pressed }) => [styles.quickBtn, pressed && styles.quickBtnPressed]}>
              <Text style={styles.quickBtnText}>Cart</Text>
              {cartCount > 0 && (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{cartCount}</Text>
                </View>
              )}
            </Pressable>
          </Link>
        </View>

        <Link href="/contact" style={{ marginHorizontal: 'auto' }} asChild>
          <Pressable style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}>
            <Text style={styles.contactText}>Contact Us</Text>
          </Pressable>
        </Link>
      </ImageBackground>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  Image: {
    width: '100%',
    height: '100%',
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  Text: {
    color: Colors.textDark,
    fontSize: 60,
    fontWeight: 'bold',
    textAlign: 'right',
    backgroundColor: Colors.card,
    marginBottom: 120,
  },
  link: {
    color: Colors.text,
    fontSize: 60,
    fontWeight: 'bold',
    textAlign: 'center',
    textDecorationLine: 'underline',
    backgroundColor: Colors.black,
    padding: 4,
  },
  button: {
    height: 30,
    borderRadius: 10,
    backgroundColor: Colors.card,
    padding: 6,
  },
  buttonText: {
    color: Colors.textDark,
    fontSize: 42,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 4,
  },
  quickRow: {
    flexDirection: 'row',
    gap: 12,
    justifyContent: 'center',
    marginVertical: 12,
  },
  quickBtn: {
    backgroundColor: Colors.primary,
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 6,
  },
  quickBtnText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.2,
  },
  badge: {
    backgroundColor: Colors.accent,
    position: 'absolute',
    top: -6,
    right: -6,
    minWidth: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  quickBtnPressed: {
    transform: [{ scale: 0.985 }],
    opacity: 0.95,
  },
  buttonPressed: {
    transform: [{ scale: 0.995 }],
    opacity: 0.9,
  },
  contactText: {
    color: Colors.textDark,
    fontWeight: '600',
  },
});