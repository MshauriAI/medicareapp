import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import tw from 'tailwind-react-native-classnames';

const FAQItem = ({ question, answer }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  return (
    <TouchableOpacity 
      style={tw`bg-white rounded-xl mb-3 shadow-sm`}
      onPress={() => setIsExpanded(!isExpanded)}
    >
      <View style={tw`p-4 flex-row justify-between items-center`}>
        <Text style={[tw`text-gray-800 flex-1`, { fontFamily: 'outfit-medium' }]}>{question}</Text>
        <Ionicons name={isExpanded ? "chevron-up" : "chevron-down"} size={20} color="#4B5563" />
      </View>
      {isExpanded && (
        <View style={tw`p-4 pt-0`}>
          <Text style={[tw`text-gray-600`, { fontFamily: 'outfit' }]}>{answer}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default function SupportScreen({ navigation }) {
  const faqs = [
    {
      question: "How do I schedule an appointment?",
      answer: "You can schedule an appointment through the 'Bookings' tab or by clicking the 'Book Appointment' button on the home screen."
    },
    {
      question: "How do video consultations work?",
      answer: "Video consultations are conducted through our secure platform. Simply join the call at your scheduled time from the 'Appointments' section."
    },
    {
      question: "What should I do in case of emergency?",
      answer: "For medical emergencies, please call your local emergency services immediately. Our platform is not intended for emergency care."
    }
  ];

  const contactOptions = [
    { icon: "mail", title: "Email Support", subtitle: "support@medcare.com" },
    { icon: "call", title: "Phone Support", subtitle: "+1 (555) 123-4567" },
    { icon: "chatbubbles", title: "Live Chat", subtitle: "Available 24/7" }
  ];

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
          <Text style={[tw`text-white text-xl ml-2`, { fontFamily: 'outfit-bold' }]}>Support</Text>
        </View>
      </LinearGradient>

      <ScrollView style={tw`flex-1 px-4 pt-6`}>
        {/* Contact Options */}
        <Text style={[tw`text-xl text-gray-900 mb-4`, { fontFamily: 'outfit-bold' }]}>Contact Us</Text>
        {contactOptions.map((option, index) => (
          <TouchableOpacity 
            key={index}
            style={tw`flex-row items-center bg-white p-4 rounded-xl mb-3 shadow-sm`}
          >
            <View style={tw`w-10 h-10 bg-blue-100 rounded-full items-center justify-center`}>
              <Ionicons name={option.icon} size={20} color="#2563EB" />
            </View>
            <View style={tw`ml-4`}>
              <Text style={[tw`text-gray-900`, { fontFamily: 'outfit-medium' }]}>{option.title}</Text>
              <Text style={[tw`text-gray-600`, { fontFamily: 'outfit' }]}>{option.subtitle}</Text>
            </View>
          </TouchableOpacity>
        ))}

        {/* FAQs */}
        <Text style={[tw`text-xl text-gray-900 mt-6 mb-4`, { fontFamily: 'outfit-bold' }]}>
          Frequently Asked Questions
        </Text>
        {faqs.map((faq, index) => (
          <FAQItem key={index} question={faq.question} answer={faq.answer} />
        ))}

        {/* Help Resources */}
        <Text style={[tw`text-xl text-gray-900 mt-6 mb-4`, { fontFamily: 'outfit-bold' }]}>
          Help Resources
        </Text>
        <View style={tw`bg-white rounded-xl p-4 shadow-sm mb-8`}>
          <TouchableOpacity style={tw`flex-row items-center mb-4`}>
            <Ionicons name="document-text" size={20} color="#2563EB" />
            <Text style={[tw`ml-3 text-gray-900`, { fontFamily: 'outfit-medium' }]}>User Guide</Text>
          </TouchableOpacity>
          <TouchableOpacity style={tw`flex-row items-center mb-4`}>
            <Ionicons name="play-circle" size={20} color="#2563EB" />
            <Text style={[tw`ml-3 text-gray-900`, { fontFamily: 'outfit-medium' }]}>Video Tutorials</Text>
          </TouchableOpacity>
          <TouchableOpacity style={tw`flex-row items-center`}>
            <Ionicons name="book" size={20} color="#2563EB" />
            <Text style={[tw`ml-3 text-gray-900`, { fontFamily: 'outfit-medium' }]}>Knowledge Base</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}