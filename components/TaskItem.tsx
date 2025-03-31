import React from 'react';
import { StyleSheet, TouchableOpacity, View, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Task, PRIORITY_COLORS, PRIORITY_ICONS } from '../app/types';
import { ThemedText } from './ThemedText';
import { useTaskContext } from '../app/context/TaskContext';
import * as Haptics from 'expo-haptics';
import { useAppTheme } from '@/hooks/useAppTheme';

interface TaskItemProps {
  task: Task;
}

export const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  const { toggleComplete, deleteTask, archiveTask, categories, showArchived } = useTaskContext();
  const { theme, styles: themeStyles } = useAppTheme();
  
  const category = categories.find(cat => cat.id === task.category);

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

  const handleArchive = () => {
    if (Platform.OS === 'ios' || Platform.OS === 'android') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
    archiveTask(task.id);
  };

  return (
    <View style={[styles.container, themeStyles.taskItem]}>
      <TouchableOpacity
        style={styles.checkboxContainer}
        onPress={handleToggleComplete}
      >
        <View style={[
          styles.checkbox, 
          { borderColor: category ? category.color : theme.primaryButtonBackground },
          task.completed && [styles.checkboxCompleted, { backgroundColor: category ? category.color : theme.primaryButtonBackground }]
        ]}>
          {task.completed && (
            <Ionicons name="checkmark" size={18} color="#fff" />
          )}
        </View>
      </TouchableOpacity>
      <View style={styles.contentContainer}>
        <View style={styles.titleRow}>
          <View style={styles.titleWithPriority}>
            <Ionicons 
              name={PRIORITY_ICONS[task.priority] as any} 
              size={16} 
              color={PRIORITY_COLORS[task.priority]} 
              style={styles.priorityIcon} 
            />
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
          </View>
          {category && (
            <View 
              style={[
                styles.categoryTag, 
                { backgroundColor: category.color + '20', borderColor: category.color }
              ]}
            >
              <Ionicons name={category.icon as any} size={12} color={category.color} style={styles.categoryIcon} />
              <ThemedText style={[styles.categoryName, { color: category.color }]}>
                {category.name}
              </ThemedText>
            </View>
          )}
        </View>
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
      <View style={styles.actionsContainer}>
        {!showArchived && (
          <TouchableOpacity style={styles.actionButton} onPress={handleArchive}>
            <Ionicons name="archive-outline" size={22} color={theme.text + 'AA'} />
          </TouchableOpacity>
        )}
        <TouchableOpacity style={styles.actionButton} onPress={handleDelete}>
          <Ionicons name="trash-outline" size={22} color="#ff3b30" />
        </TouchableOpacity>
      </View>
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
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  titleWithPriority: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 8,
  },
  priorityIcon: {
    marginRight: 6,
  },
  title: {
    fontSize: 16,
    flex: 1,
  },
  description: {
    fontSize: 14,
  },
  completedText: {
    textDecorationLine: 'line-through',
    opacity: 0.6,
  },
  actionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButton: {
    padding: 8,
  },
  categoryTag: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    borderWidth: 1,
  },
  categoryIcon: {
    marginRight: 4,
  },
  categoryName: {
    fontSize: 10,
    fontWeight: '500',
  },
}); 