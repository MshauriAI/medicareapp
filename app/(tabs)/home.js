import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import tw from "tailwind-react-native-classnames";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Linking } from 'react-native';
import { useRouter } from 'expo-router';

export default function Home() {
    const router = useRouter();
    const [user, setUser] = useState({ name: '' });
    const [isModalVisible, setModalVisible] = useState(false);
    const [imageUri, setImageUri] = useState(null);
    const [upcomingAppointments, setUpcomingAppointments] = useState(0);
    const [upcomingAppointment, setUpcomingAppointment] = useState(null);

    const date = new Date();
    const dayName = date.toLocaleDateString('en-US', { weekday: 'long'});
    const day = date.getDate();
    const month = date.toLocaleDateString('en-US', {month: 'long'});
    const year = date.getFullYear();

    useEffect(() => {
        const getUserInfo = async () => {
          try {
            const userInfo = await AsyncStorage.getItem('userInfo');
            if (userInfo !== null) {
              const parsedUser = JSON.parse(userInfo);
              setUser(parsedUser);
              console.log(parsedUser);
    
              if (parsedUser.imageUri) {
                setImageUri(parsedUser.imageUri);
                console.log("Retrieved imageUri:", parsedUser.imageUri);
              } else {
                console.log("No property");
              }
    
              if (parsedUser.token) {
                getUpcomingAppointmentsCount(parsedUser.token);
                getUpcomingAppointment(parsedUser.token);
              } else {
                console.log("No token available");
              }
            }
          } catch (error) {
            console.error("Error retrieving user info:", error);
          } 
        };
    
        getUserInfo();
      }, []);

      const getUpcomingAppointmentsCount = async (token) => {
        try {
          const response =  await fetch('https://stallion-holy-informally.ngrok-free.app/api/v1.0/appointments/count', {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`
            },
          });
    
          if (response.ok) {
            const data = await response.json();
            const upcomingAppointmentsCount = data.totalAppointments;
            setUpcomingAppointments(upcomingAppointmentsCount);
            
          } else {
            console.log('failed to fetch upcoming appointments');
          }
        } catch (error) {
          console.error("Error fetching upcoming appointments: ", error);
        }
      };

      const getUpcomingAppointment = async (token) => {
        try {
          const response =  await fetch('https://stallion-holy-informally.ngrok-free.app/api/v1.0/appointments/upcoming', {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`
            },
          });
    
          if (response.ok) {
            const data = await response.json();
            const upcoming = data.appointments;
            console.log("test", upcoming);
            setUpcomingAppointment(upcoming);
            console.log('upcoming: ',upcomingAppointment)
          } else {
            console.log('failed to fetch upcoming appointments');
          }
        } catch (error) {
          console.error("Error fetching upcoming appointments: ", error);
        }
      }

    const handlePress = (meet_link) => {
        if (upcomingAppointments !== 0) {
            Linking.openURL(meet_link);
        }
    };

  return (
    <ScrollView style={tw`flex-1 bg-gray-50`}>
      {/* Header */}
      <LinearGradient
        colors={['#ffffff', '#f3f4f6']}
        style={tw`px-5 pt-12 pb-6`}
      >
        <View style={tw`flex-row justify-between items-center`}>
          <View>
            <Text style={[tw`text-lg text-gray-600`, { fontFamily: 'outfit' }]}>Welcome back,</Text>
            <Text style={[tw`text-2xl text-gray-900`, { fontFamily: 'outfit-bold' }]}>{user.firstName}</Text>
          </View>
          <View style={tw`flex-row items-center space-x-4`}>
            <TouchableOpacity style={tw`relative`}>
              <Ionicons name="notifications-outline" size={24} color="#1c1917" />
              <View style={tw`absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white`} />
            </TouchableOpacity>
            
          </View>
        </View>
      </LinearGradient>

      <View style={tw`px-5 py-6`}>
        {/* Date Display */}
        <View style={tw`mb-6`}>
          <Text style={[tw`text-base text-gray-500`, { fontFamily: 'outfit' }]}>
            {dayName}, {month} {day}
          </Text>
        </View>

        {/* Upcoming Appointment Card */}
        <View style={tw`bg-white rounded-3xl p-6 shadow-lg mb-6`}>
          <View style={tw`flex-row justify-between items-center mb-4`}>
            <Text style={[tw`text-xl text-gray-900`, { fontFamily: 'outfit-bold' }]}>
              Upcoming Appointment
            </Text>
            <TouchableOpacity>
              <Text style={[tw`text-blue-600`, { fontFamily: 'outfit-medium' }]}
                onPress={() => router.push('/(tabs)/booking')}
              >View all</Text>
            </TouchableOpacity>
          </View>

          {upcomingAppointment ? (
            <View style={tw`flex-row items-center`}>
              <Image 
                source={{ uri: upcomingAppointment[0].doctor_image_url }}
                style={tw`w-16 h-16 rounded-2xl mr-4`}
              />
              <View style={tw`flex-1`}>
                <Text style={[tw`text-lg text-gray-900 mb-1`, { fontFamily: 'outfit-bold' }]}>
                  Dr. {upcomingAppointment[0].doctor_first_name}
                </Text>
                <Text style={[tw`text-gray-500 mb-2`, { fontFamily: 'outfit' }]}>
                  {upcomingAppointment[0].doctor_specialization}
                </Text>
                <View style={tw`flex-row items-center`}>
                  <View style={tw`flex-row items-center mr-4`}>
                    <Ionicons name="time-outline" size={16} color="#6b7280" />
                    <Text style={[tw`ml-1 text-gray-600`, { fontFamily: 'outfit' }]}>
                      {upcomingAppointment[0].date}
                    </Text>
                  </View>
                  <TouchableOpacity 
                    onPress={() => handlePress(upcomingAppointment[0].meet_link)}
                    style={tw`bg-blue-50 px-3 py-1 rounded-full flex-row items-center`}
                  >
                    <Ionicons name="videocam" size={16} color="#2563eb" />
                    <Text style={[tw`ml-1 text-blue-600`, { fontFamily: 'outfit-medium' }]}>
                      Video Call
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ) : (
            <View style={tw`items-center py-6`}>
              <View style={tw`bg-gray-100 w-16 h-16 rounded-full items-center justify-center mb-3`}>
                <Ionicons name="calendar-outline" size={32} color="#6b7280" />
              </View>
              <Text style={[tw`text-gray-600 mb-4`, { fontFamily: 'outfit' }]}>
                No upcoming appointments
              </Text>
              <TouchableOpacity 
                style={tw`bg-blue-600 px-6 py-3 rounded-xl`}
              >
                <Text style={[tw`text-white`, { fontFamily: 'outfit-medium' }]}
                    onPress={() => router.push('/(tabs)/booking')}
                >
                  Book Appointment
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* Quick Actions */}
        <Text style={[tw`text-xl text-gray-900 mb-4`, { fontFamily: 'outfit-bold' }]}>
          Quick Actions
        </Text>
        
        <View style={tw`flex-row flex-wrap -mx-2`}>
          {[
            { 
              title: 'Video Consultation', 
              icon: 'videocam', 
              color: 'bg-yellow-100', 
              iconColor: '#1c1917',
              route: '/videocall'
            },
            { 
              title: 'Find Hospital', 
              icon: 'location', 
              color: 'bg-green-100', 
              iconColor: '#1c1917',
              route: '/maps'
            },
            // { 
            //   title: 'Lab Tests', 
            //   icon: 'flask', 
            //   color: 'bg-purple-100', 
            //   iconColor: '#1c1917',
            //   route: '/lab-tests'
            // },
            // { 
            //   title: 'Medicines', 
            //   icon: 'medical', 
            //   color: 'bg-blue-100', 
            //   iconColor: '#1c1917',
            //   route: '/medicines'
            // },
          ].map((item, index) => (
            <TouchableOpacity 
              key={index}
              style={tw`w-1/2 px-2 mb-4`}
              onPress={() => router.push(item.route)}
            >
              <View style={[tw`${item.color} p-4 rounded-2xl`, { minHeight: 120 }]}>
                <View style={tw`bg-white w-10 h-10 rounded-xl items-center justify-center mb-3`}>
                  <Ionicons name={item.icon} size={24} color={item.iconColor} />
                </View>
                <Text style={[tw`text-gray-900`, { fontFamily: 'outfit-medium' }]}>
                  {item.title}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}
