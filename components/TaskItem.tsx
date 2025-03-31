import React from 'react';
import { StyleSheet, TouchableOpacity, View, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Task } from '../app/types';
import { ThemedText } from './ThemedText';
import { useTaskContext } from '../app/context/TaskContext';
import * as Haptics from 'expo-haptics';
import { useAppTheme } from '@/hooks/useAppTheme';

interface TaskItemProps {
  task: Task;
}

export const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  const { toggleComplete, deleteTask } = useTaskContext();
  const { theme, styles: themeStyles } = useAppTheme();

  const handleToggleComplete = () => {
    if (Platform.OS === 'ios' || Platform.OS === 'android') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    toggleComplete(task.id);
  };

  const handleDelete = () => {
    if (Platform.OS === 'ios' || Platform.OS === 'android') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
    deleteTask(task.id);
  };

  return (
    <View style={[styles.container, themeStyles.taskItem]}>
      <TouchableOpacity
        style={styles.checkboxContainer}
        onPress={handleToggleComplete}
      >
        <View style={[
          styles.checkbox, 
          { borderColor: theme.primaryButtonBackground },
          task.completed && [styles.checkboxCompleted, { backgroundColor: theme.primaryButtonBackground }]
        ]}>
          {task.completed && (
            <Ionicons name="checkmark" size={18} color="#fff" />
          )}
        </View>
      </TouchableOpacity>
      <View style={styles.contentContainer}>
        <ThemedText
          style={[
            styles.title, 
            { color: theme.text },
            task.completed && styles.completedText
          ]}
          numberOfLines={1}
        >
          {task.title}
        </ThemedText>
        {task.description ? (
          <ThemedText
            style={[
              styles.description, 
              { color: theme.text + 'CC' },
              task.completed && styles.completedText
            ]}
            numberOfLines={2}
          >
            {task.description}
          </ThemedText>
        ) : null}
      </View>
      <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
        <Ionicons name="trash-outline" size={22} color="#ff3b30" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  checkboxContainer: {
    marginRight: 12,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxCompleted: {
    backgroundColor: '#007aff',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
  },
  completedText: {
    textDecorationLine: 'line-through',
    opacity: 0.6,
  },
  deleteButton: {
    padding: 8,
  },
}); 