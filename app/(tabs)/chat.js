import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  ScrollView,
} from "react-native";
import tw from "tailwind-react-native-classnames";
import { Ionicons } from "@expo/vector-icons";

// At the top of the file, add font style objects
const fontStyles = {
  regular: { fontFamily: 'outfit' },
  medium: { fontFamily: 'outfit-medium' },
  bold: { fontFamily: 'outfit-bold' }
};

// Update the ChatOption component
const ChatOption = ({ icon, text, isFirst }) => (
  <TouchableOpacity
    style={[
      tw`flex-row items-center bg-white rounded-2xl p-3.5 mb-2.5`,
      {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 3,
        elevation: 2,
      },
    ]}
  >
    <Text style={tw`text-lg mr-2.5`}>{icon}</Text>
    <Text
      style={[
        tw`text-gray-800 flex-1`,
        { fontSize: 15, lineHeight: 20 },
        fontStyles.regular
      ]}
    >
      {text}
    </Text>
  </TouchableOpacity>
);

// Update text styles in MedicalChatScreen
const MedicalChatScreen = () => {
  return (
    <SafeAreaView style={[tw`flex-1`, { backgroundColor: "#FAFAFA" }]}>
      {/* Header */}
      <View
        style={tw`flex-row items-center justify-between px-4 py-3 bg-white border-b border-gray-100 mt-10`}
      >
        <TouchableOpacity style={tw`bg-gray-200 rounded-full p-2`}>
          <Ionicons
            name="close"
            size={24}
            color="#666"
            onPress={() => navigation.goBack()}
          />
        </TouchableOpacity>
        <Text style={[tw`font-medium`, { fontSize: 20, color: "#1A1A1A" }, fontStyles.medium]}>
          medcare.ai
        </Text>
        <TouchableOpacity style={tw`bg-gray-200 rounded-full p-2`}>
          <Ionicons name="refresh" size={22} color="#666" />
        </TouchableOpacity>
      </View>

      <ScrollView style={tw`flex-1 px-4`} showsVerticalScrollIndicator={false}>
        {/* AI Message */}
        <View style={tw`flex-row mt-6 mb-7`}>
          <View
            style={[
              tw`w-8 h-8 rounded-full items-center justify-center mr-3`,
              { backgroundColor: "#1A1A1A" },
            ]}
          >
            <Text style={tw`text-white text-sm`}>🤖</Text>
          </View>
          <View style={tw`flex-1`}>
            <Text style={[tw`mb-0.5`, { fontSize: 15 }, fontStyles.regular]}>
              <Text style={{ color: "#FFB800" }}>👋 </Text>
              <Text style={fontStyles.medium}>Hi Jhon,</Text>
            </Text>
            <Text
              style={[
                tw`text-gray-800`,
                { fontSize: 15, lineHeight: 21 },
                fontStyles.regular
              ]}
            >
              Good morning! Help me understand exactly what do you want to talk
              about?
            </Text>
          </View>
        </View>

        {/* Quick Options */}
        <View style={tw`mb-4`}>
          <ChatOption
            icon="💊"
            text="Help me to book a consultant"
            isFirst={true}
          />
          <ChatOption icon="🏥" text="Find my nearby pharmacy?" />
          <ChatOption icon="🤒" text="Symptoms for a random disease?" />
          <ChatOption icon="👩‍⚕️" text="Find my nearby doctors?" />
          <ChatOption icon="💡" text="Give me some help tips for health" />
        </View>

        {/* User Typing Indicator */}
        <View style={tw`flex-row justify-end mb-4`}>
          <View
            style={[
              tw`w-8 h-8 rounded-full items-center justify-center`,
              { backgroundColor: "#F0F0F0" },
            ]}
          >
            <Text style={[tw`text-gray-500`, { fontSize: 16 }]}>•••</Text>
          </View>
        </View>
      </ScrollView>

      {/* Input Area */}
      <View
        style={[
          tw`px-4 py-3 bg-white border-t border-gray-100`,
          { borderTopColor: "#F0F0F0" },
        ]}
      >
        <View
          style={[
            tw`flex-row items-center bg-gray-50 rounded-full px-4 py-2.5`,
            { backgroundColor: "#F8F8F8" },
          ]}
        >
          <TextInput
            placeholder="Write here please..."
            placeholderTextColor="#999"
            style={[tw`flex-1`, { fontSize: 15, color: "#1A1A1A" }, fontStyles.regular]}
          />
          <TouchableOpacity style={tw`mr-2`}>
            <Ionicons name="attach" size={24} color="#666" />
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              tw`w-8 h-8 rounded-full items-center justify-center`,
              { backgroundColor: "#F0E6FF" },
            ]}
          >
            <Ionicons name="arrow-up" size={18} style={{ color: "#7C3AED" }} />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default MedicalChatScreen;
