import React, { useEffect, useState }  from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Linking } from 'react-native';
import { useRouter } from 'expo-router';

export default function Home({ navigation }) {
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
        <ScrollView style={styles.container}>
            {/* Navbar */}
            <View style={styles.navbar}>
                <View style={styles.breadcrumb}>
                    <TouchableOpacity>
                        <Text style={styles.breadcrumbText}>Home</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.navRight}>
                    <TouchableOpacity style={styles.notificationButton}>
                        <Ionicons name="notifications-outline" size={24} color="#1c0c4a" />
                        <View style={styles.notificationBadge} />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Ionicons name="person-circle-outline" size={28} color="#1c0c4a" />
                    </TouchableOpacity>
                </View>
            </View>

            {/* Main Content */}
            <View style={styles.mainContent}>
                <Text style={styles.title}>Medicare</Text>
                <Text style={styles.dates}>
                    {dayName} {month} {day} {year}
                </Text>

                {/* Appointment Card - Both states handled */}
                <View 
                    style={styles.upcomingCard}
                    // onPress={() => navigation.navigate('Booking')}
                >
                    <View style={styles.upcomingHeader}>
                        <Text style={styles.upcomingTitle}>Upcoming Appointments ({upcomingAppointments})</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('Appointments')}>
                            <Text style={styles.viewAllText}>View All</Text>
                        </TouchableOpacity>
                    </View>
                    
                    {upcomingAppointment ? (
                        <View style={styles.appointmentDetails}>
                            <Image 
                                source={{ uri: upcomingAppointment[0].doctor_image_url }} 
                                style={styles.doctorImage}
                            />
                            <View style={styles.appointmentInfo}>
                                <Text style={styles.doctorName}>Dr. {upcomingAppointment[0].doctor_first_name}</Text>
                                <Text style={styles.specialtyText}>{upcomingAppointment[0].doctor_specialization}</Text>
                                <View style={styles.appointmentTimeContainer}>
                                    <Ionicons name="time-outline" size={16} color="#666" />
                                    <Text style={styles.appointmentTime}>{upcomingAppointment[0].date}</Text>
                                </View>
                                <TouchableOpacity
                                    onPress={() => handlePress(upcomingAppointment[0].meet_link)}
                                >
                                    <View style={styles.appointmentTypeContainer}>
                                        <Ionicons name="videocam-outline" size={16} color="#1c0c4a" />
                                        <Text style={styles.appointmentType}>{upcomingAppointment[0].appointment_method}</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    ) : (
                        <View style={styles.emptyStateContainer}>
                            <View style={styles.emptyIconContainer}>
                                <Ionicons name="calendar-outline" size={32} color="#666" />
                            </View>
                            <Text style={styles.emptyStateText}>No upcoming appointments</Text>
                            {/* <TouchableOpacity 
                                style={styles.bookButton}
                                onPress={() => navigation.navigate('Appointments')}
                            >
                                <Text style={styles.bookButtonText}>Book Now</Text>
                            </TouchableOpacity> */}
                        </View>
                    )}
                </View>

                <Text style={styles.description}>
                    We've redefined the healthcare experience to be faster, more accessible, and incredibly convenient.
                </Text>

                <TouchableOpacity 
                    style={styles.button}
                    onPress={() => navigation.navigate('Booking')}
                >
                    <Text style={styles.buttonText}>Book Consultation</Text>
                </TouchableOpacity>
            </View>

            {/* Bottom Cards */}
            <View style={styles.cardContainer}>
                <TouchableOpacity 
                    style={[styles.card, { backgroundColor: '#fde047' }]}
                >
                    <View style={styles.cardIconContainer}>
                        <Ionicons name="videocam" size={24} color="#1c0c4a" />
                    </View>
                    <Text style={styles.cardTitle}>Instant Video Consultation</Text>
                    <Text style={styles.cardText} >Connect with the doctor available</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={[styles.card, { backgroundColor: '#86efac' }]}
                    onPress={() => navigation.navigate('Report')}
                >
                    <View style={styles.cardIconContainer}>
                        <Ionicons name="location" size={24} color="#1c0c4a" />
                    </View>
                    <Text style={styles.cardTitle}>Find Hospitals near you</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    navbar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 40,
        paddingBottom: 10,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
    },
    breadcrumb: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    breadcrumbText: {
        fontSize: 16,
        color: '#666',
    },
    navRight: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 15,
    },
    notificationButton: {
        position: 'relative',
    },
    notificationBadge: {
        position: 'absolute',
        top: 0,
        right: 0,
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#ef4444',
    },
    mainContent: {
        padding: 20,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#1c0c4a',
        marginBottom: 8,
    },
    dates: {
        fontSize: 16,
        color: '#666',
        marginBottom: 20,
    },
    upcomingCard: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 20,
        paddingBottom: 10,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    upcomingHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
    },
    upcomingTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#1c0c4a',
    },
    viewAllText: {
        fontSize: 14,
        color: '#1c0c4a',
        fontWeight: '500',
        textDecorationLine: 'underline',
    },
    // Empty state styles
    emptyStateContainer: {
        alignItems: 'center',
        paddingVertical: 20,
    },
    emptyIconContainer: {
        width: 64,
        height: 64,
        backgroundColor: '#f5f5f5',
        borderRadius: 32,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 12,
    },
    emptyStateText: {
        fontSize: 16,
        color: '#666',
        marginBottom: 16,
    },
    bookButton: {
        backgroundColor: '#1c0c4a',
        paddingHorizontal: 24,
        paddingVertical: 12,
        borderRadius: 24,
    },
    bookButtonText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '600',
    },
    // Appointment details styles
    appointmentDetails: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    doctorImage: {
        width: 60,
        height: 60,
        borderRadius: 30,
        marginRight: 15,
    },
    appointmentInfo: {
        flex: 1,
    },
    doctorName: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1c0c4a',
        marginBottom: 4,
    },
    specialtyText: {
        fontSize: 14,
        color: '#666',
        marginBottom: 8,
    },
    appointmentTimeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 4,
    },
    appointmentTime: {
        fontSize: 14,
        color: '#666',
        marginLeft: 6,
    },
    appointmentTypeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#E3F2FD',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6,
        alignSelf: 'flex-start',
    },
    appointmentType: {
        fontSize: 12,
        color: '#1c0c4a',
        marginLeft: 4,
        fontWeight: '500',
    },
    description: {
        fontSize: 16,
        color: '#666',
        lineHeight: 24,
        marginBottom: 20,
        textAlign: 'center',
    },
    button: {
        backgroundColor: '#1c0c4a',
        borderRadius: 12,
        paddingVertical: 16,
        alignItems: 'center',
        marginBottom: 20,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    cardContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        marginBottom: 20,
    },
    card: {
        width: '48%',
        borderRadius: 16,
        padding: 15,
        alignItems: 'center',
    },
    cardIconContainer: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 10,
        marginBottom: 10,
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1c0c4a',
        marginBottom: 8,
        textAlign: 'center',
    },
    cardText: {
        fontSize: 12,
        color: '#666',
        textAlign: 'center',
    },
});
