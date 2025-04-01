import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, View, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Task, PRIORITY_COLORS, PRIORITY_ICONS } from '../app/types';
import { ThemedText } from './ThemedText';
import { useTaskContext } from '../app/context/TaskContext';
import * as Haptics from 'expo-haptics';
import { useAppTheme } from '@/hooks/useAppTheme';
import Animated, { 
  FadeIn, 
  FadeOut, 
  SlideInRight,
  useAnimatedStyle,
  useSharedValue,
  withSpring
} from 'react-native-reanimated';

interface TaskItemProps {
  task: Task;
  onComplete?: () => void;
}

export const TaskItem: React.FC<TaskItemProps> = ({ task, onComplete }) => {
  const { toggleComplete, deleteTask, archiveTask, categories, showArchived } = useTaskContext();
  const { theme, styles: themeStyles } = useAppTheme();
  const [isDeleting, setIsDeleting] = useState(false);
  const deleteTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  const category = categories.find(cat => cat.id === task.category);
  const checkboxScale = useSharedValue(1);

  // Clean up any pending timeouts when component unmounts
  useEffect(() => {
    return () => {
      if (deleteTimeoutRef.current) {
        clearTimeout(deleteTimeoutRef.current);
      }
    };
  }, []);

  const handleToggleComplete = () => {
    if (Platform.OS === 'ios' || Platform.OS === 'android') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    
    if (!task.completed) {
      checkboxScale.value = withSpring(1.3, {}, () => {
        checkboxScale.value = withSpring(1);
      });
      
      // Toggle immediately to avoid animation issues
      toggleComplete(task.id);
      if (onComplete) onComplete();
    } else {
      toggleComplete(task.id);
    }
  };

  const handleDelete = () => {
    if (isDeleting) return; // Prevent multiple clicks
    
    if (Platform.OS === 'ios' || Platform.OS === 'android') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
    
    // Set deleting state
    setIsDeleting(true);
    
    // Delete directly without animation for web to avoid DOM issues
    deleteTimeoutRef.current = setTimeout(() => {
      try {
        deleteTask(task.id);
      } catch (error) {
        console.error("Error deleting task:", error);
      }
    }, Platform.OS === 'web' ? 10 : 300);
  };

  const handleArchive = () => {
    if (isDeleting) return;
    
    if (Platform.OS === 'ios' || Platform.OS === 'android') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
    
    // Archive immediately
    archiveTask(task.id);
  };

  const checkboxAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: checkboxScale.value }],
    };
  });

  // If we're deleting, don't render the item at all on web
  if (isDeleting && Platform.OS === 'web') {
    return null;
  }

  return (
    <Animated.View 
      style={[styles.container, themeStyles.taskItem]}
      entering={SlideInRight.duration(300)}
      exiting={FadeOut.duration(200)}
    >
      <TouchableOpacity
        style={styles.checkboxContainer}
        onPress={handleToggleComplete}
        disabled={isDeleting}
      >
        <Animated.View 
          style={[
            styles.checkbox, 
            { borderColor: category ? category.color : theme.primaryButtonBackground },
            task.completed && [styles.checkboxCompleted, { backgroundColor: category ? category.color : theme.primaryButtonBackground }],
            checkboxAnimatedStyle
          ]}
        >
          {task.completed && (
            <Animated.View entering={FadeIn.duration(200)}>
              <Ionicons name="checkmark" size={18} color="#fff" />
            </Animated.View>
          )}
        </Animated.View>
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
          <TouchableOpacity 
            style={styles.actionButton} 
            onPress={handleArchive}
            disabled={isDeleting}
          >
            <Animated.View entering={FadeIn}>
              <Ionicons name="archive-outline" size={22} color={theme.text + 'AA'} />
            </Animated.View>
          </TouchableOpacity>
        )}
        <TouchableOpacity 
          style={styles.actionButton} 
          onPress={handleDelete}
          disabled={isDeleting}
        >
          <Animated.View entering={FadeIn}>
            <Ionicons 
              name="trash-outline" 
              size={22} 
              color={isDeleting ? (theme.text + '50') : "#ff3b30"} 
            />
          </Animated.View>
        </TouchableOpacity>
      </View>
    </Animated.View>
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