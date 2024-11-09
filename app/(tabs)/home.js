// App.js
import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import tw from "tailwind-react-native-classnames";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import MapView, { Marker } from "react-native-maps";

const App = () => {
  return (
    <ScrollView
      style={tw`flex-1 bg-white pt-10 pb-20`}
      showsVerticalScrollIndicator={false}
    >
      {/* Top Header */}
      <View style={tw`px-4 flex-row justify-between items-center`}>
        <View style={tw`flex-row items-center`}>
          <Ionicons name="location" size={20} color="#4B7BE5" />
          <View style={tw`ml-2`}>
            <Text style={tw`text-xs text-gray-400`}>Hi, Alex Northam</Text>
            <View style={tw`flex-row items-center`}>
              <Text style={tw`font-bold`}>California, USA</Text>
              <Ionicons name="chevron-down" size={20} color="black" />
            </View>
          </View>
        </View>
        <View
          style={tw`w-10 h-10 rounded-full bg-green-50 items-center justify-center`}
        >
          <View style={tw`w-2 h-2 rounded-full bg-green-500`} />
        </View>
      </View>

      {/* Search Bar */}
      <View style={tw`mx-4 mt-4`}>
        <View
          style={tw`flex-row items-center bg-gray-50 rounded-full px-4 py-2`}
        >
          <Ionicons name="search" size={20} color="gray" />
          <TextInput
            placeholder="Search Doctor or Conditions"
            style={tw`flex-1 ml-2`}
            placeholderTextColor="gray"
          />
          <Ionicons name="mic" size={20} color="gray" />
        </View>
      </View>

      {/* Date and Map Cards Row */}
      <View style={tw`flex-row mx-4 mt-4`}>
        {/* Date Card */}
        <View style={tw`w-1/3 bg-indigo-900 rounded-xl p-1.5 mr-2`}>
          <View style={tw`flex-row items-center justify-between mb-1`}>
            <TouchableOpacity>
              <Ionicons name="chevron-back" size={20} color="white" />
            </TouchableOpacity>
            <TouchableOpacity>
              <Ionicons name="chevron-forward" size={20} color="white" />
            </TouchableOpacity>
          </View>
          <Text style={[tw`text-white text-xs`, { fontFamily: "outfit" }]}>
            Sunday
          </Text>
          <Text style={[tw`text-white text-lg`, { fontFamily: "outfit-bold" }]}>
            28
          </Text>
          <Text style={[tw`text-white text-xs`, { fontFamily: "outfit" }]}>
            Feb
          </Text>
        </View>

        {/* Map Card */}
        <View style={tw`flex-1 rounded-xl overflow-hidden ml-2`}>
          <MapView
            style={{ height: 90, width: "100%" }}
            initialRegion={{
              latitude: 37.78825,
              longitude: -122.4324,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          >
            <Marker
              coordinate={{ latitude: 37.78825, longitude: -122.4324 }}
              title="Marker Title"
              description="Marker Description"
            />
          </MapView>
        </View>
      </View>

      {/* Services Icons */}
      <View style={tw`flex-row justify-between px-4 mt-6`}>
        {["Medicine", "Lab Test", "Wellness", "Dentist", "Surgery"].map(
          (service, index) => (
            <TouchableOpacity key={service} style={tw`items-center`}>
              <View
                style={tw`w-12 h-12 rounded-lg bg-gray-50 items-center justify-center mb-1`}
              >
                <Ionicons
                  name={
                    index === 0
                      ? "medical"
                      : index === 1
                      ? "flask"
                      : index === 2
                      ? "person"
                      : index === 3
                      ? "medical"
                      : "medical"
                  }
                  size={24}
                  color="#4B7BE5"
                />
              </View>
              <Text style={tw`text-xs`}>{service}</Text>
            </TouchableOpacity>
          )
        )}
      </View>

      {/* Featured Services */}
      <View style={tw`mt-6 px-4`}>
        <View style={tw`flex-row justify-between items-center mb-4`}>
          <Text style={tw`font-semibold`}>Featured services</Text>
          <Text style={tw`text-blue-500`}>View all</Text>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <LinearGradient
            colors={["#FFE5A3", "#FFD666"]}
            style={tw`w-36 h-44 rounded-2xl mr-4 p-4 shadow-lg`}
          >
            <View style={tw`relative z-10`}>
              <Text
                style={[
                  tw`text-lg font-bold text-gray-800`,
                  { fontFamily: "outfit-bold" },
                ]}
              >
                Win over
              </Text>
              <Text
                style={[
                  tw`text-lg font-bold text-gray-800 mb-2`,
                  { fontFamily: "outfit-bold" },
                ]}
              >
                Diabetes
              </Text>
            </View>
            <View
              style={tw`absolute inset-0 bg-black opacity-20 rounded-2xl`}
            />
            <Image
              source={{
                uri: "https://images.pexels.com/photos/1001897/pexels-photo-1001897.jpeg",
              }}
              style={[
                tw`w-24 h-24 absolute bottom-2 right-2 rounded-xl`,
                { transform: [{ rotate: "-5deg" }] },
              ]}
            />
          </LinearGradient>

          <LinearGradient
            colors={["#B2F5EA", "#81E6D9"]}
            style={tw`w-36 h-44 rounded-2xl mr-4 p-4 shadow-lg`}
          >
            <Text
              style={[
                tw`text-lg font-bold text-gray-800`,
                { fontFamily: "outfit-bold" },
              ]}
            >
              Dental
            </Text>
            <Text
              style={[
                tw`text-lg font-bold text-gray-800 mb-2`,
                { fontFamily: "outfit-bold" },
              ]}
            >
              Treatments
            </Text>
            <Image
              source={{
                uri: "https://images.pexels.com/photos/6823410/pexels-photo-6823410.jpeg",
              }}
              style={[
                tw`w-24 h-24 absolute bottom-2 right-2 rounded-xl`,
                { transform: [{ rotate: "-5deg" }] },
              ]}
            />
          </LinearGradient>

          <LinearGradient
            colors={["#FED7D7", "#FEB2B2"]}
            style={tw`w-36 h-44 rounded-2xl mr-4 p-4 shadow-lg`}
          >
            <Text
              style={[
                tw`text-lg font-bold text-gray-800`,
                { fontFamily: "outfit-bold" },
              ]}
            >
              Eye
            </Text>
            <Text
              style={[
                tw`text-lg font-bold text-gray-800 mb-2`,
                { fontFamily: "outfit-bold" },
              ]}
            >
              Care
            </Text>
            <Image
              source={{
                uri: "https://images.pexels.com/photos/6941098/pexels-photo-6941098.jpeg",
              }}
              style={[
                tw`w-24 h-24 absolute bottom-2 right-2 rounded-xl`,
                { transform: [{ rotate: "-5deg" }] },
              ]}
            />
          </LinearGradient>
        </ScrollView>
      </View>

      {/* Book Appointment Card */}
      <View
        style={[
          tw`mx-4 mt-6 bg-pink-50 p-4 rounded-xl`,
          { fontFamily: "outfit" },
        ]}
      >
        <View style={tw`flex-row justify-between items-center`}>
          <View style={tw`flex-1`}>
            <Text
              style={[
                tw`text-indigo-900 text-xl mb-1`,
                { fontFamily: "outfit-bold" },
              ]}
            >
              Book appointment an expert surgeon
            </Text>
            <Text style={[tw`text-gray-600`, { fontFamily: "outfit" }]}>
              Treat common symptoms with specialist
            </Text>
          </View>
          <TouchableOpacity>
            <Ionicons name="chevron-forward" size={24} color="#1e1b4b" />
          </TouchableOpacity>
        </View>

        <View style={tw`flex-row justify-between mt-4`}>
          {["kidneys", "Eye", "Brain", "Lungs", "More"].map((item) => (
            <View key={item} style={tw`items-center`}>
              <View
                style={tw`w-12 h-12 bg-white rounded-full items-center justify-center mb-2`}
              >
                <Ionicons
                  name={
                    item === "kidneys"
                      ? "medical"
                      : item === "Eye"
                      ? "eye"
                      : item === "Brain"
                      ? "brain"
                      : item === "Lungs"
                      ? "medical"
                      : "ellipsis-horizontal"
                  }
                  size={24}
                  color="#4B7BE5"
                />
              </View>
              <Text
                style={[tw`text-xs text-indigo-900`, { fontFamily: "outfit" }]}
              >
                {item}
              </Text>
            </View>
          ))}
        </View>
      </View>
      {/* Frequently Booked Lab Tests */}
      <View style={tw`mt-6`}>
        <View style={tw`px-4 flex-row items-center mb-4`}>
          <Ionicons name="flask-outline" size={24} color="#4B7BE5" />
          <Text
            style={[
              tw`ml-2 text-lg text-indigo-900`,
              { fontFamily: "outfit-medium" },
            ]}
          >
            Frequently booked lab test
          </Text>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={tw`px-4`}
        >
          {/* Full Body Checkup Card */}
          <TouchableOpacity
            style={tw`w-64 bg-yellow-50 rounded-xl mr-4 overflow-hidden`}
          >
            <View style={tw`p-4`}>
              <View
                style={tw`bg-rose-400 self-start px-2 py-1 rounded-lg mb-2`}
              >
                <Text
                  style={[tw`text-white text-xs`, { fontFamily: "outfit" }]}
                >
                  60% off
                </Text>
              </View>
              <Text
                style={[
                  tw`text-xl text-indigo-900 mb-1`,
                  { fontFamily: "outfit-bold" },
                ]}
              >
                Full body check up with Vitamin D
              </Text>
              <Text style={[tw`text-gray-600 mb-4`, { fontFamily: "outfit" }]}>
                Measures Vitamin D & B12 levels and others essentials.
              </Text>
              <View style={tw`flex-row items-center`}>
                <Text
                  style={[
                    tw`text-gray-400 line-through`,
                    { fontFamily: "outfit" },
                  ]}
                >
                  $2469
                </Text>
                <Text
                  style={[
                    tw`ml-2 text-xl text-indigo-900`,
                    { fontFamily: "outfit-bold" },
                  ]}
                >
                  $1049
                </Text>
              </View>
            </View>
            <Image
              source={require("../../assets/images/checkup.png")} // Add your image here
              style={tw`w-full h-32`}
              resizeMode="cover"
            />
          </TouchableOpacity>

          {/* Preventive Package Card */}
          <TouchableOpacity
            style={tw`w-64 bg-green-50 rounded-xl mr-4 overflow-hidden`}
          >
            <View style={tw`p-4`}>
              <View
                style={tw`bg-rose-400 self-start px-2 py-1 rounded-lg mb-2`}
              >
                <Text
                  style={[tw`text-white text-xs`, { fontFamily: "outfit" }]}
                >
                  40% off
                </Text>
              </View>
              <Text
                style={[
                  tw`text-xl text-indigo-900 mb-1`,
                  { fontFamily: "outfit-bold" },
                ]}
              >
                Preventive and Diabetes
              </Text>
              <Text style={[tw`text-gray-600 mb-4`, { fontFamily: "outfit" }]}>
                Specially designed tests to cover preventive care.
              </Text>
              <View style={tw`flex-row items-center`}>
                <Text
                  style={[
                    tw`text-gray-400 line-through`,
                    { fontFamily: "outfit" },
                  ]}
                >
                  $1274
                </Text>
                <Text
                  style={[
                    tw`ml-2 text-xl text-indigo-900`,
                    { fontFamily: "outfit-bold" },
                  ]}
                >
                  $1475
                </Text>
              </View>
            </View>
            <Image
              source={require("../../assets/images/checkup.png")} // Add your image here
              style={tw`w-full h-32`}
              resizeMode="cover"
            />
          </TouchableOpacity>
        </ScrollView>
      </View>
    </ScrollView>
  );
};

export default App;
