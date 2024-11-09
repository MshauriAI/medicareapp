import {
    AntDesign,
    FontAwesome,
    Ionicons,
    MaterialCommunityIcons,
  } from "@expo/vector-icons";
  import { View, Text, ScrollView, Image, TouchableOpacity, StatusBar } from "react-native";
  import { useFonts } from "expo-font";
  import { useState } from "react";
  import tw from 'tailwind-react-native-classnames';
  import * as ImagePicker from "expo-image-picker";
  // import * as FileSystem from "expo-file-system";
  // import AsyncStorage from "@react-native-async-storage/async-storage";
  // import { router } from "expo-router";
  import { useRouter } from 'expo-router';
  
  export default function ProfileScreen() {
    // const { user, loading } = useUser();
    const [image, setImage] = useState(null);
    // const [loader, setLoader] = useState(false);
  
    const [fontsLoaded] = useFonts({
      outfit: require("../../assets/fonts/Outfit-Regular.ttf"),
      "outfit-bold": require("../../assets/fonts/Outfit-Bold.ttf"),
      "outfit-medium": require("../../assets/fonts/Outfit-Medium.ttf"),
    });
    const router = useRouter();
    
    const navigateTo = (path) => {
      router.push(path);
    };
  
    if (!fontsLoaded) {
      return null;
    }
  
    return (
      <ScrollView>
        <StatusBar barStyle="dark-content" backgroundColor="#6B21A8" />
        <View style={tw`flex-row items-center py-8 justify-center bg-purple-800 mt-8 mb-4`}>
          <TouchableOpacity  onPress={() => router.back()}>
            <Ionicons name="arrow-back-circle-outline" size={24} color="white" />
          </TouchableOpacity>
          <Text style={[tw`text-white text-2xl ml-4`, { fontFamily: 'outfit-bold' }]}>Profile</Text>
        </View>
        
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <View style={{ position: "relative" }}>
            <Image
              source={require('../../assets/images/jeph.jpg')}
              style={{ width: 90, height: 90, borderRadius: 100 }}
            />
            <TouchableOpacity
              style={{
                position: "absolute",
                bottom: 5,
                right: 0,
                width: 30,
                height: 30,
                backgroundColor: "#f5f5f5",
                borderRadius: 100,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Ionicons name="camera-outline" size={25} />
            </TouchableOpacity>
          </View>
        </View>
        <Text
          style={{
            textAlign: "center",
            fontSize: 25,
            paddingTop: 10,
            fontWeight: "600",
            fontFamily: "outfit-bold",
          }}
        ></Text>
        <View style={{ marginHorizontal: 16, marginTop: 30 }}>
          <Text
            style={{
              fontSize: 20,
              marginBottom: 16,
              fontFamily: "outfit-bold",
            }}
          >
            Account Details
          </Text>
          <TouchableOpacity
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 20,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                columnGap: 30,
              }}
            >
              <View
                style={{
                  borderWidth: 2,
                  borderColor: "#dde2ec",
                  padding: 15,
                  borderRadius: 100,
                  width: 55,
                  height: 55,
                }}
              >
                <FontAwesome
                  style={{ alignSelf: "center" }}
                  name="user-o"
                  size={20}
                  color={"black"}
                />
              </View>
              <View>
                <Text style={{ fontSize: 16, fontFamily: "outfit-bold" }}>
                  Detail Profile
                </Text>
                <Text
                  style={{
                    color: "#575757",
                    fontFamily: "outfit",
                  }}
                >
                  Information Account
                </Text>
              </View>
            </View>
            <TouchableOpacity>
              <AntDesign name="right" size={26} color={"#CBD5E0"} />
            </TouchableOpacity>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 20,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                columnGap: 30,
              }}
            >
              <View
                style={{
                  borderWidth: 2,
                  borderColor: "#dde2ec",
                  padding: 15,
                  borderRadius: 100,
                  width: 55,
                  height: 55,
                }}
              >
                <MaterialCommunityIcons
                  style={{ alignSelf: "center" }}
                  name="book-account-outline"
                  size={20}
                  color={"black"}
                />
              </View>
              <View>
                <Text style={{ fontSize: 16, fontFamily: "outfit-bold" }}>
                  Incidents Reported
                </Text>
                <Text
                  style={{
                    color: "#575757",
                    fontFamily: "outfit",
                  }}
                >
                  The all Incidents Reported
                </Text>
              </View>
            </View>
            <TouchableOpacity>
              <AntDesign name="right" size={26} color={"#CBD5E0"} />
            </TouchableOpacity>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 20,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                columnGap: 30,
              }}
            >
              <View
                style={{
                  borderWidth: 2,
                  borderColor: "#dde2ec",
                  padding: 15,
                  borderRadius: 100,
                  width: 55,
                  height: 55,
                }}
              >
                <Ionicons
                  style={{ alignSelf: "center" }}
                  name="log-out-outline"
                  size={20}
                  color={"black"}
                />
              </View>
              <TouchableOpacity>
                <Text style={{ fontSize: 16, fontFamily: "outfit-bold" }}>
                  Log Out
                </Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity>
              <AntDesign name="right" size={26} color={"#CBD5E0"} />
            </TouchableOpacity>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }