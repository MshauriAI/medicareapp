import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, Animated } from "react-native";
import { Ionicons } from '@expo/vector-icons';

export default function ConsultationReport({ navigation }) {
    const reportDetails = {
        patientName: "John Doe",
        consultationDate: "November 12, 2024",
        doctor: "Dr. Jane Smith",
        specialty: "Cardiologist",
        diagnosis: "Mild Hypertension",
        treatment: "Increase physical activity and reduce salt intake",
        nextVisit: "December 12, 2024"
    };

    const fadeAnim = new Animated.Value(0); // Initial fade value

    // Fade in animation
    React.useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true
        }).start();
    }, []);

    return (
        <View style={styles.container}>
                {/* Navbar */}
                <View style={styles.navbar}>
                    <View style={styles.breadcrumb}>
                        <TouchableOpacity>
                            <Text style={styles.breadcrumbText}>Report</Text>
                        </TouchableOpacity>
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
            <ScrollView>
                {/* Main Content */}
                <Animated.View style={[styles.mainContent, { opacity: fadeAnim }]}>
                    
                    {/* Patient and Doctor Info */}
                    <View style={styles.card}>
                        <View style={styles.cardHeader}>
                            <Ionicons name="person-circle" size={24} color="#fff" />
                            <Text style={styles.cardHeaderText}>Patient Information</Text>
                        </View>
                        <Text style={styles.infoText}>Name: {reportDetails.patientName}</Text>
                        <Text style={styles.infoText}>Consultation Date: {reportDetails.consultationDate}</Text>
                    </View>

                    <View style={styles.card}>
                        <View style={styles.cardHeader}>
                            <Ionicons name="medkit" size={24} color="#fff" />
                            <Text style={styles.cardHeaderText}>Doctor Information</Text>
                        </View>
                        <Text style={styles.infoText}>Doctor: {reportDetails.doctor}</Text>
                        <Text style={styles.infoText}>Specialty: {reportDetails.specialty}</Text>
                    </View>

                    {/* Diagnosis and Treatment */}
                    <View style={styles.card}>
                        <View style={styles.cardHeader}>
                            <Ionicons name="pulse" size={24} color="#fff" />
                            <Text style={styles.cardHeaderText}>Diagnosis</Text>
                        </View>
                        <Text style={styles.infoText}>{reportDetails.diagnosis}</Text>
                    </View>

                    <View style={styles.card}>
                        <View style={styles.cardHeader}>
                            <Ionicons name="medical" size={24} color="#fff" />
                            <Text style={styles.cardHeaderText}>Treatment</Text>
                        </View>
                        <Text style={styles.infoText}>{reportDetails.treatment}</Text>
                    </View>

                    {/* Next Appointment */}
                    <View style={styles.card}>
                        <View style={styles.cardHeader}>
                            <Ionicons name="calendar" size={24} color="#fff" />
                            <Text style={styles.cardHeaderText}>Next Visit</Text>
                        </View>
                        <Text style={styles.infoText}>{reportDetails.nextVisit}</Text>
                    </View>

                    {/* Action Buttons */}
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.buttonBack} onPress={() => navigation.goBack()}>
                            <Text style={styles.buttonText}>Back to Dashboard</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.buttonDownload}>
                            <Text style={styles.buttonText}>Download Report</Text>
                        </TouchableOpacity>
                    </View>
                </Animated.View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f4f7fc',
    },
    navbar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 40,
        paddingBottom: 10,
        // backgroundColor: '#1c0c4a',
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 5,
    },
    breadcrumb: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    breadcrumbText: {
        fontSize: 16,
        // color: '#fff',
        fontWeight: 'bold',
    },
    navRight: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 20,
    },
    notificationButton: {
        position: 'relative',
    },
    mainContent: {
        padding: 20,
    },
    title: {
        fontSize: 34,
        fontWeight: '700',
        color: '#1c0c4a',
        marginBottom: 30,
        textAlign: 'center',
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 20,
        marginBottom: 15,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        backgroundColor: '#1c0c4a',
        borderRadius: 10,
        paddingVertical: 8,
        paddingHorizontal: 15,
    },
    cardHeaderText: {
        fontSize: 18,
        fontWeight: '600',
        color: '#fff',
        marginLeft: 10,
    },
    infoText: {
        fontSize: 16,
        color: '#555',
        marginBottom: 5,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 40,
    },
    buttonBack: {
        backgroundColor: '#ff5c8f',
        width: '48%',
        borderRadius: 12,
        paddingVertical: 14,
        alignItems: 'center',
    },
    buttonDownload: {
        backgroundColor: '#f7b731',
        width: '48%',
        borderRadius: 12,
        paddingVertical: 14,
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#fff',
    },
});