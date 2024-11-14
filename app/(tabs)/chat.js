import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  ScrollView,
  Animated,
} from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from "@expo/vector-icons";
import tw from "tailwind-react-native-classnames";

// At the top of the file, add font style objects
const fontStyles = {
  regular: { fontFamily: 'outfit' },
  medium: { fontFamily: 'outfit-medium' },
  bold: { fontFamily: 'outfit-bold' }
};

// Update the ChatOption component
const ChatOption = ({ icon, text, color1, color2 }) => (
  <TouchableOpacity
    style={[
      tw`mb-3`,
      {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 3,
      },
    ]}
  >
    <LinearGradient
      colors={[color1, color2]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={tw`flex-row items-center rounded-2xl p-4`}
    >
      <Text style={tw`text-2xl mr-3`}>{icon}</Text>
      <Text
        style={[
          tw`text-gray-800 flex-1`,
          { fontSize: 15, lineHeight: 20, fontFamily: 'outfit-medium' }
        ]}
      >
        {text}
      </Text>
      <Ionicons name="chevron-forward" size={20} color="#4B5563" />
    </LinearGradient>
  </TouchableOpacity>
);

// Update text styles in MedicalChatScreen
const MedicalChatScreen = () => {
  return (
    <SafeAreaView style={[tw`flex-1`, { backgroundColor: "#FAFAFA" }]}>
      {/* Header with Gradient */}
      <LinearGradient
        colors={['#ffffff', '#f9fafb']}
        style={tw`px-4 py-3 border-b border-gray-100 mt-10`}
      >
        <View style={tw`flex-row items-center justify-between`}>
          <TouchableOpacity style={tw`bg-gray-100 rounded-full p-2.5 shadow-sm`}>
            <Ionicons name="close" size={24} color="#374151" />
          </TouchableOpacity>
          <View style={tw`flex-row items-center`}>
            <Text style={[tw`text-xl text-gray-900`, { fontFamily: 'outfit-bold' }]}>
              medcare
            </Text>
            <Text style={[tw`text-xl text-blue-500`, { fontFamily: 'outfit-bold' }]}>
              .ai
            </Text>
          </View>
          <TouchableOpacity style={tw`bg-gray-100 rounded-full p-2.5 shadow-sm`}>
            <Ionicons name="refresh" size={22} color="#374151" />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <ScrollView style={tw`flex-1 px-4`} showsVerticalScrollIndicator={false}>
        {/* AI Message with better styling */}
        <View style={tw`flex-row mt-6 mb-7`}>
          <LinearGradient
            colors={['#3B82F6', '#2563EB']}
            style={tw`w-10 h-10 rounded-full items-center justify-center mr-3 shadow-lg`}
          >
            <Text style={tw`text-white text-lg`}>🤖</Text>
          </LinearGradient>
          <View style={tw`flex-1`}>
            <Text style={[tw`mb-1`, { fontSize: 16, fontFamily: 'outfit-medium' }]}>
              <Text style={{ color: "#FFB800" }}>👋 </Text>
              <Text style={{ color: "#111827" }}>Hi John,</Text>
            </Text>
            <LinearGradient
              colors={['#F3F4F6', '#F9FAFB']}
              style={tw`p-4 rounded-2xl rounded-tl-none`}
            >
              <Text
                style={[
                  tw`text-gray-800`,
                  { fontSize: 15, lineHeight: 22, fontFamily: 'outfit' }
                ]}
              >
                Good morning! How can I assist you today?
              </Text>
            </LinearGradient>
          </View>
        </View>

        {/* Enhanced Quick Options */}
        <View style={tw`mb-4`}>
          <ChatOption
            icon="💊"
            text="Book a consultation"
            color1="#FEF3C7"
            color2="#FDE68A"
          />
          <ChatOption
            icon="🏥"
            text="Find nearby pharmacy"
            color1="#DBEAFE"
            color2="#BFDBFE"
          />
          <ChatOption
            icon="🤒"
            text="Check symptoms"
            color1="#FCE7F3"
            color2="#FBCFE8"
          />
          <ChatOption
            icon="👩‍⚕️"
            text="Find nearby doctors"
            color1="#D1FAE5"
            color2="#A7F3D0"
          />
          <ChatOption
            icon="💡"
            text="Health tips & advice"
            color1="#E0E7FF"
            color2="#C7D2FE"
          />
        </View>

        {/* Animated Typing Indicator */}
        <View style={tw`flex-row justify-end mb-4`}>
          <LinearGradient
            colors={['#F3F4F6', '#F9FAFB']}
            style={tw`w-16 h-8 rounded-full items-center justify-center shadow-sm`}
          >
            <Text style={tw`text-gray-600 text-lg`}>• • •</Text>
          </LinearGradient>
        </View>
      </ScrollView>

      {/* Enhanced Input Area */}
      <View style={tw`px-4 py-4 bg-white border-t border-gray-100`}>
        <LinearGradient
          colors={['#F9FAFB', '#F3F4F6']}
          style={tw`flex-row items-center rounded-full px-5 py-3`}
        >
          <TextInput
            placeholder="Type your message..."
            placeholderTextColor="#6B7280"
            style={[
              tw`flex-1 mr-3`,
              { fontSize: 16, color: "#111827", fontFamily: 'outfit' }
            ]}
          />
          <View style={tw`flex-row items-center`}>
            <TouchableOpacity style={tw`mr-4`}>
              <Ionicons name="attach" size={24} color="#6B7280" />
            </TouchableOpacity>
            <TouchableOpacity>
              <LinearGradient
                colors={['#3B82F6', '#2563EB']}
                style={tw`w-10 h-10 rounded-full items-center justify-center shadow-lg`}
              >
                <Ionicons name="arrow-up" size={20} color="#FFFFFF" />
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </View>
    </SafeAreaView>
  );
};

export default MedicalChatScreen;
