import React, { useRef, useState } from 'react';
import {
    Platform,
    Linking,
    ScrollView,
    Share,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { captureRef } from 'react-native-view-shot';
import { generatePDF } from 'react-native-html-to-pdf';
import Ionicons from '@react-native-vector-icons/ionicons';
import ReactNativeBlobUtil from 'react-native-blob-util';

import Header from '../../../components/Header';
import Button from '../../../components/Button';
import AdmitCard from '../../../components/admitCard/AdmitCard';
import FloatingModal from '../../../components/FloatingModal';
import {
    colors,
    fonts,
    radius,
    spacing,
} from '../../../styles/theme';
import { AuthStackParamList } from '../../../navigation/AuthStack';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import toast from '../../../lib/toast';


// Type
type Props = NativeStackScreenProps<AuthStackParamList, 'AdmitCard'>;


// Admit card
const ADMIT_CARD = {
    schoolName: 'THE PILLAR PUBLIC SCHOOL',
    schoolAddress:
        'Rajendra Nagar, Sector 4 Ghaziabad,\nUttar Pradesh – 201001',
    admissionNumber: '11324453',
    studentName: 'Anjali Kumar Gupta',
    fatherName: 'Arjun Kumar Gupta',
    className: '11',
    session: '2025-2026',
    dateOfBirth: '22/10/2006',
    gender: 'Female',
    studentImage:
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
};


// Instructions
const INSTRUCTIONS = [
    'Candidates must report to the examination center at least 15 minutes before the exam time.',
    'Entry will not be allowed without a valid admit card.',
    'Mobile phones, smart watches, calculators, and electronic devices are strictly prohibited.',
    'Late entry after the reporting time will not be permitted.',
];


// Splits a full file path into its directory and file name for display.
function splitPath(fullPath: string) {
    const lastSlash = fullPath.lastIndexOf('/');
    if (lastSlash === -1) return { dir: fullPath, name: fullPath };
    return {
        dir: fullPath.slice(0, lastSlash + 1),
        name: fullPath.slice(lastSlash + 1),
    };
}


// Admit card screen
export default function AdmitCardScreen({ navigation, route }: Props) {

    // State
    const { schoolCode } = route.params || {};
    const cardRef = useRef<any>(null);
    const [downloading, setDownloading] = useState(false);
    const [successPath, setSuccessPath] = useState<string | null>(null);


    // Handlers
    const handleShare = async () => {
        try {
            await Share.share({
                message:
                    `Admit Card — ${ADMIT_CARD.studentName}\n` +
                    `${ADMIT_CARD.schoolName}\n` +
                    `Admission No: ${ADMIT_CARD.admissionNumber}\n` +
                    `Class: ${ADMIT_CARD.className} | Session: ${ADMIT_CARD.session}\n` +
                    `Exam Date: 25/03/2026 | Duration: 3 Hours`,
            });
        } catch {
            // user dismissed the share sheet — not an error
        }
    };
    const handleDownload = async () => {
        setDownloading(true);

        try {
            if (!cardRef.current) {
                throw new Error('Admit card view is not ready to capture.');
            }

            const base64Image = await captureRef(cardRef, {
                format: 'png',
                quality: 0.9,
                result: 'base64',
            });

            const imageHtml = `
                <html>
                    <head>
                        <meta charset="utf-8" />
                        <style>
                            body {
                                margin: 0;
                                padding: 0;
                                background: #ffffff;
                                font-family: Arial, sans-serif;
                            }
                            img {
                                width: 100%;
                                height: auto;
                                display: block;
                                margin: 0;
                                padding: 0;
                            }
                        </style>
                    </head>
                    <body>
                        <img src="data:image/png;base64,${base64Image}" />
                    </body>
                </html>
            `;

            const pdf = await generatePDF({
                html: imageHtml,
                fileName: `AdmitCard_${ADMIT_CARD.admissionNumber}`,
                base64: true,
                directory: 'Documents',
            });

            if (!pdf?.base64) {
                throw new Error('PDF generation did not return base64 data.');
            }

            let finalPath: string;

            if (Platform.OS === 'android') {
                const tempPath = `${ReactNativeBlobUtil.fs.dirs.CacheDir}/AdmitCard_${ADMIT_CARD.admissionNumber}.pdf`;
                await ReactNativeBlobUtil.fs.writeFile(tempPath, pdf.base64, 'base64');

                const mediaUri = await ReactNativeBlobUtil.MediaCollection.copyToMediaStore(
                    {
                        name: `AdmitCard_${ADMIT_CARD.admissionNumber}`,
                        parentFolder: '',
                        mimeType: 'application/pdf',
                    },
                    'Download',
                    tempPath,
                );

                finalPath = mediaUri;
            } else {
                finalPath = `${ReactNativeBlobUtil.fs.dirs.DocumentDir}/AdmitCard_${ADMIT_CARD.admissionNumber}.pdf`;
                await ReactNativeBlobUtil.fs.writeFile(finalPath, pdf.base64, 'base64');
            }

            setSuccessPath(finalPath);
            toast.success('Admit card downloaded successfully.');
        } catch (err) {
            console.log('Admit card download error:', err);
            toast.error('Something went wrong while downloading the admit card.');
        } finally {
            setDownloading(false);
        }
    };
    const handleOpenFile = async () => {
        if (!successPath) return;

        try {
            if (Platform.OS === 'android') {
                await ReactNativeBlobUtil.android.actionViewIntent(successPath, 'application/pdf');
            } else {
                await Linking.openURL(`file://${successPath}`);
            }
        } catch {
            toast.error('Unable to open the file.');
        }
    };

    const successParts = successPath ? splitPath(successPath) : null;

    return (
        <View style={styles.container}>
            <Header navigation={navigation} title="Admit Card" />

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                <View ref={cardRef} collapsable={false}>
                    <AdmitCard
                        schoolLogo={'../../../assets/images/logo.png'}
                        schoolName={ADMIT_CARD.schoolName}
                        schoolAddress={ADMIT_CARD.schoolAddress}
                        admissionNumber={ADMIT_CARD.admissionNumber}
                        studentName={ADMIT_CARD.studentName}
                        fatherName={ADMIT_CARD.fatherName}
                        className={ADMIT_CARD.className}
                        session={ADMIT_CARD.session}
                        dateOfBirth={ADMIT_CARD.dateOfBirth}
                        gender={ADMIT_CARD.gender}
                        studentImage={ADMIT_CARD.studentImage}
                    />
                </View>

                <View style={styles.divider} />

                <View style={styles.examInfo}>
                    <View style={styles.examItem}>
                        <Text style={styles.examLabel}>Exam Date</Text>
                        <Text style={styles.examValue}>25/03/2026</Text>
                    </View>

                    <View style={styles.examItem}>
                        <Text style={styles.examLabel}>Duration</Text>
                        <Text style={styles.examValue}>3 Hours</Text>
                    </View>
                </View>

                <View style={styles.instructions}>
                    <Text style={styles.instructionsTitle}>Important Instructions:</Text>

                    <View style={styles.instructionList}>
                        {INSTRUCTIONS.map((instruction, index) => (
                            <View key={index} style={styles.instruction}>
                                <Text style={styles.bullet}>•</Text>
                                <Text style={styles.instructionText}>{instruction}</Text>
                            </View>
                        ))}
                    </View>
                </View>

                <View style={styles.actions}>
                    <View style={styles.actionButton}>
                        <Button
                            type="white"
                            label="Share"
                            onPress={handleShare}
                            style={styles.shareButton}
                            textStyle={styles.shareText}
                        />
                    </View>

                    <View style={styles.actionButton}>
                        <Button
                            type="gradient"
                            label="Download"
                            loadingLabel="Preparing PDF..."
                            loading={downloading}
                            onPress={handleDownload}
                            style={styles.downloadButton}
                            textStyle={styles.downloadText}
                        />
                    </View>
                </View>

                <View style={styles.footer}>
                    <Text style={styles.footerLabel}>SCHOOL CODE</Text>
                    <View style={styles.footerDot} />
                    <Text style={styles.footerCode}>{schoolCode || '------'}</Text>
                </View>
            </ScrollView>

            <FloatingModal
                visible={!!successParts}
                onClose={() => setSuccessPath(null)}
                dismissOnBackdropPress
            >
                <View style={styles.successHeaderRow}>
                    <Ionicons name="checkmark-circle" size={24} color={colors.success} />
                    <Text style={styles.successTitle}>Download Successful</Text>
                </View>

                {successParts && (
                    <>
                        <Text style={styles.successBody}>Saved in: {successParts.dir}</Text>
                        <Text style={styles.successFileName}>{successParts.name}</Text>
                    </>
                )}

                <View style={styles.successActions}>
                    <Text style={styles.successAction} onPress={() => setSuccessPath(null)}>
                        Ok
                    </Text>
                    <Text style={[styles.successAction, styles.successActionPrimary]} onPress={handleOpenFile}>
                        Open
                    </Text>
                </View>
            </FloatingModal>
        </View>
    );
}


// Styles
const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.background },
    scrollContent: {
        paddingHorizontal: spacing.lg,
        paddingTop: spacing.lg,
        paddingBottom: spacing.xxl,
    },
    divider: {
        height: 1,
        backgroundColor: colors.border,
        marginTop: spacing.xxl,
        marginBottom: spacing.lg,
    },
    examInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: spacing.xl,
    },
    examItem: { flexDirection: 'row', alignItems: 'center' },
    examLabel: { fontSize: 14, fontFamily: fonts.bold, color: colors.text, marginRight: 4 },
    examValue: { fontSize: 14, fontFamily: fonts.regular, color: colors.text },
    instructions: { marginBottom: spacing.xxl },
    instructionsTitle: {
        fontSize: 16,
        lineHeight: 21,
        fontFamily: fonts.bold,
        color: colors.text,
        marginBottom: spacing.md,
    },
    instructionList: { gap: spacing.sm },
    instruction: { flexDirection: 'row', alignItems: 'flex-start' },
    bullet: { width: 15, fontSize: 15, lineHeight: 21, fontFamily: fonts.bold, color: colors.text },
    instructionText: { flex: 1, fontSize: 14, lineHeight: 21, fontFamily: fonts.regular, color: colors.text },
    actions: { flexDirection: 'row', gap: spacing.md },
    actionButton: { flex: 1 },
    shareButton: {
        width: '100%',
        height: 48,
        paddingHorizontal: spacing.lg,
        borderWidth: 1,
        borderColor: '#858585',
        borderRadius: radius.round,
        backgroundColor: colors.background,
    },
    shareText: { fontSize: 15, fontFamily: fonts.medium, color: colors.primary },
    downloadButton: {
        width: '100%',
        height: 48,
        paddingHorizontal: spacing.lg,
        borderRadius: radius.md,
    },
    downloadText: { fontSize: 15, fontFamily: fonts.semiBold, color: colors.background },
    footer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: spacing.xxl,
    },
    footerLabel: { fontSize: 9, fontFamily: fonts.semiBold, letterSpacing: 1, color: colors.hash },
    footerDot: {
        width: 3,
        height: 3,
        borderRadius: radius.round,
        backgroundColor: colors.border,
        marginHorizontal: spacing.sm,
    },
    footerCode: { fontSize: 10, fontFamily: fonts.bold, letterSpacing: 1, color: colors.textSecondary },

    // Success modal
    successHeaderRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.sm,
        marginBottom: spacing.lg,
    },
    successTitle: {
        ...({} as any),
        fontSize: 19,
        fontFamily: fonts.bold,
        color: colors.text,
    },
    successBody: {
        fontSize: 14,
        fontFamily: fonts.regular,
        color: colors.text,
        marginBottom: spacing.xs,
    },
    successFileName: {
        fontSize: 14,
        fontFamily: fonts.bold,
        color: colors.text,
        marginBottom: spacing.xl,
    },
    successActions: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        gap: spacing.xl,
    },
    successAction: {
        fontSize: 15,
        fontFamily: fonts.semiBold,
        color: colors.primary,
    },
    successActionPrimary: {
        fontFamily: fonts.bold,
    },
});