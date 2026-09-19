import React from 'react';
import {
    Image,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { colors, fonts, radius, spacing } from '../../styles/theme';


// Types
type Props = {
    schoolLogo: any;
    schoolName: string;
    schoolAddress: string;
    admissionNumber: string;
    studentName: string;
    fatherName: string;
    className: string;
    session: string;
    dateOfBirth: string;
    gender: string;
    studentImage: string;
};


// Admit card
export default function AdmitCard({
    schoolLogo,
    schoolName,
    schoolAddress,
    admissionNumber,
    studentName,
    fatherName,
    className,
    session,
    dateOfBirth,
    gender,
    studentImage,
}: Props) {
    return (
        <View style={styles.card}>

            {/* School information */}
            <View style={styles.schoolHeader}>

                <Image
                    // source={schoolLogo}
                    source={require('../../assets/images/logo.png')}
                    style={styles.schoolLogo}
                    resizeMode="contain"
                />

                <View style={styles.schoolInfo}>
                    <Text
                        style={styles.schoolName}
                        numberOfLines={1}
                    >
                        {schoolName}
                    </Text>

                    <Text
                        style={styles.schoolAddress}
                        numberOfLines={2}
                    >
                        {schoolAddress}
                    </Text>
                </View>

            </View>


            {/* Student information */}
            <View style={styles.studentInfo}>

                <View style={styles.details}>

                    {/* Admission number */}
                    <View style={styles.detail}>
                        <Text style={styles.detailLabel}>
                            Admission No
                        </Text>

                        <Text style={styles.detailValue}>
                            {admissionNumber}
                        </Text>
                    </View>


                    {/* Student name */}
                    <View style={styles.detail}>
                        <Text style={styles.detailLabel}>
                            Student Name
                        </Text>

                        <Text
                            style={styles.detailValue}
                            numberOfLines={1}
                        >
                            {studentName}
                        </Text>
                    </View>


                    {/* Father's name */}
                    <View style={styles.detail}>
                        <Text style={styles.detailLabel}>
                            Father's Name
                        </Text>

                        <Text
                            style={styles.detailValue}
                            numberOfLines={1}
                        >
                            {fatherName}
                        </Text>
                    </View>


                    {/* Class + session */}
                    <View style={styles.row}>

                        <View style={styles.inlineField}>
                            <Text style={styles.inlineLabel}>
                                Class:
                            </Text>

                            <Text style={styles.inlineValue}>
                                {className}
                            </Text>
                        </View>

                        <View style={styles.inlineField}>
                            <Text style={styles.inlineLabel}>
                                Session:
                            </Text>

                            <Text style={styles.inlineValue}>
                                {session}
                            </Text>
                        </View>

                    </View>


                    {/* DOB + gender */}
                    <View style={styles.row}>

                        <View style={styles.inlineField}>
                            <Text style={styles.inlineLabel}>
                                DOB:
                            </Text>

                            <Text style={styles.inlineValue}>
                                {dateOfBirth}
                            </Text>
                        </View>

                        <View style={styles.inlineField}>
                            <Text style={styles.inlineLabel}>
                                Gender:
                            </Text>

                            <Text style={styles.inlineValue}>
                                {gender}
                            </Text>
                        </View>

                    </View>

                </View>


                {/* Student photo */}
                <Image
                    source={{ uri: studentImage }}
                    style={styles.studentImage}
                    resizeMode="cover"
                />

            </View>

        </View>
    );
}


// Styles
const styles = StyleSheet.create({

    /* Card */
    card: {
        width: '100%',
        backgroundColor: colors.admitCardBackground,
        borderRadius: radius.sm,
        borderWidth: 1,
        borderColor: colors.border,
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.sm,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.07,
        shadowRadius: 4,
        elevation: 2,
    },


    /* School header */
    schoolHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        minHeight: 62,
        marginBottom: spacing.sm,
    },
    schoolLogo: {
        width: 56,
        height: 56,
        marginRight: spacing.sm,
    },
    schoolInfo: {
        flex: 1,
        alignItems: 'center',
        paddingRight: 2,
    },
    schoolName: {
        width: '100%',
        fontSize: 18,
        lineHeight: 22,
        fontFamily: fonts.bold,
        color: colors.primary,
        textAlign: 'center',
        letterSpacing: -0.3,
    },
    schoolAddress: {
        marginTop: 3,
        fontSize: 12.5,
        lineHeight: 17,
        fontFamily: fonts.regular,
        color: colors.text,
        textAlign: 'center',
    },


    /* Student information */
    studentInfo: {
        minHeight: 188,
        position: 'relative',
    },
    details: {
        paddingRight: 100,
    },
    detail: {
        marginBottom: 8,
    },
    detailLabel: {
        fontSize: 15,
        lineHeight: 19,
        fontFamily: fonts.bold,
        color: colors.text,
    },
    detailValue: {
        fontSize: 14,
        lineHeight: 18,
        fontFamily: fonts.regular,
        color: colors.text,
    },


    /* Inline fields */
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 1,
        marginBottom: 5,
    },
    inlineField: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: spacing.md,
    },
    inlineLabel: {
        fontSize: 14,
        lineHeight: 19,
        fontFamily: fonts.bold,
        color: colors.text,
        marginRight: 4,
    },
    inlineValue: {
        fontSize: 14,
        lineHeight: 19,
        fontFamily: fonts.regular,
        color: colors.text,
    },


    /* Student image */
    studentImage: {
        position: 'absolute',
        right: 0,
        top: 0,
        width: 96,
        height: 100,
        borderRadius: radius.lg,
        borderWidth: 4,
        borderColor: colors.primary
    },
});