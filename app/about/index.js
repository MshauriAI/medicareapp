import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import tw from 'tailwind-react-native-classnames';

export default function AboutScreen({ navigation }) {
  return (
    <View style={tw`flex-1 bg-gray-50`}>
      <LinearGradient
        colors={['#3B82F6', '#2563EB']}
        style={tw`pt-12 pb-6 px-4 rounded-b-3xl`}
      >
        <View style={tw`flex-row items-center`}>
          <TouchableOpacity 
            style={tw`p-2`}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text style={[tw`text-white text-xl ml-2`, { fontFamily: 'outfit-bold' }]}>About Us</Text>
        </View>
      </LinearGradient>

      <ScrollView style={tw`flex-1 px-4 pt-6`}>
        {/* App Description */}
        <View style={tw`bg-white rounded-xl p-6 shadow-sm mb-6`}>
          <Text style={[tw`text-xl text-gray-900 mb-4`, { fontFamily: 'outfit-bold' }]}>Our App</Text>
          <Text style={[tw`text-gray-700`, { fontFamily: 'outfit' }]}>
            MedCare is a comprehensive healthcare platform designed to connect patients with healthcare providers seamlessly. Our mission is to make healthcare accessible and efficient for everyone.
          </Text>
        </View>

        {/* Features */}
        <View style={tw`bg-white rounded-xl p-6 shadow-sm mb-6`}>
          <Text style={[tw`text-xl text-gray-900 mb-4`, { fontFamily: 'outfit-bold' }]}>Features</Text>
          <View style={tw`space-y-3`}>
            <View style={tw`flex-row items-center`}>
              <Ionicons name="videocam" size={24} color="#2563EB" />
              <Text style={[tw`ml-3 text-gray-700`, { fontFamily: 'outfit' }]}>Video Consultations</Text>
            </View>
            <View style={tw`flex-row items-center`}>
              <Ionicons name="location" size={24} color="#2563EB" />
              <Text style={[tw`ml-3 text-gray-700`, { fontFamily: 'outfit' }]}>Find Nearby Hospitals</Text>
            </View>
            <View style={tw`flex-row items-center`}>
              <Ionicons name="document-text" size={24} color="#2563EB" />
              <Text style={[tw`ml-3 text-gray-700`, { fontFamily: 'outfit' }]}>Digital Prescriptions</Text>
            </View>
            <View style={tw`flex-row items-center`}>
              <Ionicons name="fitness" size={24} color="#2563EB" />
              <Text style={[tw`ml-3 text-gray-700`, { fontFamily: 'outfit' }]}>Health Metrics Tracking</Text>
            </View>
          </View>
        </View>

        {/* Team */}
        <View style={tw`bg-white rounded-xl p-6 shadow-sm mb-6`}>
          <Text style={[tw`text-xl text-gray-900 mb-4`, { fontFamily: 'outfit-bold' }]}>Our Team</Text>
          <View style={tw`flex-row items-center mb-4`}>
            <Image
              source={{ uri: 'https://via.placeholder.com/50' }}
              style={tw`w-12 h-12 rounded-full`}
            />
            <View style={tw`ml-4`}>
              <Text style={[tw`text-gray-900`, { fontFamily: 'outfit-medium' }]}>Dr. Jane Smith</Text>
              <Text style={[tw`text-gray-600`, { fontFamily: 'outfit' }]}>Cardiologist</Text>
            </View>
          </View>
          <View style={tw`flex-row items-center mb-4`}>
            <Image
              source={{ uri: 'https://via.placeholder.com/50' }}
              style={tw`w-12 h-12 rounded-full`}
            />
            <View style={tw`ml-4`}>
              <Text style={[tw`text-gray-900`, { fontFamily: 'outfit-medium' }]}>Dr. John Doe</Text>
              <Text style={[tw`text-gray-600`, { fontFamily: 'outfit' }]}>General Practitioner</Text>
            </View>
          </View>
          <View style={tw`flex-row items-center`}>
            <Image
              source={{ uri: 'https://via.placeholder.com/50' }}
              style={tw`w-12 h-12 rounded-full`}
            />
            <View style={tw`ml-4`}>
              <Text style={[tw`text-gray-900`, { fontFamily: 'outfit-medium' }]}>Dr. Emily Davis</Text>
              <Text style={[tw`text-gray-600`, { fontFamily: 'outfit' }]}>Pediatrician</Text>
            </View>
          </View>
        </View>

        {/* Contact Us */}
        <View style={tw`bg-white rounded-xl p-6 shadow-sm mb-8`}>
          <Text style={[tw`text-xl text-gray-900 mb-4`, { fontFamily: 'outfit-bold' }]}>Contact Us</Text>
          <View style={tw`flex-row items-center mb-4`}>
            <Ionicons name="mail" size={24} color="#2563EB" />
            <Text style={[tw`ml-3 text-gray-700`, { fontFamily: 'outfit' }]}>support@medcare.com</Text>
          </View>
          <View style={tw`flex-row items-center`}>
            <Ionicons name="call" size={24} color="#2563EB" />
            <Text style={[tw`ml-3 text-gray-700`, { fontFamily: 'outfit' }]}>+1 (555) 123-4567</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}