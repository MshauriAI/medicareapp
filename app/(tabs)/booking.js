import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import { Ionicons } from '@expo/vector-icons';


const AppointmentsScreen = () => {
  const appointments = {
    today: [
      {
        id: 1,
        name: 'Dr. Wesley Cain',
        time: 'Today, 4:30pm',
        image: require('../../assets/images/jeph.jpg'),
        bgColor: 'bg-pink-50'
      },
      {
        id: 2,
        name: 'Dr. Betty Mason',
        time: 'Today, 8:00pm',
        image: require('../../assets/images/jeph.jpg'),
        bgColor: 'bg-cyan-50'
      }
    ],
    other: [
      {
        id: 3,
        name: 'Dr. Gravin Gibbs',
        time: 'Fri, Mar 2023, 2:30pm',
        image: require('../../assets/images/jeph.jpg'),
        bgColor: 'bg-yellow-50'
      },
      {
        id: 4,
        name: 'Dr. Bidya Balan',
        time: 'Thu, Mar 2023, 9:45pm',
        image: require('../../assets/images/jeph.jpg'),
        bgColor: 'bg-blue-50'
      },
      {
        id: 5,
        name: 'Dr. Bruce Banner',
        time: 'Sat, Mar 2023, 10:15am',
        image: require('../../assets/images/jeph.jpg'),
        bgColor: 'bg-green-50'
      }
    ]
  };


  const AppointmentCard = ({ doctor, bgColorClass }) => (
    <View style={tw`flex-row items-center p-4 ${bgColorClass} rounded-xl mb-3`}>
      <View style={tw`w-12 h-12 rounded-full overflow-hidden mr-3`}>
        <Image
          source={doctor.image}
          style={tw`w-full h-full`}
          resizeMode="cover"
        />
      </View>
      <View style={tw`flex-1`}>
        <Text style={[tw`text-indigo-900`, { fontFamily: 'outfit-bold' }]}>
          {doctor.name}
        </Text>
        <Text style={[tw`text-gray-500 text-sm`, { fontFamily: 'outfit' }]}>
          {doctor.time}
        </Text>
      </View>
      <TouchableOpacity 
        style={tw`w-10 h-10 rounded-full bg-blue-500 items-center justify-center`}
      >
        <Ionicons name="chatbubble-outline" size={20} color="white" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={tw`flex-1 bg-white pt-12 px-4`}>
      {/* Header */}
      <View style={tw`flex-row justify-between items-center mb-6`}>
        <View>
          <Text style={[tw`text-2xl text-indigo-900`, { fontFamily: 'outfit-bold' }]}>
            All appointments
          </Text>
          <Text style={[tw`text-gray-500`, { fontFamily: 'outfit' }]}>
            See all your booking
          </Text>
        </View>
        <View style={tw`flex-row items-center`}>
          <TouchableOpacity style={tw`mr-4`}>
            <Ionicons name="calendar-outline" size={24} color="#1e1b4b" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="ellipsis-vertical" size={24} color="#1e1b4b" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Today's Appointments */}
        <View style={tw`mb-6`}>
          <Text style={[tw`text-gray-500 mb-3`, { fontFamily: 'outfit-medium' }]}>
            Today
          </Text>
          {appointments.today.map(doctor => (
            <AppointmentCard
              key={doctor.id}
              doctor={doctor}
              bgColorClass={doctor.bgColor}
            />
          ))}
        </View>

        {/* Other Appointments */}
        <View>
          <Text style={[tw`text-gray-500 mb-3`, { fontFamily: 'outfit-medium' }]}>
            Other appointments
          </Text>
          {appointments.other.map(doctor => (
            <AppointmentCard
              key={doctor.id}
              doctor={doctor}
              bgColorClass={doctor.bgColor}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default AppointmentsScreen;