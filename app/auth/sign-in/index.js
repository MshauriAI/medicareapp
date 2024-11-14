import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  StyleSheet, 
  TouchableOpacity,
  KeyboardAvoidingView,
  ActivityIndicator,
  Platform,
  ScrollView,
  StatusBar, } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import { Picker } from '@react-native-picker/picker';
import { MaterialIcons } from '@expo/vector-icons';
import tw from "tailwind-react-native-classnames";
import axios from "axios";
import Toast from "react-native-toast-message";
import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as LocalAuthentication from 'expo-local-authentication';
import { useRouter } from 'expo-router';


export default function SignInScreen({ navigation }) {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSignIn = async () => {
      setLoading(true);
      if (!email || !password) {
        Toast.show({
          type: "error",
          text1: "Validation Error",
          text2: "All fields are required",
        });
        setLoading(false);
        return;
      }
  
      const role = 'Patient';

      try {
        const response = await axios.post(
          "https://stallion-holy-informally.ngrok-free.app/api/v1.0/signin",
          {
            email,
            password,
            role
          },
          {
            headers: {"Content-Type": "application/json" }
          }
        );
  
        const token = response.data.access_token;
        console.log(token);
  
        if (response.status == 200 && token != "") {
          console.log("DONE")
          await SecureStore.setItemAsync('token', token);
          await AsyncStorage.setItem('userInfo', JSON.stringify({
            firstName: response.data.firstName,
            lastName: response.data.lastName,
            email: response.data.email,
            number: response.data.number,
            token: response.data.access_token,
            imageUri: response.data.image_uri
          }));
          router.push('../../(tabs)/home/');

        Toast.show({
          type: "success",
          text1: "Success",
          text2: "Signin Successful",
        });
        } else {
          setLoading(false);
          Toast.show({
            type: "error",
            text1: "Sign-in Failed",
            text2: response.data.message || "Please try again.",
          });
        }
      } catch (error) {
        console.error("Sign-in error:", error);
        Toast.show({
          type: "error",
          text1: "Error",
          text2: error.response?.data.message || "An unexpected error occurred",
        });
        setLoading(false);
      }
    };

    return (
      <>
        <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <KeyboardAvoidingView  style={tw`flex-1 py-3 px-4 bg-white`}
      behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>SignIn</Text>

            <View style={styles.inputContainer}>
                <MaterialIcons name="email" size={20} color="#666" style={styles.icon} />
                <TextInput style={styles.input} placeholder="e.g abc@gmail.com" placeholderTextColor="#999" keyboardType="email-address" 
                  value={email}
                  onChangeText={setEmail}
                />
            </View>

            <View style={styles.inputContainer}>
                <MaterialIcons name="lock" size={20} color="#666" style={styles.icon} />
                <TextInput
                    style={styles.input}
                    placeholder="Enter your password"
                    placeholderTextColor="#999"
                    secureTextEntry={!passwordVisible}
                    value={password}
                    onChangeText={setPassword}
                />
                <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
                    <Ionicons name={passwordVisible ? "eye-off" : "eye"} size={20} color="#666" style={styles.icon} />
                </TouchableOpacity>
            </View>
            
            <TouchableOpacity
              style={tw`bg-blue-500 w-full rounded-full py-3 mb-6 shadow-lg`}
              onPress={handleSignIn}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator size="small" color="#ffffff" />
              ) : (
                <Text style={tw`text-white text-center text-lg`}>Sign In</Text>
              )}
            </TouchableOpacity>
            <View style={tw`w-full pb-6 px-4`}>
            <TouchableOpacity onPress={() => router.push('/auth/sign-up')}>
              <Text style={tw`text-sm text-center`}>
                Don’t have an account?{" "}
                <Text style={tw`text-blue-500 font-bold`}
                
                >Sign Up</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      </>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
        backgroundColor: '#F2F2F2',
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 32,
        fontWeight: '700',
        color: '#333',
        marginBottom: 30,
        textAlign: 'center',
    },
     halfInput: {
        width: '48%',
    },
    inputRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 12,
        backgroundColor: '#FFF',
        paddingHorizontal: 15,
        paddingVertical: 10,
        marginBottom: 15,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
    },
    input: {
        flex: 1,
        paddingLeft: 10,
        fontSize: 16,
        color: '#333',
    },
    icon: {
        marginRight: 5,
    },
    pickerContainer: {
        paddingVertical: 0,
    },
    picker: {
        height: 50,
        flex: 1,
        color: '#333',
    },
    button: {
        backgroundColor: '#007BFF',
        paddingVertical: 15,
        borderRadius: 12,
        width: '100%',
        alignItems: 'center',
        marginTop: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
        elevation: 4,
    },
    buttonText: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: '600',
    },
});
