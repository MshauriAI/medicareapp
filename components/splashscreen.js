import React from 'react';
import { View, Image, StyleSheet, Text, TouchableOpacity, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import tw from 'tailwind-react-native-classnames';
import PrivadoSecure from '../assets/images/logo.png'; // Adjust path as necessary
import { Colors } from '@/constants/Colors'; // Ensure your Colors module is well-defined

const { width } = Dimensions.get('window');

export default function App() {
  const router = useRouter();

  return (
    <LinearGradient
      colors={['#43C6AC', '#191654']} // Modern gradient for fresh and sleek look
      style={styles.gradient}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Usaidizi AI</Text>
        <Text style={styles.subtitle}>Empowering Assistance with AI</Text>

        {/* Spacer between Title and the Microsoft Powered Text */}
        <View style={styles.smallSpacer} />

        <Text style={styles.securedText}>Powered by Microsoft</Text>


        {/* Spacer between the logo and button */}
        <View style={styles.spacer} />

        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push('/auth/sign-in')}
        >
          <LinearGradient
            colors={['#43C6AC', '#F8FFAE']} // Gradient Button for a modern look
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.buttonGradient}
          >
            <Text style={styles.buttonText}>Get Started</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 30,
    width: '100%',
  },
  title: {
    color: 'white',
    fontSize: width * 0.09, // Larger, more prominent font
    fontWeight: 'bold',
    
    textAlign: 'center',
    letterSpacing: 2, // Slight spacing for elegance
  },
  subtitle: {
    color: 'white',
    fontSize: width * 0.045, // Smaller font for subtitle
    fontWeight: '300',
    marginTop: 10,
    textAlign: 'center',
    opacity: 0.85, // Slight opacity for a modern look
  },
  smallSpacer: {
    height: 10, // Spacer between title and Microsoft text
  },
  securedText: {
    color: 'white',
    fontSize: width * 0.04, // Slightly smaller for balance
    textAlign: 'center',
    marginBottom: 15,
    opacity: 0.9,
  },
  privadoSecureLogo: {
    width: 100, // Smaller but well-centered
    height: 25,
    marginTop: 15,
    opacity: 0.8,
  },
  spacer: {
    height: 50, // Spacer between logo and button
  },
  button: {
    width: '80%', // Button should fit nicely in different screen sizes
    borderRadius: 30,
    overflow: 'hidden', // Ensures the gradient is clipped inside the button
  },
  buttonGradient: {
    paddingVertical: 18,
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: width * 0.05,
    fontFamily: 'outfit-medium', // Consider modern fonts
    textAlign: 'center',
    color: Colors.DARK,
    fontWeight: '600',
    letterSpacing: 1,
  },
});