import React, { useState, useEffect } from 'react';
import {
    SafeAreaView,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Modal,
    StyleSheet,
    Image,
    FlatList
} from 'react-native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function DoctorAppointmentScreen({ navigation }) {
    const [appointmentDate, setAppointmentDate] = useState(new Date());
    const [appointmentTime, setAppointmentTime] = useState(new Date());
    const [consultationType, setConsultationType] = useState('');
    const [consultationPurpose, setConsultationPurpose] = useState('');
    const [additionalDetails, setAdditionalDetails] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [doctors, setDoctors] = useState([]);
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [user, setUser] = useState(null);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showTimePicker, setShowTimePicker] = useState(false);

    useEffect(() => {
        const getUserInfoAndLoadDoctors = async () => {
            try {
                setLoading(true);
                const userInfo = await AsyncStorage.getItem('userInfo');
                if (!userInfo) throw new Error('No user info found');

                const parsedUser = JSON.parse(userInfo);
                setUser(parsedUser);

                if (!parsedUser.token) throw new Error('No authentication token found');
                await fetchDoctors(parsedUser.token);
            } catch (error) {
                setError(error.message);
                console.error("Error loading doctors:", error);
            } finally {
                setLoading(false);
            }
        };

        getUserInfoAndLoadDoctors();
    }, []);

    const fetchDoctors = async (token) => {
        try {
            const response = await fetch('https://stallion-holy-informally.ngrok-free.app/doctors', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
            });

            if (!response.ok) throw new Error('Failed to fetch doctors');

            const data = await response.json();
            if (!data.doctors) throw new Error('Invalid response format: missing doctors array');

            setDoctors(data.doctors);
        } catch (error) {
            setError(error.message);
            console.error('Error fetching doctors:', error);
        }
    };


    const filteredDoctors = doctors.filter(doctor => 
        doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doctor.specialty.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const openBookingModal = (doctor) => {
        setSelectedDoctor(doctor);
        setModalVisible(true);
    };

    const onDateChange = (event, selectedDate) => {
        setAppointmentDate(selectedDate || appointmentDate);
        setShowDatePicker(false);
    };

    const onTimeChange = (event, selectedTime) => {
        setAppointmentTime(selectedTime || appointmentTime);
        setShowTimePicker(false);
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.navbar}>
                <View style={styles.breadcrumb}>
                    <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                        <Text style={styles.breadcrumbText}>Home</Text>
                    </TouchableOpacity>
                    <Ionicons name="chevron-forward" size={15} style={styles.breadcrumbText} />
                    <Text style={styles.breadcrumbText}>Booking</Text>
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

            <View style={styles.searchContainer}>
                <Ionicons name="search" size={20} color="#2575fc" />
                <TextInput
                    placeholder="Search for doctors or specialties"
                    placeholderTextColor="#888"
                    style={styles.searchInput}
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                />
            </View>

            {/* Loading and Error States */}
            {loading && (
                <View style={styles.messageContainer}>
                    <Text>Loading doctors...</Text>
                </View>
            )}
            {error && (
                <View style={styles.messageContainer}>
                    <Text style={styles.errorText}>{error}</Text>
                    <TouchableOpacity style={styles.retryButton} onPress={() => fetchDoctors(user.token)}>
                        <Text style={styles.retryButtonText}>Retry</Text>
                    </TouchableOpacity>
                </View>
            )}

            {/* Doctor List */}
            {!loading && !error && (
                <FlatList
                    data={filteredDoctors}
                    renderItem={({ item }) => (
                        <TouchableOpacity style={styles.doctorCard} onPress={() => openBookingModal(item)}>
                            <View style={styles.doctorHeader}>
                                <Image source={{ uri: item.image_url || 'https://via.placeholder.com/100' }} style={styles.doctorImage} />
                                <View style={styles.doctorDetails}>
                                    <Text style={styles.doctorName}>{item.name}</Text>
                                    <Text style={styles.doctorSpecialty}>{item.specialization}</Text>
                                </View>
                            </View>
                            <View style={styles.ratingRow}>
                                {[...Array(Math.floor(item.rating || 0))].map((_, index) => (
                                    <FontAwesome key={index} name="star" size={16} color="#FFD700" />
                                ))}
                                {item.rating % 1 >= 0.5 && (
                                    <FontAwesome name="star-half-full" size={16} color="#FFD700" />
                                )}
                                <Text style={styles.ratingText}>
                                    {item.rating?.toFixed(1)} ({item.reviewCount || 0} reviews)
                                </Text>
                            </View>
                            <Text style={styles.doctorDescription}>
                                {item.description || 'No description available'}
                            </Text>
                            <View style={styles.cardActions}>
                                <TouchableOpacity 
                                    style={styles.bookButton} 
                                    onPress={() => openBookingModal(item)}
                                >
                                    <Text style={styles.bookButtonText}>Book Now</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.infoButton}>
                                    <Ionicons name="information-circle-outline" size={24} color="#1c0c4a" />
                                </TouchableOpacity>
                            </View>
                        </TouchableOpacity>
                    )}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={styles.listContainer}
                    ListEmptyComponent={
                        <View style={styles.messageContainer}>
                            <Text>No doctors found</Text>
                        </View>
                    }
                />
            )}

            {/* Booking Modal */}
            {selectedDoctor && (
                <Modal animationType="slide" transparent={true} visible={modalVisible}>
                    <BlurView intensity={90} style={styles.blurContainer}>
                        <View style={styles.modalContainer}>
                            <View style={styles.modalContent}>
                                <TouchableOpacity 
                                    style={styles.closeButton} 
                                    onPress={() => {
                                        setModalVisible(false);
                                        setSelectedDoctor(null);
                                    }}
                                >
                                    <Ionicons name="close-circle-outline" size={28} color="#1c0c4a" />
                                </TouchableOpacity>

                                <Text style={styles.modalTitle}>
                                    Book an Appointment with {selectedDoctor.name}
                                </Text>

                                <View style={styles.appointmentDetails}>
                                    <Text style={styles.sectionTitle}>Select Date & Time</Text>
                                    <TouchableOpacity
                                        style={styles.dateTimeButton}
                                        onPress={() => setShowDatePicker(true)}
                                    >
                                        <Ionicons name="calendar-outline" size={24} color="#1c0c4a" />
                                        <Text style={styles.dateTimeValue}>
                                            {appointmentDate.toLocaleDateString('en-US')}
                                        </Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        style={styles.dateTimeButton}
                                        onPress={() => setShowTimePicker(true)}
                                    >
                                        <Ionicons name="time-outline" size={24} color="#1c0c4a" />
                                        <Text style={styles.dateTimeValue}>
                                            {appointmentTime.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric' })}
                                        </Text>
                                    </TouchableOpacity>

                                    <Text style={styles.sectionTitle}>Consultation Type</Text>
                                    <Picker
                                        selectedValue={consultationType}
                                        onValueChange={setConsultationType}
                                        style={styles.picker}
                                    >
                                        <Picker.Item label="Select consultation type" value="" />
                                        <Picker.Item label="online" value="online" />
                                        <Picker.Item label="physical" value="inperson" />
                                    </Picker>

                                    <TextInput
                                        style={styles.input}
                                        placeholder="Consultation purpose"
                                        placeholderTextColor="#666"
                                        value={consultationPurpose}
                                        onChangeText={setConsultationPurpose}
                                    />
                                    <TextInput
                                        style={[styles.input, styles.multilineInput]}
                                        placeholder="Additional details (optional)"
                                        placeholderTextColor="#666"
                                        value={additionalDetails}
                                        onChangeText={setAdditionalDetails}
                                        multiline
                                    />
                                </View>

                                <TouchableOpacity 
                                    style={styles.confirmButton} 
                                    onPress={() => {
                                        setModalVisible(false);
                                        setSelectedDoctor(null);
                                    }}
                                >
                                    <Text style={styles.confirmButtonText}>Confirm Appointment</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </BlurView>
                </Modal>
            )}

            {/* Date & Time Picker */}
            {(showDatePicker || showTimePicker) && (
                <DateTimePicker
                    value={showDatePicker ? appointmentDate : appointmentTime}
                    mode={showDatePicker ? 'date' : 'time'}
                    display="default"
                    onChange={showDatePicker ? onDateChange : onTimeChange}
                />
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f0f2f5' },
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
    searchContainer: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 10,
        margin: 20,
        padding: 10,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 10
    },
    searchInput: {
        flex: 1,
        fontSize: 16,
        paddingLeft: 10,
        color: '#1c0c4a'
    },
    listContainer: {
        paddingTop: 10
    },
    doctorCard: {
        backgroundColor: '#fff',
        borderRadius: 15,
        padding: 20,
        marginHorizontal: 20,
        marginBottom: 20,
        shadowColor: "#000",
        shadowOpacity: 0.15,
        shadowRadius: 10
    },
    doctorHeader: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    doctorImage: {
        width: 60,
        height: 60,
        borderRadius: 30
    },
    doctorDetails: {
        marginLeft: 15
    },
    doctorName: {
        fontSize: 18,
        fontWeight: '600',
        color: '#1c0c4a'
    },
    doctorSpecialty: {
        fontSize: 14,
        color: '#1c0c4a'
    },
    ratingRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5
    },
    ratingText: {
        marginLeft: 8,
        color: '#666',
        fontSize: 14
    },
    doctorDescription: {
        marginTop: 10,
        color: '#777'
    },
    cardActions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 15
    },
    bookButton: {
        backgroundColor: '#1c0c4a',
        paddingVertical: 8,
        paddingHorizontal: 20,
        borderRadius: 8
    },
    bookButtonText: {
        color: '#fff',
        fontWeight: '600'
    },
    infoButton: {
        padding: 8
    },
    blurContainer: {
        flex: 1
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 20
    },
    modalContent: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 15,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 20
    },
    closeButton: {
        alignSelf: 'flex-end'
    },
    modalTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 15
    },
    appointmentDetails: {},
    sectionTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginBottom: 5,
        marginTop: 10
    },
    dateTimeButton: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
        backgroundColor: '#f9f9f9',
        borderRadius: 8,
        padding: 10
    },
    dateTimeValue: {
        marginLeft: 10,
        fontSize: 16,
        color: '#333'
    },
    picker: {
        height: 50,
        borderRadius: 8,
        backgroundColor: '#f9f9f9',
        marginVertical: 10
    },
    input: {
        height: 45,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        marginVertical: 10,
        paddingLeft: 10,
        fontSize: 16,
        backgroundColor: '#fff'
    },
    multilineInput: {
        height: 100,
        textAlignVertical: 'top'
    },
    confirmButton: {
        backgroundColor: '#1c0c4a',
        paddingVertical: 12,
        borderRadius: 8,
        marginTop: 20
    },
    confirmButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center'
    },
});
