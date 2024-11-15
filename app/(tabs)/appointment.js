import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Modal, Linking } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Link } from "expo-router";
import { router } from 'expo-router';
import moment from 'moment';

export default function AppointmentsScreen({ navigation }) {
    const [isUpcoming, setIsUpcoming] = useState(true);
    const [upcomingAppointments, setUpcomingAppointments] = useState([]);
    const [pastAppointments, setPastAppointments] = useState([]);
    const [selectedAppointment, setSelectedAppointment] = useState(null); // Track selected appointment for modal
    const [isModalVisible, setIsModalVisible] = useState(false); // Control modal visibility
    const [user, setUser] = useState({ name: '' });
    const [refresh, setRefresh] = useState()

    useEffect(() => {
        const getUserInfo = async () => {
            try {
                const userInfo = await AsyncStorage.getItem('userInfo');
                if (userInfo !== null) {
                const parsedUser = JSON.parse(userInfo);
                setUser(parsedUser);
                
                if (parsedUser.token) {
                    getUpcomingAppointments(parsedUser.token);
                    getPastAppointments(parsedUser.token);
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

    const getUpcomingAppointments = async (token) => {
        try {
            const response = await fetch('https://stallion-holy-informally.ngrok-free.app/api/v1.0/appointments', {
                method: 'GET',
                headers: {
                    'Authorization':  `Bearer ${token}`
                },
            });

            if (response.ok) {
                const data = await response.json();
                setUpcomingAppointments(data.appointments);
            } else {
                console.log('Failed to fetch upcoming appointments');
            }
        } catch (error) {
            console.error("Error fetching upcoming appointments");
        }
    }

    const getPastAppointments = async (token) => {
        try {
            const response = await fetch('https://stallion-holy-informally.ngrok-free.app/api/v1.0/appointments/past', {
                method: 'GET',
                headers: {
                    'Authorization':  `Bearer ${token}`
                },
            });

            if (response.ok) {
                const data = await response.json();
                setPastAppointments(data.appointments);
            } else {
                console.log('Failed to fetch past appointments');
            }
        } catch (error) {
            console.error("Error fetching past appointments");
        }
    }

    const appointments = isUpcoming ? upcomingAppointments : pastAppointments;

    // Function to open modal with selected appointment details
    const openModal = (appointment) => {
        setSelectedAppointment(appointment);
        setIsModalVisible(true);
    };

    return (
        <View style={styles.container}>
            {/* Navbar */}
            <View style={styles.navbar}>
                <View style={styles.breadcrumb}>
                    <TouchableOpacity onPress={() => router.push('/(tabs)/home/')}>
                        <Text style={styles.breadcrumbText}>Home</Text>
                    </TouchableOpacity>
                    <Ionicons name="chevron-forward" size={15} style={styles.breadcrumbText} />
                    <Text style={styles.breadcrumbText}>Appointments</Text>
                </View>
                <View style={styles.navRight}>
                    <TouchableOpacity style={styles.notificationButton}>
                        <Ionicons name="notifications-outline" size={24} color="#1c0c4a" />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Ionicons name="person-circle-outline" size={28} color="#1c0c4a" />
                    </TouchableOpacity>
                </View>
            </View>
            <ScrollView >

                {/* Toggle Buttons */}
                <View style={styles.toggleContainer}>
                    <TouchableOpacity
                        style={[styles.toggleButton, isUpcoming && styles.activeButton]}
                        onPress={() => {
                            setIsUpcoming(true);
                            setRefresh(prev => !prev);
                        }}
                    >
                        <Text style={[styles.toggleButtonText, isUpcoming && styles.activeButtonText]}>Upcoming</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.toggleButton, !isUpcoming && styles.activeButton]}
                        onPress={() => {
                            setIsUpcoming(false);
                            setRefresh(prev => !prev);
                        }}
                    >
                        <Text style={[styles.toggleButtonText, !isUpcoming && styles.activeButtonText]}>Past</Text>
                    </TouchableOpacity>
                </View>

                {/* Appointments List */}
                <View style={styles.appointmentList}>
                    {appointments.length > 0 ? (
                        appointments.map((appointment) => {
                            // Check if the appointment date is in the past
                            const isPastAppointment = moment(appointment.date, "YYYY-MM-DD").isBefore(moment(), 'day');
                            
                            // Conditionally handle the onPress for past appointments
                            const handlePress = () => {
                                if (!isPastAppointment) {
                                    Linking.openURL(appointment.meet_link);
                                }
                            };

                            return (
                                <TouchableOpacity 
                                    key={appointment.id} 
                                    onPress={handlePress} 
                                    style={[
                                        styles.appointmentCard,
                                        isPastAppointment && styles.disabledAppointment // Apply disabled styles if past
                                    ]}
                                    activeOpacity={isPastAppointment ? 1 : 0.7} // Prevent touch feedback for past appointments
                                    pointerEvents={isPastAppointment ? 'none' : 'auto'} // Disable interaction for past appointments
                                >
                                    <Image source={{ uri: appointment.doctor_image_url }} style={styles.doctorImage} />
                                    <View style={styles.appointmentDetails}>
                                        <Text style={styles.doctorName}>Dr. {appointment.doctor_first_name}</Text>
                                        <Text style={styles.specialtyText}>{appointment.doctor_specialization}</Text>
                                        <Text style={styles.appointmentDate}>{appointment.date}</Text>
                                        <View style={styles.appointmentTypeContainer}>
                                            <Ionicons 
                                                name="videocam-outline" 
                                                size={16} 
                                                color={appointment.type === "Video" ? "#1c0c4a" : "#666"} 
                                            />
                                            <Text style={styles.appointmentType}>{appointment.appointment_method}</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            );
                        })
                    ) : (
                        <Text style={styles.emptyStateText}>No appointments available.</Text>
                    )}
                </View>

                {/* Booking Confirmation Modal */}
                <Modal
                    visible={isModalVisible}
                    transparent={true}
                    animationType="slide"
                    onRequestClose={() => setIsModalVisible(false)}
                >
                    <View style={styles.modalOverlay}>
                        <View style={styles.modalContent}>
                            {selectedAppointment && (
                                <>
                                    <View style={styles.modalHeader}>
                                        <Text style={styles.modalTitle}>Booking Confirmation</Text>
                                    </View>
                                    <View style={styles.modalBody}>
                                        <Image source={{ uri: selectedAppointment.image }} style={styles.doctorImage} />
                                        <Text style={styles.modalDoctorName}>{selectedAppointment.doctor}</Text>
                                        <Text style={styles.modalSpecialtyText}>{selectedAppointment.specialty}</Text>
                                        <Text style={styles.modalAppointmentDate}>{selectedAppointment.date}</Text>
                                        <Text style={styles.modalAppointmentType}>{selectedAppointment.type}</Text>
                                        <TouchableOpacity style={styles.modalButton} onPress={() => setIsModalVisible(false)}>
                                            <Text style={styles.modalButtonText}>Confirm</Text>
                                        </TouchableOpacity>
                                    </View>
                                </>
                            )}
                        </View>
                    </View>
                </Modal>
            </ScrollView>
        </View>
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
    navbarTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#1c0c4a',
    },
    toggleContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20,
    },
    toggleButton: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
        backgroundColor: '#e3f2fd',
        marginHorizontal: 10,
    },
    activeButton: {
        backgroundColor: '#1c0c4a',
    },
    toggleButtonText: {
        fontSize: 16,
        color: '#666',
    },
    activeButtonText: {
        color: '#fff',
    },
    appointmentList: {
        paddingHorizontal: 20,
        marginTop: 20,
    },
    appointmentCard: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 15,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    doctorImage: {
        width: 60,
        height: 60,
        borderRadius: 30,
        marginRight: 15,
    },
    appointmentDetails: {
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
        marginBottom: 6,
    },
    appointmentDate: {
        fontSize: 14,
        color: '#666',
        marginBottom: 6,
    },
    appointmentTypeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    appointmentType: {
        fontSize: 12,
        color: '#1c0c4a',
        marginLeft: 6,
    },
    emptyStateText: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
        marginTop: 40,
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 8,
        width: '80%',
        alignItems: 'center',
    },
    modalHeader: {
        alignItems: 'center',
        marginBottom: 20,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
    },
    modalBody: {
        alignItems: 'center',
    },
    modalDoctorName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    modalSpecialtyText: {
        fontSize: 14,
        color: '#666',
    },
    modalAppointmentDate: {
        fontSize: 14,
        color: '#666',
        marginVertical: 8,
    },
    modalAppointmentType: {
        fontSize: 14,
        color: '#1c0c4a',
        marginBottom: 20,
    },
    modalButton: {
        backgroundColor: '#1c0c4a',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 6,
    },
    modalButtonText: {
        color: '#fff',
        fontSize: 16,
    },
});