import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTaskContext } from '../app/context/TaskContext';
import { useAppTheme } from '@/hooks/useAppTheme';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

export const ArchiveButton: React.FC = () => {
  const { showArchived, toggleShowArchived } = useTaskContext();
  const { theme } = useAppTheme();
  const scale = useSharedValue(1);
  const [isAnimating, setIsAnimating] = useState(false);

  const handlePress = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    scale.value = withSpring(0.8, {}, () => {
      scale.value = withSpring(1, {}, () => {
        setIsAnimating(false);
      });
    });
    
    // This toggles the archive view
    toggleShowArchived();
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }]
    };
  });

  return (
    <TouchableOpacity
      style={styles.button}
      onPress={handlePress}
      disabled={isAnimating}
      accessibilityLabel={showArchived ? 'Switch to active tasks' : 'Switch to archived tasks'}
    >
      <Animated.View style={animatedStyle}>
        <Ionicons
          name={showArchived ? "list" : "archive"}
          size={24}
          color={theme.text}
        />
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 8,
    marginRight: 8,
  },
}); 