import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import { LinearGradient } from 'expo-linear-gradient';
import tw from "tailwind-react-native-classnames";
import Toast from "react-native-toast-message";
import axios from "axios";
import { useRouter } from 'expo-router';


export default function SignUpScreen({ navigation }) {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const router = useRouter();
    const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    gender: '',
    phone_number: '',
    password: '',
    role: "Patient"
  });

  const url = "https://stallion-holy-informally.ngrok-free.app";

  const handleSignUp = async () => {
    setLoading(true);
    if (!formData.email || !formData.password) {
      Toast.show({
        type: "error",
        text1: "Validation Error",
        text2: "All fields are required",
      });
      setLoading(false);
      return;
    }

    const role = 'Patient';
    console.log('signin up');

    try {
      const response = await axios.post(
        url + "/api/v1.0/signup",
        JSON.stringify(formData)
        ,
        {
          headers: {"Content-Type": "application/json" }
        }
      );

      if (response.status == 201) {
        console.log("DONE")
        router.push('/auth/sign-in/');
    Toast.show({
      type: "success",
      text1: "Success",
      text2: "Signup Successful",
    });
    } else {
      setLoading(false);
      Toast.show({
        type: "error",
        text1: "Sign-up Failed",
        text2: response.data.message || "Please try again.",
      });
    }
  } catch (error) {
    console.error("Sign-up error:", error);
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
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={tw`flex-1`}
      >
        <ScrollView 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={tw`flex-grow px-6 py-10`}
        >
          {/* Header */}
          <View style={tw`mb-10 mt-4`}>
            <Text style={[tw`text-4xl text-gray-800 text-center mb-2`, { fontFamily: 'outfit-bold' }]}>
              Create Account
            </Text>
            <Text style={[tw`text-gray-500 text-center`, { fontFamily: 'outfit' }]}>
              Join us to start your healthcare journey
            </Text>
          </View>

          {/* Form */}
          <View style={tw``}>
            {/* Name Row */}
            <View style={tw`flex-row`}>
              <View style={tw`flex-1`}>
                <Text style={[tw`text-xs text-gray-500 mb-1 ml-1`, { fontFamily: 'outfit' }]}>First Name</Text>
                <View style={tw`bg-white rounded-2xl px-4 py-3 shadow-sm border border-gray-100`}>
                  <View style={tw`flex-row items-center`}>
                    <MaterialIcons name="person" size={20} color="#6b7280" />
                    <TextInput
                      style={[tw`flex-1 ml-3 text-gray-800`, { fontFamily: 'outfit' }]}
                      placeholder="John"
                      placeholderTextColor="#9ca3af"
                      value={formData.first_name}
                      onChangeText={(text) => setFormData({...formData, first_name: text})}
                    />
                  </View>
                </View>
              </View>

              <View style={tw`flex-1`}>
                <Text style={[tw`text-xs text-gray-500 mb-1 ml-1`, { fontFamily: 'outfit' }]}>Last Name</Text>
                <View style={tw`bg-white rounded-2xl px-4 py-3 shadow-sm border border-gray-100`}>
                  <View style={tw`flex-row items-center`}>
                    <MaterialIcons name="person" size={20} color="#6b7280" />
                    <TextInput
                      style={[tw`flex-1 ml-3 text-gray-800`, { fontFamily: 'outfit' }]}
                      placeholder="Doe"
                      placeholderTextColor="#9ca3af"
                      value={formData.last_name}
                      onChangeText={(text) => setFormData({...formData, last_name: text})}
                    />
                  </View>
                </View>
              </View>
            </View>

            {/* Email */}
            <View>
              <Text style={[tw`text-xs text-gray-500 mb-1 ml-1`, { fontFamily: 'outfit' }]}>Email</Text>
              <View style={tw`bg-white rounded-2xl px-4 py-3 shadow-sm border border-gray-100`}>
                <View style={tw`flex-row items-center`}>
                  <MaterialIcons name="email" size={20} color="#6b7280" />
                  <TextInput
                    style={[tw`flex-1 ml-3 text-gray-800`, { fontFamily: 'outfit' }]}
                    placeholder="john.doe@example.com"
                    placeholderTextColor="#9ca3af"
                    keyboardType="email-address"
                    value={formData.email}
                    onChangeText={(text) => setFormData({...formData, email: text})}
                  />
                </View>
              </View>
            </View>

            {/* Date of Birth */}
            <View>
              <Text style={[tw`text-xs text-gray-500 mb-1 ml-1`, { fontFamily: 'outfit' }]}>Date of Birth</Text>
              <View style={tw`bg-white rounded-2xl px-4 py-3 shadow-sm border border-gray-100`}>
                <View style={tw`flex-row items-center`}>
                  <MaterialIcons name="calendar-today" size={20} color="#6b7280" />
                  <TextInput
                    style={[tw`flex-1 ml-3 text-gray-800`, { fontFamily: 'outfit' }]}
                    placeholder="MM/DD/YYYY"
                    placeholderTextColor="#9ca3af"
                    // value={formData.date_of_birth}
                    // onChangeText={(text) => setFormData({...formData, date_of_birth: text})}
                  />
                </View>
              </View>
            </View>

            {/* Gender */}
            <View>
              <Text style={[tw`text-xs text-gray-500 mb-1 ml-1`, { fontFamily: 'outfit' }]}>Gender</Text>
              <View style={tw`bg-white rounded-2xl px-4 shadow-sm border border-gray-100`}>
                <Picker
                  selectedValue={formData.gender}
                  onValueChange={(value) => setFormData({...formData, gender: value})}
                  style={[tw`text-gray-800`, { fontFamily: 'outfit' }]}
                >
                  <Picker.Item label="Select your gender" value="" />
                  <Picker.Item label="Male" value="Male" />
                  <Picker.Item label="Female" value="Female" />
                  <Picker.Item label="Other" value="other" />
                </Picker>
              </View>
            </View>

            {/* Phone */}
            <View>
              <Text style={[tw`text-xs text-gray-500 mb-1 ml-1`, { fontFamily: 'outfit' }]}>Phone</Text>
              <View style={tw`bg-white rounded-2xl px-4 py-3 shadow-sm border border-gray-100`}>
                <View style={tw`flex-row items-center`}>
                  <MaterialIcons name="phone" size={20} color="#6b7280" />
                  <TextInput
                    style={[tw`flex-1 ml-3 text-gray-800`, { fontFamily: 'outfit' }]}
                    placeholder="+1 (555) 000-0000"
                    placeholderTextColor="#9ca3af"
                    keyboardType="phone-pad"
                    value={formData.phone_number}
                    onChangeText={(text) => setFormData({...formData, phone_number: text})}
                  />
                </View>
              </View>
            </View>

            {/* Password */}
            <View>
              <Text style={[tw`text-xs text-gray-500 mb-1 ml-1`, { fontFamily: 'outfit' }]}>Password</Text>
              <View style={tw`bg-white rounded-2xl px-4 py-3 shadow-sm border border-gray-100`}>
                <View style={tw`flex-row items-center`}>
                  <MaterialIcons name="lock" size={20} color="#6b7280" />
                  <TextInput
                    style={[tw`flex-1 ml-3 text-gray-800`, { fontFamily: 'outfit' }]}
                    placeholder="Enter your password"
                    placeholderTextColor="#9ca3af"
                    secureTextEntry={!passwordVisible}
                    value={formData.password}
                    onChangeText={(text) => setFormData({...formData, password: text})}
                  />
                  <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
                    <Ionicons name={passwordVisible ? "eye-off" : "eye"} size={20} color="#6b7280" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            {/* Sign Up Button */}
            <TouchableOpacity
              style={tw`bg-blue-500 rounded-2xl py-4 shadow-lg mt-6`}
              onPress={handleSignUp}
            >
              <Text style={[tw`text-white text-center text-lg`, { fontFamily: 'outfit-medium' }]}>
                Create Account
              </Text>
            </TouchableOpacity>

            {/* Social Sign Up */}
            <View style={tw`mt-6`}>
              <View style={tw`flex-row items-center mb-6`}>
                <View style={tw`flex-1 h-px bg-gray-200`} />
                <Text style={[tw`mx-4 text-gray-500`, { fontFamily: 'outfit' }]}>
                  Or sign up with
                </Text>
                <View style={tw`flex-1 h-px bg-gray-200`} />
              </View>

              <View style={tw`flex-row justify-center `}>
                {['google', 'apple', 'facebook'].map((provider) => (
                  <TouchableOpacity 
                    key={provider}
                    style={tw`bg-white p-4 rounded-full shadow-md border border-gray-100`}
                  >
                    <Ionicons name={`logo-${provider}`} size={24} color="#374151" />
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Sign In Link */}
            <View style={tw`mt-6`}>
              <Text style={[tw`text-center text-gray-600`, { fontFamily: 'outfit' }]}>
                Already have an account?{" "}
                <Text 
                  style={[tw`text-blue-500`, { fontFamily: 'outfit-medium' }]}
                  onPress={() => router.push('/auth/sign-in')}
                >
                  Sign In
                </Text>
              </Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}
