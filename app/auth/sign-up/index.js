import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import { Picker } from '@react-native-picker/picker';
import { MaterialIcons } from '@expo/vector-icons';
import tw from "tailwind-react-native-classnames";

export default function SignUpScreen({ navigation }) {
    const [gender, setGender] = useState("");
    const [passwordVisible, setPasswordVisible] = useState(false);


    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Sign Up</Text>
            <Text style={styles.subtitle}>Join us to start your journey</Text>
            
            <View style={styles.inputRow}>
                <View style={[styles.inputContainer, styles.halfInput]}>
                    <MaterialIcons name="person" size={22} color="#007BFF" style={styles.icon} />
                    <TextInput style={styles.input} placeholder="First Name" placeholderTextColor="#999" />
                </View>
                <View style={[styles.inputContainer, styles.halfInput]}>
                    <MaterialIcons name="person" size={22} color="#007BFF" style={styles.icon} />
                    <TextInput style={styles.input} placeholder="Last Name" placeholderTextColor="#999" />
                </View>
            </View>

            <View style={styles.inputContainer}>
                <MaterialIcons name="email" size={22} color="#007BFF" style={styles.icon} />
                <TextInput style={styles.input} placeholder="Email Address" placeholderTextColor="#999" keyboardType="email-address" />
            </View>

            <View style={styles.inputContainer}>
                <MaterialIcons name="calendar-today" size={22} color="#007BFF" style={styles.icon} />
                <TextInput style={styles.input} placeholder="Date of Birth" placeholderTextColor="#999" />
            </View>
            
            <View style={[styles.inputContainer, styles.pickerContainer]}>
                <Picker
                    selectedValue={gender}
                    style={styles.picker}
                    onValueChange={(itemValue) => setGender(itemValue)}
                >
                    <Picker.Item label="Select your gender" value="" />
                    <Picker.Item label="Male" value="male" />
                    <Picker.Item label="Female" value="female" />
                    <Picker.Item label="Other" value="other" />
                </Picker>
            </View>

            <View style={styles.inputContainer}>
                <MaterialIcons name="phone" size={22} color="#007BFF" style={styles.icon} />
                <TextInput style={styles.input} placeholder="Phone Number" placeholderTextColor="#999" keyboardType="phone-pad" />
            </View>

            <View style={styles.inputContainer}>
                <MaterialIcons name="lock" size={22} color="#007BFF" style={styles.icon} />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    placeholderTextColor="#999"
                    secureTextEntry={!passwordVisible}
                />
                <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
                    <Ionicons name={passwordVisible ? "eye-off" : "eye"} size={22} color="#666" style={styles.icon} />
                </TouchableOpacity>
            </View>
            
            <TouchableOpacity style={styles.button}
                onPress={() => navigation.navigate('Home')}
            >
                <Text style={styles.buttonText}>Create Account</Text>
            </TouchableOpacity>
            <View style={tw`w-full pb-6 px-4`}>
            <TouchableOpacity onPress={() => navigation.navigate("Signin")}>
              <Text style={tw`text-sm text-center`}>
                Don’t have an account?{" "}
                <Text style={tw`text-blue-500 font-bold`}>Sign In</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
        backgroundColor: '#FAFAFA',
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 32,
        fontWeight: '800',
        color: '#333',
        marginBottom: 5,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 16,
        fontWeight: '400',
        color: '#666',
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
        borderRadius: 15,
        backgroundColor: '#FFF',
        paddingHorizontal: 15,
        paddingVertical: 12,
        marginBottom: 15,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 10,
        elevation: 4,
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
        borderRadius: 15,
        width: '100%',
        alignItems: 'center',
        marginTop: 25,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 5,
    },
    buttonText: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: '700',
    },
});
