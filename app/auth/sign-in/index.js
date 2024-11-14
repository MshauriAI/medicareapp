import React, { useState } from 'react';
import { 
  View, 
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  ActivityIndicator,
  Platform,
  ScrollView,
  StatusBar,
} from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import tw from "tailwind-react-native-classnames";
import axios from "axios";
import Toast from "react-native-toast-message";
import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as LocalAuthentication from 'expo-local-authentication';
import { Picker } from '@react-native-picker/picker';
import { useRouter } from 'expo-router';

export default function SignInScreen({ navigation }) {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter(); // Add router hook

  const handleSignIn = async () => {
    setLoading(true);
    if (!email || !password) {
      Toast.show({
        type: "error",
        text1: "Validation Error",
        text2: "All fields are required",
      });
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        "https://stallion-holy-informally.ngrok-free.app/api/v1.0/signin",
        {
          email,
          password,
        }
      );

      const token = response.data.access_token;
      console.log(token);

      if (response.status == 200 && token != "") {
        console.log("DONE")
        await SecureStore.setItemAsync('token', token);
        await AsyncStorage.setItem('userInfo', JSON.stringify({
          firstName: response.data.firstName,
          lastName: response.data.lastName,
          email: response.data.email,
          number: response.data.number,
          token: response.data.access_token,
          imageUri: response.data.imageUri
        }));
        navigation.navigate("Home");  // Ensure this is reached

      Toast.show({
        type: "success",
        text1: "Success",
        text2: "Signin Successful",
      });
      } else {
        setLoading(false);
        Toast.show({
          type: "error",
          text1: "Sign-in Failed",
          text2: response.data.message || "Please try again.",
        });
      }
    } catch (error) {
      console.error("Sign-in error:", error);
      Toast.show({
        type: "error",
        text1: "Error",
        text2: error.response?.data.message || "An unexpected error occurred",
      });
      setLoading(false);
    }
  };

  return (
    <LinearGradient
      colors={['#ffffff', '#f3f4f6', '#ffffff']}
      style={tw`flex-1`}
    >
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={tw`flex-1`}
      >
        <ScrollView 
          contentContainerStyle={tw`flex-grow justify-center px-6 py-10`}
          showsVerticalScrollIndicator={false}
        >
          {/* Header Section */}
          <View style={tw`mb-12`}>
            <Text style={[tw`text-4xl text-gray-800 text-center mb-3`, { fontFamily: 'outfit-bold' }]}>
              Welcome Back
            </Text>
            <Text style={[tw`text-gray-500 text-center`, { fontFamily: 'outfit' }]}>
              Sign in to continue your healthcare journey
            </Text>
          </View>

          {/* Input Fields */}
          <View style={tw`space-y-4`}>
            {/* Email Input */}
            <View style={tw`bg-white rounded-2xl px-4 py-3 shadow-md border border-gray-100`}>
              <Text style={[tw`text-xs text-gray-500 mb-1`, { fontFamily: 'outfit' }]}>Email</Text>
              <View style={tw`flex-row items-center`}>
                <MaterialIcons name="email" size={20} color="#6b7280" />
                <TextInput
                  style={[tw`flex-1 ml-3 text-gray-800`, { fontFamily: 'outfit' }]}
                  placeholder="Enter your email"
                  placeholderTextColor="#9ca3af"
                  keyboardType="email-address"
                  value={email}
                  onChangeText={setEmail}
                />
              </View>
            </View>

            {/* Password Input */}
            <View style={tw`bg-white rounded-2xl px-4 mt-3 py-3 shadow-md border border-gray-100`}>
              <Text style={[tw`text-xs text-gray-500 mb-1`, { fontFamily: 'outfit' }]}>Password</Text>
              <View style={tw`flex-row items-center`}>
                <MaterialIcons name="lock" size={20} color="#6b7280" />
                <TextInput
                  style={[tw`flex-1 ml-3 text-gray-800`, { fontFamily: 'outfit' }]}
                  placeholder="Enter your password"
                  placeholderTextColor="#9ca3af"
                  secureTextEntry={!passwordVisible}
                  value={password}
                  onChangeText={setPassword}
                />
                <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
                  <Ionicons 
                    name={passwordVisible ? "eye-off" : "eye"} 
                    size={20} 
                    color="#6b7280" 
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Forgot Password */}
          <TouchableOpacity style={tw`my-4`}>
            <Text style={[tw`text-right text-blue-500`, { fontFamily: 'outfit-medium' }]}>
              Forgot Password?
            </Text>
          </TouchableOpacity>

          {/* Sign In Button */}
          <TouchableOpacity
            style={[
              tw`bg-blue-500 rounded-2xl py-4 shadow-lg mt-6`,
              loading && tw`opacity-70`
            ]}
            onPress={handleSignIn}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator size="small" color="#ffffff" />
            ) : (
              <Text style={[tw`text-white text-center text-lg`, { fontFamily: 'outfit-medium' }]}>
                Sign In
              </Text>
            )}
          </TouchableOpacity>

          {/* Sign Up Link */}
          <View style={tw`mt-8`}>
            <Text style={[tw`text-center text-gray-600`, { fontFamily: 'outfit' }]}>
              Don't have an account?{" "}
              <Text 
                style={[tw`text-blue-500 font-medium`, { fontFamily: 'outfit-medium' }]}
                onPress={() => router.push('/home')}
              >
                Sign Up
              </Text>
            </Text>
          </View>

          {/* Social Sign In Options */}
          <View style={tw`mt-8`}>
            <View style={tw`flex-row items-center mb-6`}>
              <View style={tw`flex-1 h-px bg-gray-200`} />
              <Text style={[tw`mx-4 text-gray-500`, { fontFamily: 'outfit' }]}>
                Or continue with
              </Text>
              <View style={tw`flex-1 h-px bg-gray-200`} />
            </View>

            <View style={tw`flex-row justify-center space-x-4`}>
              {['google', 'apple', 'facebook'].map((provider) => (
                <TouchableOpacity 
                  key={provider}
                  style={tw`bg-white p-4 rounded-full shadow-md border border-gray-100`}
                >
                  <Ionicons 
                    name={`logo-${provider}`} 
                    size={24} 
                    color="#374151"
                  />
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}
