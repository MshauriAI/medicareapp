import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import { Ionicons } from '@expo/vector-icons';
import { useFonts } from 'expo-font';

const VideoCallScreen = ({ navigation, route }) => {
  const [isPaused, setIsPaused] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  return (
    <View style={tw`flex-1 bg-gray-100 mt-8`}>
      {/* Header */}
      <View style={tw`flex-row items-center p-4 absolute top-0 z-10 w-full`}>
        <TouchableOpacity 
          onPress={() => navigation.goBack()}
          style={tw`w-10 h-10 bg-gray-700 rounded-full items-center justify-center`}
        >
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <View style={tw`ml-3`}>
          <Text style={[tw`text-white text-lg`, { fontFamily: 'outfit-medium' }]}>
            Dr. Wesley Cain
          </Text>
          <View style={tw`flex-row items-center`}>
            <Text style={[tw`text-gray-300 mr-2`, { fontFamily: 'outfit' }]}>00:13</Text>
            <View style={tw`w-2 h-2 rounded-full bg-green-400`} />
          </View>
        </View>
      </View>

      {/* Doctor's small video */}
      <View style={tw`absolute top-4 right-4 z-10 rounded-2xl overflow-hidden bg-gray-200`}>
        <Image 
          source={require('../../assets/images/jeph.jpg')}
          style={tw`w-24 h-32`}
          resizeMode="cover"
        />
      </View>

      {/* Main video area */}
      <View style={tw`flex-1 bg-gray-200`}>
        <Image 
          source={require('../../assets/images/jeph.jpg')}
          style={tw`w-full h-full`}
          resizeMode="cover"
        />
      </View>

      {/* Pause overlay */}
      {isPaused && (
        <View style={tw`absolute inset-0 bg-black bg-opacity-50 items-center justify-center`}>
          <View style={tw`bg-blue-500 p-2 rounded`}>
            <Ionicons name="pause" size={24} color="white" />
          </View>
        </View>
      )}

      {/* Bottom controls */}
      <View style={tw`absolute bottom-10 w-full px-4`}>
        {/* End call button */}
        <View style={tw`items-center mb-8`}>
          <TouchableOpacity 
            style={tw`bg-red-500 px-6 py-3 rounded-full flex-row items-center`}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="call" size={20} color="white" />
            <Text style={[tw`text-white ml-2`, { fontFamily: 'outfit-medium' }]}>End call</Text>
          </TouchableOpacity>
        </View>

        {/* Control buttons */}
        <View style={tw`flex-row justify-around`}>
          <TouchableOpacity 
            style={tw`w-14 h-14 rounded-full bg-gray-800 items-center justify-center`}
            onPress={() => setIsMuted(!isMuted)}
          >
            <Ionicons name={isMuted ? "mic-off" : "mic"} size={24} color="white" />
          </TouchableOpacity>

          <TouchableOpacity 
            style={tw`w-14 h-14 rounded-full bg-gray-800 items-center justify-center`}
            onPress={() => setIsVideoEnabled(!isVideoEnabled)}
          >
            <Ionicons name={isVideoEnabled ? "videocam" : "videocam-off"} size={24} color="white" />
          </TouchableOpacity>

          <TouchableOpacity 
            style={tw`w-14 h-14 rounded-full bg-gray-800 items-center justify-center`}
            onPress={() => setIsPaused(!isPaused)}
          >
            <Ionicons name={isPaused ? "play" : "pause"} size={24} color="white" />
          </TouchableOpacity>

          <TouchableOpacity style={tw`w-14 h-14 rounded-full bg-gray-800 items-center justify-center`}>
            <Ionicons name="people" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default VideoCallScreen;