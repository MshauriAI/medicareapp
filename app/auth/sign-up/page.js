import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation, useRouter } from 'expo-router'
import { useEffect } from 'react'
import { Colors } from '@/constants/Colors'
import { Ionicons } from '@expo/vector-icons';

const index = () => {
  const navigation = useNavigation()
  const router = useRouter()

    useEffect(() => {
      navigation.setOptions({
          headerShown: false
      })
    }, [])

  return (
    <View
      style={{
        padding: 25,
        paddingTop: 80,
      }}
    >
      <TouchableOpacity onPress={()=>router.back()}>
          <Ionicons name="arrow-back-circle-outline" size={24} color="black" />
      </TouchableOpacity>
      <Text
        style={{
          fontSize: 30,
          fontFamily: 'outfit-bold',
          marginTop: 30,
        }}
      >Create New Account</Text>

      <Text>AI Powered Chatbot</Text>

        <View style={{
                marginTop: 50,
          }}>
            <Text style={{
                fontFamily: 'outfit',
            }}>Full Name</Text>
            <TextInput style={styles.input} 
                placeholder="Enter Full Name"
            />
          </View>
        <View style={{
              marginTop: 20,
          }}>
            <Text style={{
                fontFamily: 'outfit',
            }}>Email</Text>
            <TextInput style={styles.input} 
                placeholder="Enter your email"
            />
          </View>
          <View style={{
                marginTop: 20,
          }}>
            <Text style={{
                fontFamily: 'outfit',
            }}>Password</Text>
            <TextInput style={styles.input}
                secureTextEntry={true}
                type="password"
                placeholder="Enter Password"
            />
          </View>
          {/* sign in button */}
          <TouchableOpacity 
            onPress={() => router.replace('auth/sign-up')}
          style={{
            padding: 20,
            backgroundColor: 'black',
            borderRadius: 15,
            marginTop: 50,    
          }}>
            <Text style={{
                fontFamily: 'outfit',
                textAlign: 'center',
                color: 'white',
            }}>Create Account</Text>
          </TouchableOpacity>
    
            {/* sign up button */}
            <TouchableOpacity 
                onPress={() => router.replace('/home')}
            style={{
                padding: 20,
                backgroundColor: Colors.WHITE,
                borderRadius: 15,
                marginTop: 20,
                borderWidth: 1,
            }}>
                <Text style={{
                    fontFamily: 'outfit',
                    textAlign: 'center',
                    color: Colors.PRIMARY,
                }}>Sign up</Text>
            </TouchableOpacity>
      </View>
  )
}
const styles = StyleSheet.create({
  input:{
      padding: 15,
      borderRadius: 15,
      borderWidth: 1,
      fontFamily: 'outfit',
      borderColor: Colors.GRAY,
  }
})


export default index