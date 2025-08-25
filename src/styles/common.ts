import { StyleSheet } from 'react-native';
import { theme } from './theme';

export const commonStyles = StyleSheet.create({
  // Layout
  flex1: {
    flex: 1,
  },
  flexCenter: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowCenter: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rowSpaceBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  
  // Spacing
  marginTop: {
    marginTop: theme.spacing.md,
  },
  marginBottom: {
    marginBottom: theme.spacing.md,
  },
  marginLeft: {
    marginLeft: theme.spacing.md,
  },
  marginRight: {
    marginRight: theme.spacing.md,
  },
  
  padding: {
    padding: theme.spacing.md,
  },
  paddingHorizontal: {
    paddingHorizontal: theme.spacing.md,
  },
  paddingVertical: {
    paddingVertical: theme.spacing.md,
  },
  
  // Text
  textCenter: {
    textAlign: 'center',
  },
  textLeft: {
    textAlign: 'left',
  },
  textRight: {
    textAlign: 'right',
  },
  
  // Borders
  border: {
    borderWidth: 1,
    borderColor: theme.colors.gray[300],
  },
  borderTop: {
    borderTopWidth: 1,
    borderTopColor: theme.colors.gray[300],
  },
  borderBottom: {
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.gray[300],
  },
  
  // Shadows
  shadow: {
    ...theme.shadows.small,
  },
  shadowMedium: {
    ...theme.shadows.medium,
  },
  shadowLarge: {
    ...theme.shadows.large,
  },
  
  // Backgrounds
  bgWhite: {
    backgroundColor: theme.colors.white,
  },
  bgGray: {
    backgroundColor: theme.colors.gray[100],
  },
  bgPrimary: {
    backgroundColor: theme.colors.primary,
  },
  
  // Rounded corners
  rounded: {
    borderRadius: theme.borderRadius.md,
  },
  roundedFull: {
    borderRadius: theme.borderRadius.full,
  },
});
