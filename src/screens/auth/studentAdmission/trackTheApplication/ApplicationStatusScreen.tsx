import React from 'react';
import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';

import Header from '../../../../components/Header';
import { AuthStackParamList } from '../../../../navigation/AuthStack';
import { NativeStackScreenProps } from '@react-navigation/native-stack';


// Type
type Props = NativeStackScreenProps<AuthStackParamList, 'ApplicationStatus'>;


// Steps
const STATUS_STEPS = [
    {
        key: 'submitted',
        label: 'Submitted',
    },
    {
        key: 'reviewing',
        label: 'Reviewing',
    },
    {
        key: 'validated',
        label: 'Validated',
    },
] as const;


// Image
const STATUS_IMAGE = require(
    '../../../../assets/images/application-status.png'
);


// Application status
export default function ApplicationStatusScreen({ navigation, route }: Props) {

    // State
    const currentStatus = route.params.status;
    const currentIndex = STATUS_STEPS.findIndex(
        step => step.key === currentStatus,
    );

    return (
        <View style={styles.container}>
            <Header
                navigation={navigation}
                title="Application Status"
            />

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                {/* Status card */}
                <View style={styles.statusCard}>
                    {/* Timeline */}
                    <View style={styles.timeline}>
                        {STATUS_STEPS.map((step, index) => {
                            const isCompleted =
                                index <= currentIndex;

                            const isLast =
                                index === STATUS_STEPS.length - 1;

                            return (
                                <View
                                    key={step.key}
                                    style={styles.timelineItem}
                                >
                                    {!isLast && (
                                        <View
                                            style={[
                                                styles.connector,
                                                index < currentIndex &&
                                                    styles.connectorActive,
                                            ]}
                                        />
                                    )}

                                    <View
                                        style={[
                                            styles.statusDot,
                                            isCompleted &&
                                                styles.statusDotActive,
                                        ]}
                                    />

                                    <Text style={styles.statusLabel}>
                                        {step.label}
                                    </Text>
                                </View>
                            );
                        })}
                    </View>

                    {/* Illustration inside card */}
                    <View style={styles.cardImageContainer}>
                        <Image
                            source={STATUS_IMAGE}
                            style={styles.cardImage}
                            resizeMode="contain"
                        />
                    </View>
                </View>

                {/* Main illustration */}
                <View style={styles.heroImageContainer}>
                    <Image
                        source={STATUS_IMAGE}
                        style={styles.heroImage}
                        resizeMode="contain"
                    />
                </View>

                {/* Message */}
                <View style={styles.message}>
                    <Text style={styles.title}>
                        Application Submitted
                    </Text>

                    <Text style={styles.description}>
                        Your admission form has been successfully
                        submitted. Our team will review your
                        application shortly. Please keep checking the
                        application status for updates.
                    </Text>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    scrollContent: {
        paddingBottom: 28,
    },


    /* Status card */
    statusCard: {
        marginHorizontal: 20,
        marginTop: 20,
        height: 182,
        borderRadius: 14,
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#E8E8E8',
        flexDirection: 'row',
        paddingLeft: 15,
        paddingRight: 8,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.08,
        shadowRadius: 3,
        elevation: 2,
    },


    /* Timeline */
    timeline: {
        width: 145,
        paddingTop: 16,
        paddingBottom: 8,
    },
    timelineItem: {
        height: 53,
        position: 'relative',
    },
    statusDot: {
        position: 'absolute',
        left: 0,
        top: 0,
        width: 14,
        height: 14,
        borderRadius: 7,
        backgroundColor: '#DCDCDC',
    },
    statusDotActive: {
        backgroundColor: '#45B85A',
    },
    connector: {
        position: 'absolute',
        left: 6,
        top: 14,
        width: 2,
        height: 39,
        backgroundColor: '#DFDFDF',
    },
    connectorActive: {
        backgroundColor: '#45B85A',
    },
    statusLabel: {
        marginLeft: 30,
        marginTop: -2,
        fontSize: 15,
        lineHeight: 20,
        fontWeight: '600',
        color: '#111111',
    },


    /* Card illustration */
    cardImageContainer: {
        flex: 1,
        height: 148,
        marginTop: 16,
        borderRadius: 10,
        backgroundColor: '#F6F6F6',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
    },
    cardImage: {
        width: '88%',
        height: '88%',
    },


    /* Main illustration */
    heroImageContainer: {
        height: 205,
        marginTop: 26,
        alignItems: 'center',
        justifyContent: 'center',
    },
    heroImage: {
        width: 185,
        height: 175,
    },


    /* Message */
    message: {
        paddingHorizontal: 22,
        alignItems: 'center',
        marginTop: 0,
    },
    title: {
        lineHeight: 28,
        // ...typography.title,
        fontWeight: '600',
        color: '#111111',
        textAlign: 'center',
        letterSpacing: -0.3,
    },
    description: {
        marginTop: 10,
        // ...typography.description,
        fontSize: 14,
        lineHeight: 21,
        color: '#707070',
        textAlign: 'center',
    },
});