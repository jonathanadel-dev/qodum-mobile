export const colors = {
  primary: '#0193db',
  primaryPressed: '#0179B3',

  // Backgrounds
  background: '#FFFFFF',
  surface: '#FFFFFF',
  iconBackground: '#F4FAFC',
  dangerBackground: '#FDF2F3',
  successBackground: '#E7F8ED',
  warningBackground: '#FFF3E0',
  infoBackground: '#E5F4FB',
  heroSurface: '#1B3350',

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

export const typography = {
    title: {
        fontSize: 17,
        fontWeight: '700' as const,
        color: '#12263A',
        marginBottom: 5,
    },

    description: {
        fontSize: 13,
        lineHeight: 19,
        color: '#718096',
    },

    label: {
        fontSize: 14,
        fontWeight: '600' as const,
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
};

export const spacing = {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    xxl: 24,
    xxxl: 32,
};

export const radius = {
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
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