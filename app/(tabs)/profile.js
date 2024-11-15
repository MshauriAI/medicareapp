import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, Switch } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import tw from 'tailwind-react-native-classnames';
import * as Progress from 'react-native-progress';
import { LinearGradient } from 'expo-linear-gradient';

export default function ProfileScreen() {
  const router = useRouter();
  const [notifications, setNotifications] = useState(true);
  const [biometrics, setBiometrics] = useState(true);

  const userProfile = {
    name: "John Doe",
    specialization: "General Practitioner",
    email: "john.doe@medcare.com",
    memberSince: "2023",
    avatar: require("../../assets/images/jeph.jpg"),
    consultations: 156,
    rating: 4.9,
    reviews: 234,
    upcomingAppointments: 3,
    recentConsultations: [
      { id: 1, patient: "Sarah Wilson", date: "2024-03-15", type: "Video Call" },
      { id: 2, patient: "Mike Brown", date: "2024-03-12", type: "In-Person" },
      { id: 3, patient: "Emma Davis", date: "2024-03-10", type: "Video Call" },
    ]
  };

  const menuItems = [
    {
      title: "Medical Profile",
      items: [
        { icon: "medical", label: "Medical History", route: "medical-history" },
        { icon: "document-text", label: "Prescriptions", route: "prescriptions" },
        { icon: "fitness", label: "Health Metrics", route: "health-metrics" },
        { icon: "calendar", label: "Appointments", route: "appointments" },
      ]
    },
    
    {
      title: "Settings & Support",
      items: [
        { icon: "settings", label: "Account Settings", route: "settings" },
        { icon: "shield-checkmark", label: "Privacy", route: "privacy" },
        { icon: "headset", label: "Support", route: "support" },
        { icon: "information-circle", label: "About", route: "about" },
      ]
    }
  ];

  return (
    <ScrollView style={tw`flex-1 bg-white`}>
      {/* Profile Header */}
      <LinearGradient
        colors={['#3B82F6', '#2563EB']}
        style={tw`p-6 rounded-b-3xl`}
      >
        <View style={tw`flex-row items-center mt-6`}>
          <Image
            source={userProfile.avatar}
            style={tw`w-24 h-24 rounded-full border-4 border-white`}
          />
          <View style={tw`ml-4 flex-1`}>
            <Text style={tw`text-white text-2xl font-bold`}>{userProfile.name}</Text>
            <Text style={tw`text-blue-100`}>{userProfile.specialization}</Text>
            <View style={tw`flex-row items-center mt-2`}>
              <Ionicons name="star" size={20} color="#FCD34D" />
              <Text style={tw`text-white ml-2`}>{userProfile.rating} Rating</Text>
            </View>
          </View>
        </View>

        {/* Quick Stats */}
        <View style={tw`flex-row justify-between mt-6  rounded-2xl p-4`}>
          <View style={tw`items-center`}>
            <Text style={tw`text-white text-xl font-bold`}>{userProfile.consultations}</Text>
            <Text style={tw`text-blue-100 text-sm`}>Consultations</Text>
          </View>
          <View style={tw`items-center`}>
            <Text style={tw`text-white text-xl font-bold`}>{userProfile.memberSince}</Text>
            <Text style={tw`text-blue-100 text-sm`}>Member since</Text>
          </View>
          
          <View style={tw`items-center`}>
            <Text style={tw`text-white text-xl font-bold`}>{userProfile.upcomingAppointments}</Text>
            <Text style={tw`text-blue-100 text-sm`}>Upcoming</Text>
          </View>
        </View>
      </LinearGradient>

      {/* Recent Consultations */}
      <View style={tw`px-6 py-4`}>
        <Text style={tw`text-gray-900 text-lg font-bold mb-4`}>Recent Consultations</Text>
        {userProfile.recentConsultations.map((consultation) => (
          <TouchableOpacity
            key={consultation.id}
            style={tw`bg-gray-50 rounded-xl p-4 mb-3 flex-row items-center`}
          >
            <View style={tw`w-10 h-10 bg-blue-100 rounded-full items-center justify-center`}>
              <Ionicons 
                name={consultation.type === "Video Call" ? "videocam" : "medical"} 
                size={20} 
                color="#2563EB" 
              />
            </View>
            <View style={tw`flex-1 ml-4`}>
              <Text style={tw`text-gray-900 font-bold`}>{consultation.patient}</Text>
              <Text style={tw`text-gray-500 text-sm`}>{consultation.date}</Text>
            </View>
            <Text style={tw`text-blue-600 text-sm`}>{consultation.type}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Menu Sections */}
      {menuItems.map((section, index) => (
        <View key={index} style={tw`px-6 py-4`}>
          <Text style={tw`text-gray-900 text-lg font-bold mb-4`}>{section.title}</Text>
          <View style={tw`bg-gray-50 rounded-xl overflow-hidden`}>
            {section.items.map((item, itemIndex) => (
              <TouchableOpacity
                key={itemIndex}
                style={tw`flex-row items-center p-4 ${
                  itemIndex !== section.items.length - 1 ? 'border-b border-gray-100' : ''
                }`}
                onPress={() => router.push(item.route)}
              >
                <View style={tw`w-8 h-8 bg-blue-100 rounded-full items-center justify-center`}>
                  <Ionicons name={item.icon} size={18} color="#2563EB" />
                </View>
                <Text style={tw`text-gray-900 ml-4 flex-1`}>{item.label}</Text>
                <Ionicons name="chevron-forward" size={20} color="#6B7280" />
              </TouchableOpacity>
            ))}
          </View>
        </View>
      ))}

      {/* Settings */}
      <View style={tw`px-6 py-4 mb-4`}>
        <Text style={tw`text-gray-900 text-lg font-bold mb-4`}>Quick Settings</Text>
        <View style={tw`bg-gray-50 rounded-xl overflow-hidden`}>
          <View style={tw`flex-row items-center justify-between p-4 border-b border-gray-100`}>
            <View style={tw`flex-row items-center`}>
              <View style={tw`w-8 h-8 bg-blue-100 rounded-full items-center justify-center`}>
                <Ionicons name="notifications" size={18} color="#2563EB" />
              </View>
              <Text style={tw`text-gray-900 ml-4`}>Notifications</Text>
            </View>
            <Switch
              value={notifications}
              onValueChange={setNotifications}
              trackColor={{ false: '#D1D5DB', true: '#93C5FD' }}
              thumbColor={notifications ? '#2563EB' : '#9CA3AF'}
            />
          </View>
          <View style={tw`flex-row items-center justify-between p-4`}>
            <View style={tw`flex-row items-center`}>
              <View style={tw`w-8 h-8 bg-blue-100 rounded-full items-center justify-center`}>
                <Ionicons name="finger-print" size={18} color="#2563EB" />
              </View>
              <Text style={tw`text-gray-900 ml-4`}>Biometric Login</Text>
            </View>
            <Switch
              value={biometrics}
              onValueChange={setBiometrics}
              trackColor={{ false: '#D1D5DB', true: '#93C5FD' }}
              thumbColor={biometrics ? '#2563EB' : '#9CA3AF'}
            />
          </View>
        </View>
      </View>

      {/* Logout Button */}
      <TouchableOpacity
        style={tw`mx-6 my-8 bg-red-500 p-4 rounded-xl flex-row justify-center items-center`}
        onPress={() => {/* Handle logout */}}
      >
        <Ionicons name="log-out" size={24} color="white" style={tw`mr-2`} />
        <Text style={tw`text-white font-bold text-lg`}>Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}