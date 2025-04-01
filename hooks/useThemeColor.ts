/**
 * useThemeColor.ts
 * A hook for accessing theme-appropriate colors with optional overrides
 * 
 * Learn more about light and dark modes:
 * https://docs.expo.dev/guides/color-schemes/
 */

import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

/**
 * Returns the appropriate color for the current theme
 * 
 * @param props - Optional override colors for light and dark themes
 * @param colorName - Key of the color to retrieve from the Colors object
 * @returns The appropriate color for the current theme, or the override if provided
 */
export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark
) {
  // Get the current theme, defaulting to light if undefined
  const theme = useColorScheme() ?? 'light';
  
  // Check if an override color was provided for the current theme
  const colorFromProps = props[theme];

  // Return the override color if provided, otherwise use the default color from Colors
  if (colorFromProps) {
    return colorFromProps;
  } else {
    return Colors[theme][colorName];
  }
}
