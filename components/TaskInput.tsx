import React, { useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTaskContext } from '../app/context/TaskContext';
import * as Haptics from 'expo-haptics';
import { useAppTheme } from '@/hooks/useAppTheme';
import { CategorySelector } from './CategorySelector';
import { PrioritySelector } from './PrioritySelector';
import { PriorityType } from '@/app/types';
import Animated, { FadeIn, FadeOut, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

export const TaskInput: React.FC = () => {
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('4'); // Default to 'Other'
  const [selectedPriority, setSelectedPriority] = useState<PriorityType>('medium'); // Default to 'medium'
  const { addTask } = useTaskContext();
  const { theme, styles: themeStyles } = useAppTheme();
  const buttonScale = useSharedValue(1);

  const handleAddTask = () => {
    if (taskTitle.trim()) {
      buttonScale.value = withSpring(0.8, {}, () => {
        buttonScale.value = withSpring(1);
      });
      
      if (Platform.OS === 'ios' || Platform.OS === 'android') {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      }
      addTask(taskTitle.trim(), taskDescription.trim(), selectedCategory, selectedPriority);
      setTaskTitle('');
      setTaskDescription('');
      // This will keep the selected category and priority for the next task
    }
  };

  const buttonAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: buttonScale.value }]
    };
  });

  return (
    <Animated.View 
      style={{ borderBottomColor: theme.borderColor }}
      entering={FadeIn.duration(400)}
      exiting={FadeOut.duration(300)}
    >
      <View style={[styles.container, { borderBottomColor: theme.borderColor, borderBottomWidth: StyleSheet.hairlineWidth }]}>
        <View style={styles.inputContainer}>
          <TextInput
            style={[themeStyles.textInput, styles.titleInput]}
            placeholder="Task title..."
            placeholderTextColor={theme.text + '80'}
            value={taskTitle}
            onChangeText={setTaskTitle}
            returnKeyType="next"
          />
          <TextInput
            style={[themeStyles.textInput, styles.descriptionInput]}
            placeholder="Task description..."
            placeholderTextColor={theme.text + '80'}
            value={taskDescription}
            onChangeText={setTaskDescription}
            onSubmitEditing={handleAddTask}
            returnKeyType="done"
            multiline={true}
            numberOfLines={2}
          />
        </View>
        <TouchableOpacity
          style={[styles.addButton, !taskTitle.trim() && styles.addButtonDisabled]}
          onPress={handleAddTask}
          disabled={!taskTitle.trim()}
        >
          <Animated.View style={buttonAnimatedStyle}>
            <Ionicons
              name="add-circle"
              size={36}
              color={taskTitle.trim() ? theme.primaryButtonBackground : theme.text + '50'}
            />
          </Animated.View>
        </TouchableOpacity>
      </View>
      <CategorySelector 
        selectedCategory={selectedCategory} 
        onSelectCategory={setSelectedCategory} 
      />
      <PrioritySelector
        selectedPriority={selectedPriority}
        onSelectPriority={setSelectedPriority}
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  inputContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  titleInput: {
    fontSize: 16,
    marginBottom: 8,
    paddingVertical: 8,
  },
  descriptionInput: {
    fontSize: 14,
    paddingVertical: 6,
  },
  addButton: {
    marginLeft: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonDisabled: {
    opacity: 0.5,
  },
}); 