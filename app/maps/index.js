import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, Dimensions } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import tw from 'tailwind-react-native-classnames';

const DoctorMapScreen = () => {
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  // Sample doctors data
  const doctors = [
    {
      id: 1,
      name: 'Dr. Wesley Cain',
      specialty: 'Surgeon',
      experience: '5 yr',
      rating: 4.5,
      coordinate: {
        latitude: 37.78825,
        longitude: -122.4324,
      },
      image: require('../../assets/images/jeph.jpg'), // Make sure to add doctor images to your assets
    },
    {
      id: 2,
      name: 'Dr. Sarah Miller',
      specialty: 'Dentist',
      experience: '8 yr',
      rating: 4.8,
      coordinate: {
        latitude: 37.78925,
        longitude: -122.4344,
      },
      image: require('../../assets/images/jeph.jpg'),
    },
    // Add more doctors as needed
  ];

  const initialRegion = {
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  const DoctorCard = ({ doctor }) => (
    <View style={tw`absolute bottom-8 left-4 right-4 bg-white rounded-xl shadow-lg`}>
      <View style={tw`flex-row p-4 items-center`}>
        <Image
          source={doctor.image}
          style={tw`w-16 h-16 rounded-full`}
        />
        <View style={tw`ml-4 flex-1`}>
          <Text style={tw`text-lg font-bold text-gray-800`}>{doctor.name}</Text>
          <View style={tw`flex-row items-center mt-1`}>
            <Text style={tw`text-gray-600`}>{doctor.specialty}</Text>
            <Text style={tw`text-gray-400 mx-2`}>•</Text>
            <Text style={tw`text-gray-600`}>{doctor.experience}</Text>
          </View>
          <View style={tw`flex-row items-center mt-1`}>
            <Text style={tw`text-yellow-500`}>★</Text>
            <Text style={tw`text-gray-600 ml-1`}>{doctor.rating}</Text>
          </View>
        </View>
        <TouchableOpacity
          style={tw`bg-indigo-600 px-4 py-2 rounded-lg`}
          onPress={() => console.log('Book consultation with', doctor.name)}
        >
          <Text style={tw`text-white font-semibold`}>Book Consult</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const CustomMarker = () => (
    <View style={tw`bg-white p-2 rounded-full shadow-md`}>
      <View style={tw`bg-indigo-600 w-6 h-6 rounded-full items-center justify-center`}>
        <Text style={tw`text-white font-bold`}>👨‍⚕️</Text>
      </View>
    </View>
  );

  return (
    <View style={tw`flex-1`}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={tw`flex-1`}
        initialRegion={initialRegion}
      >
        {doctors.map((doctor) => (
          <Marker
            key={doctor.id}
            coordinate={doctor.coordinate}
            onPress={() => setSelectedDoctor(doctor)}
          >
            <CustomMarker />
          </Marker>
        ))}
      </MapView>

      {/* Search bar */}
      <View style={tw`absolute top-12 left-4 right-4`}>
        <View style={tw`flex-row bg-white rounded-full shadow-lg px-4 py-3`}>
          <Text style={tw`text-gray-400`}>🔍</Text>
          <Text style={tw`ml-2 text-gray-400`}>Search for doctors...</Text>
        </View>
      </View>

      {/* Category card */}
      <TouchableOpacity
        style={tw`absolute top-28 left-4 bg-green-50 rounded-xl shadow-sm overflow-hidden`}
        onPress={() => console.log('Open dental treatments')}
      >
        <View style={tw`p-4`}>
          <Text style={tw`text-green-800 font-medium mb-1`}>Dental</Text>
          <Text style={tw`text-green-900 font-bold text-lg`}>Treatments</Text>
        </View>
      </TouchableOpacity>

      {selectedDoctor && <DoctorCard doctor={selectedDoctor} />}
    </View>
  );
};

export default DoctorMapScreen;