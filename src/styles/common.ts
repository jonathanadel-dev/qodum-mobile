import { StyleSheet } from 'react-native';
import { colors, radii, spacing } from './theme';

export const commonStyles = StyleSheet.create({
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  floatingTabBar: {
    position: 'absolute',
    left: spacing.sm,
    right: spacing.sm,
    bottom: spacing.sm,
    height: 80,
    backgroundColor: colors.background,
    borderRadius: radii.xl,
    borderTopWidth: 0,
    elevation: 0,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 3 },
    paddingTop: 8,
    paddingBottom: 0,
  },
  tabItem: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: radii.md,
    marginHorizontal: spacing.none,
    paddingVertical: spacing.none,
  },
  iconWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
