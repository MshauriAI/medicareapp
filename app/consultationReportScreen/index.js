import React from "react";
import { View, Text, TouchableOpacity, ScrollView, Animated } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import tw from 'tailwind-react-native-classnames';

export default function ConsultationReport({ navigation }) {
    const reportDetails = {
        patientName: "John Doe",
        consultationDate: "November 12, 2024",
        doctor: "Dr. Jane Smith",
        specialty: "Cardiologist",
        diagnosis: "Mild Hypertension",
        treatment: "Increase physical activity and reduce salt intake",
        nextVisit: "December 12, 2024"
    };

    const fadeAnim = new Animated.Value(0);

    React.useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true
        }).start();
    }, []);

    return (
        <View style={tw`flex-1 bg-gray-50`}>
            <LinearGradient
                colors={['#3B82F6', '#2563EB']}
                style={tw`pt-12 pb-6 px-4 rounded-b-3xl`}
            >
                <View style={tw`flex-row justify-between items-center`}>
                    <TouchableOpacity 
                        style={tw`flex-row items-center`}
                        onPress={() => navigation.goBack()}
                    >
                        <Ionicons name="chevron-back" size={24} color="white" />
                        <Text style={[tw`text-white text-lg ml-1`, { fontFamily: 'outfit-medium' }]}>Report</Text>
                    </TouchableOpacity>
                    <View style={tw`flex-row items-center `}>
                        <TouchableOpacity style={tw`relative`}>
                            <Ionicons name="notifications-outline" size={24} color="white" />
                            <View style={tw`absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white`} />
                        </TouchableOpacity>
                    </View>
                </View>
            </LinearGradient>

            <ScrollView style={tw`flex-1 px-4 py-6`}>
                <Animated.View style={{ opacity: fadeAnim }}>
                    {/* Patient Info Card */}
                    <View style={tw`bg-white rounded-2xl p-5 shadow-lg mb-4`}>
                        <LinearGradient
                            colors={['#3B82F6', '#2563EB']}
                            style={tw`flex-row items-center p-3 rounded-xl mb-4`}
                        >
                            <Ionicons name="person-circle" size={24} color="white" />
                            <Text style={[tw`text-white text-lg ml-2`, { fontFamily: 'outfit-bold' }]}>
                                Patient Information
                            </Text>
                        </LinearGradient>
                        <View style={tw`-2`}>
                            <Text style={[tw`text-gray-900`, { fontFamily: 'outfit-bold' }]}>
                                {reportDetails.patientName}
                            </Text>
                            <Text style={[tw`text-gray-600`, { fontFamily: 'outfit' }]}>
                                Consultation: {reportDetails.consultationDate}
                            </Text>
                        </View>
                    </View>

                    {/* Doctor Info Card */}
                    <View style={tw`bg-white rounded-2xl p-5 shadow-lg mb-4`}>
                        <LinearGradient
                            colors={['#3B82F6', '#2563EB']}
                            style={tw`flex-row items-center p-3 rounded-xl mb-4`}
                        >
                            <Ionicons name="medkit" size={24} color="white" />
                            <Text style={[tw`text-white text-lg ml-2`, { fontFamily: 'outfit-bold' }]}>
                                Doctor Information
                            </Text>
                        </LinearGradient>
                        <View style={tw`-2`}>
                            <Text style={[tw`text-gray-900`, { fontFamily: 'outfit-bold' }]}>
                                {reportDetails.doctor}
                            </Text>
                            <Text style={[tw`text-gray-600`, { fontFamily: 'outfit' }]}>
                                {reportDetails.specialty}
                            </Text>
                        </View>
                    </View>

                    {/* Diagnosis Card */}
                    <View style={tw`bg-white rounded-2xl p-5 shadow-lg mb-4`}>
                        <LinearGradient
                            colors={['#3B82F6', '#2563EB']}
                            style={tw`flex-row items-center p-3 rounded-xl mb-4`}
                        >
                            <Ionicons name="pulse" size={24} color="white" />
                            <Text style={[tw`text-white text-lg ml-2`, { fontFamily: 'outfit-bold' }]}>
                                Diagnosis
                            </Text>
                        </LinearGradient>
                        <Text style={[tw`text-gray-700`, { fontFamily: 'outfit' }]}>
                            {reportDetails.diagnosis}
                        </Text>
                    </View>

                    {/* Treatment Card */}
                    <View style={tw`bg-white rounded-2xl p-5 shadow-lg mb-4`}>
                        <LinearGradient
                            colors={['#3B82F6', '#2563EB']}
                            style={tw`flex-row items-center p-3 rounded-xl mb-4`}
                        >
                            <Ionicons name="medical" size={24} color="white" />
                            <Text style={[tw`text-white text-lg ml-2`, { fontFamily: 'outfit-bold' }]}>
                                Treatment Plan
                            </Text>
                        </LinearGradient>
                        <Text style={[tw`text-gray-700`, { fontFamily: 'outfit' }]}>
                            {reportDetails.treatment}
                        </Text>
                    </View>

                    {/* Next Visit Card */}
                    <View style={tw`bg-white rounded-2xl p-5 shadow-lg mb-6`}>
                        <LinearGradient
                            colors={['#3B82F6', '#2563EB']}
                            style={tw`flex-row items-center p-3 rounded-xl mb-4`}
                        >
                            <Ionicons name="calendar" size={24} color="white" />
                            <Text style={[tw`text-white text-lg ml-2`, { fontFamily: 'outfit-bold' }]}>
                                Next Appointment
                            </Text>
                        </LinearGradient>
                        <Text style={[tw`text-gray-700`, { fontFamily: 'outfit' }]}>
                            {reportDetails.nextVisit}
                        </Text>
                    </View>

                    {/* Action Buttons */}
                    <View style={tw`flex-row justify-between mb-8`}>
                        <TouchableOpacity 
                            style={tw`bg-gray-100 w-5/12 rounded-xl py-4 items-center`}
                            onPress={() => navigation.goBack()}
                        >
                            <Text style={[tw`text-gray-700`, { fontFamily: 'outfit-medium' }]}>
                                Back
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={tw`bg-blue-500 w-5/12 rounded-xl py-4 items-center`}>
                            <Text style={[tw`text-white`, { fontFamily: 'outfit-medium' }]}>
                                Download PDF
                            </Text>
                        </TouchableOpacity>
                    </View>
                </Animated.View>
            </ScrollView>
        </View>
    );
}
