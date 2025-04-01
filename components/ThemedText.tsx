// ThemedText.tsx
// A component that renders text with theme-appropriate styling
import { Text, type TextProps, StyleSheet } from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';

/**
 * Props for ThemedText component
 * Extends standard TextProps with theming options
 */
export type ThemedTextProps = TextProps & {
  // Optional custom light mode color
  lightColor?: string;
  // Optional custom dark mode color
  darkColor?: string;
  // Text type for predefined styling variations
  type?: 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link';
};

/**
 * Text component that automatically uses theme colors
 * and provides standard text style variants
 */
export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = 'default',
  ...rest
}: ThemedTextProps) {
  // Get the appropriate color based on the current theme
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

  return (
    <Text
      style={[
        { color },
        // Apply the correct text style based on type
        type === 'default' ? styles.default : undefined,
        type === 'title' ? styles.title : undefined,
        type === 'defaultSemiBold' ? styles.defaultSemiBold : undefined,
        type === 'subtitle' ? styles.subtitle : undefined,
        type === 'link' ? styles.link : undefined,
        // Apply any custom styles passed as props
        style,
      ]}
      {...rest}
    />
  );
}

/**
 * Predefined text styles for consistent typography
 */
const styles = StyleSheet.create({
  default: {
    fontSize: 16,
    lineHeight: 24,
  },
  defaultSemiBold: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '600',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    lineHeight: 32,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  link: {
    lineHeight: 30,
    fontSize: 16,
    color: '#0a7ea4',
  },
});
