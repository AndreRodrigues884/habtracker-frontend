import { ViewStyle, FlexAlignType } from "react-native";

type Justify =
  | "flex-start"
  | "flex-end"
  | "center"
  | "space-between"
  | "space-around"
  | "space-evenly";

type Align = FlexAlignType;

export const theme = {
  // Flex helpers
  flex: {
    row: { flexDirection: 'row' as const } satisfies ViewStyle,
    column: { flexDirection: 'column' as const } satisfies ViewStyle,
  },

  // Alignments
  align: {
    "top-left": { justifyContent: "flex-start" as Justify, alignItems: "flex-start" as Align } satisfies ViewStyle,
    "top-center": { justifyContent: "flex-start" as Justify, alignItems: "center" as Align } satisfies ViewStyle,
    "top-right": { justifyContent: "flex-start" as Justify, alignItems: "flex-end" as Align } satisfies ViewStyle,
    "center-left": { justifyContent: "center" as Justify, alignItems: "flex-start" as Align } satisfies ViewStyle,
    "center": { justifyContent: "center" as Justify, alignItems: "center" as Align } satisfies ViewStyle,
    "center-right": { justifyContent: "center" as Justify, alignItems: "flex-end" as Align } satisfies ViewStyle,
    "bottom-left": { justifyContent: "flex-end" as Justify, alignItems: "flex-start" as Align } satisfies ViewStyle,
    "bottom-center": { justifyContent: "flex-end" as Justify, alignItems: "center" as Align } satisfies ViewStyle,
    "bottom-right": { justifyContent: "flex-end" as Justify, alignItems: "flex-end" as Align } satisfies ViewStyle,
  },

  // Size helpers
  size: {
    hug: { width: 'auto' as const, height: 'auto' as const } satisfies ViewStyle,
    hug_height: { height: 'auto' as const } satisfies ViewStyle,
    full: { width: '100%' as const, height: '100%' as const } satisfies ViewStyle,
    full_width: { width: '100%' as const } satisfies ViewStyle,
  },

  // Gap
  gap: {
    sm: 8,
    md: 20,
    lg: 24,
  },

  // Colors
  colors: {
    primary: '#2D69FF',
    dark_text: '#434343',
    secondary: '#2DBCFF',
    white: '#FFFFFF',
    background: '#F8F8F8',
    gray: '#D9D9D9',
  },

  // Padding
  padding: {
    horizontal: {
      sm: { paddingHorizontal: 12 } satisfies ViewStyle,
      md: { paddingHorizontal: 16 } satisfies ViewStyle,
      xxl: { paddingHorizontal: 32 } satisfies ViewStyle,
    },
    vertical: {
      sm: { paddingVertical: 12 } satisfies ViewStyle,
      xxl: { paddingVertical: 56 } satisfies ViewStyle,
    },
  },


  // Border radius
  borderRadius: {
    sm: 8,
    md: 12,
  },

  borderColor: {
    borderWidth: 1,
    borderColor: '#2D69FF', // theme.colors.primary
  },

  // Typography
typography: {
  fontFamily: {
    regular: 'InstrumentSans-Regular',
    medium: 'InstrumentSans-Medium',
    semibold: 'InstrumentSans-Semibold',
    bold: 'InstrumentSans-Bold',
  },
  sizes: {
    xs: 12,
    sm: 16,
    md: 20,
    lg: 24,
  },
},
};
