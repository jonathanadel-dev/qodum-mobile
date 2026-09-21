export const colors = {
    primary: '#3e5daa',
    primaryPressed: '#0179B3',

    // Backgrounds
    background: '#FFFFFF',
    iconBackground: '#F4FAFC',
    dangerBackground: '#FDF2F3',
    successBackground: '#E7F8ED',
    warningBackground: '#FFF3E0',
    infoBackground: '#dae0f0',
    gradientStart: '#3d5eab',
    gradientEnd: '#4ea8dc',
    dotInactive: '#D6DEE4',
    admitCardBackground: '#f7f2f9',
    inputBackground: '#f5f5f7',
    iconFrameBackground: '#D9DADC',
    sectionBackground: '#EEF1F3',

    // Text
    text: '#12263A',
    textSecondary: '#718096',
    hash: '#A6B2BC',
    inactive: '#7A7F8A',

    // States
    danger: '#FF3B30',
    success: '#34C759',
    warning: '#FF9500',

    // Borders
    border: '#E5EAF0',
    borderFocused: '#0193db',

    // Overlay
    overlay: 'rgba(0, 0, 0, 0.45)',
};

export const fonts = {
    regular: 'Quicksand-Regular',
    medium: 'Quicksand-Medium',
    semiBold: 'Quicksand-SemiBold',
    bold: 'Quicksand-Bold',
};

export const typography = {
    title: {
        fontSize: 17,
        fontFamily: fonts.bold,
        color: '#12263A',
        marginBottom: 5,
    },
    description: {
        fontSize: 13,
        lineHeight: 19,
        fontFamily: fonts.regular,
        color: '#718096',
    },
    label: {
        fontSize: 14,
        fontFamily: fonts.semiBold,   // was: fontWeight: '600'
        color: '#12263A',
        marginBottom: 8,
    },

    input: {
        fontSize: 15,
        color: '#12263A',
    },

    error: {
        fontSize: 12,
        color: '#FF3B30',
        marginTop: 5,
    },

    button: {
        fontSize: 15,
        fontWeight: '700' as const,
    },

    onboardingTitle: {
        fontSize: 26,
        fontWeight: '700' as const,
        color: '#12263A',
    },
    onboardingSubtitle: {
        fontSize: 15,
        lineHeight: 22,
        color: '#718096',
    },
};

export const spacing = {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    xxl: 24,
    xxxl: 40,
};

export const radius = {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    xxl: 32, 
    round: 999,
};

export const shadows = {
    card: {
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.06,
        shadowRadius: 8,
        elevation: 3,
    },
};