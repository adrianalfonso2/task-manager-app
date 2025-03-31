import React, { useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTaskContext } from '../app/context/TaskContext';
import * as Haptics from 'expo-haptics';
import { useAppTheme } from '@/hooks/useAppTheme';

export const TaskInput: React.FC = () => {
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const { addTask } = useTaskContext();
  const { theme, styles: themeStyles } = useAppTheme();

  const handleAddTask = () => {
    if (taskTitle.trim()) {
      if (Platform.OS === 'ios' || Platform.OS === 'android') {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      }
      addTask(taskTitle.trim(), taskDescription.trim());
      setTaskTitle('');
      setTaskDescription('');
    }
  };

  return (
    <View style={[styles.container, { borderBottomColor: theme.borderColor }]}>
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
        <Ionicons
          name="add-circle"
          size={36}
          color={taskTitle.trim() ? theme.primaryButtonBackground : theme.text + '50'}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
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