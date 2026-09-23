import { StyleSheet } from 'react-native';
import { colors, radius, spacing, typography } from './theme';


// Form styles
export const formStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8FBFD',
    },
    keyboardView: {
        flex: 1,
        paddingTop: 20,
    },
    scrollContent: {
        paddingHorizontal: 20,
        paddingBottom: 50,
    },
    header: {
        marginBottom: 25,
    },
    headerText: {
        paddingHorizontal: 2,
    },
    eyebrow: {
        ...typography.label,
        fontSize: 11,
        letterSpacing: 2,
        color: colors.primary,
        marginBottom: metrics.sm,
    },
    title: {
        fontSize: 30,
        fontWeight: '800',
        color: colors.text,
        letterSpacing: -0.8,
    },
    subtitle: {
        fontSize: 15,
        lineHeight: 23,
        color: colors.textSecondary,
        marginTop: metrics.sm,
        maxWidth: 340,
    },
    sectionCard: {
        marginBottom: metrics.lg,
    },
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    sectionNumber: {
        width: 40,
        height: 40,
        borderRadius: metrics.md,
        backgroundColor: colors.iconBackground,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: metrics.md,
    },
    sectionNumberText: {
        fontSize: 12,
        fontWeight: '800',
        color: colors.primary,
    },
    sectionHeading: {
        flex: 1,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: colors.text,
    },
    sectionDescription: {
        fontSize: 12,
        color: '#8493A0',
        marginTop: 2,
    },
    sectionDivider: {
        height: 1,
        backgroundColor: '#EDF2F5',
        marginVertical: metrics.xl,
    },
    photoSection: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: metrics.xxl,
    },
    photo: {
        width: 86,
        height: 86,
        borderRadius: 24,
        backgroundColor: colors.iconBackground,
        borderWidth: 1,
        borderColor: '#D7EEF7',
        borderStyle: 'dashed',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
    },
    photoError: {
        borderColor: '#E35D6A',
        backgroundColor: colors.dangerBackground,
    },
    photoImage: {
        width: '100%',
        height: '100%',
    },
    photoIcon: {
        fontSize: 27,
        fontWeight: '300',
        color: colors.primary,
        lineHeight: 27,
    },
    photoText: {
        fontSize: 10,
        fontWeight: '700',
        color: colors.primary,
        marginTop: 3,
    },
    photoDescription: {
        flex: 1,
        marginLeft: 15,
    },
    photoTitle: {
        fontSize: 14,
        fontWeight: '700',
        color: '#243B53',
    },
    photoHint: {
        fontSize: 12,
        lineHeight: 18,
        color: '#8493A0',
        marginTop: 4,
        maxWidth: 210,
    },
    removePhotoButton: {
        alignItems: 'center',
        marginTop: 6,
    },
    removePhotoText: {
        fontSize: 11,
        fontWeight: '700',
        color: '#D95362',
    },
    inputGroup: {
        marginBottom: metrics.lg,
    },
    label: {
        ...typography.label,
    },
    row: {
        flexDirection: 'row',
        gap: 10,
    },
    halfInput: {
        flex: 1,
    },
    genderContainer: {
        flexDirection: 'row',
        gap: 10,
    },
    genderOption: {
        flex: 1,
        minHeight: 50,
        borderWidth: 1,
        borderColor: '#DDE7EC',
        borderRadius: 15,
        backgroundColor: '#FBFDFE',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 14,
    },
    genderOptionActive: {
        borderColor: colors.primary,
        backgroundColor: '#F0FAFE',
    },
    radio: {
        width: 18,
        height: 18,
        borderRadius: 9,
        borderWidth: 1.5,
        borderColor: '#B7C5CE',
        marginRight: 9,
    },
    radioActive: {
        borderWidth: 5,
        borderColor: colors.primary,
    },
    genderText: {
        fontSize: 13,
        fontWeight: '600',
        color: '#667786',
    },
    genderTextActive: {
        color: colors.primary,
    },
    errorText: {
        ...typography.error,
    },
    submitSection: {
        marginTop: 7,
    },
    submitHint: {
        fontSize: 12,
        lineHeight: 18,
        color: '#8795A1',
        textAlign: 'center',
        paddingHorizontal: 25,
        marginBottom: 14,
    }
})