// TaskStats.tsx
// A component that displays task completion statistics with a progress bar
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useTaskContext } from '../app/context/TaskContext';
import { ThemedText } from './ThemedText';
import { useAppTheme } from '@/hooks/useAppTheme';

// TaskStats component that shows completion progress
export const TaskStats: React.FC = () => {
  // Get tasks from context and current theme
  const { tasks, showArchived } = useTaskContext();
  const { theme, styles: themeStyles } = useAppTheme();
  
  // Calculate task statistics
  const completedTasks = tasks.filter(task => task.completed).length;
  const totalTasks = tasks.length;
  const percentage = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  return (
    <View style={[styles.container, themeStyles.card]}>
      <ThemedText style={[styles.title, { color: theme.text }]}>
        {showArchived ? 'Archive' : 'Active Tasks'}
      </ThemedText>
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <ThemedText style={[styles.statValue, { color: theme.text }]}>{totalTasks}</ThemedText>
          <ThemedText style={[styles.statLabel, { color: theme.text }]}>Total</ThemedText>
        </View>
        <View style={styles.statItem}>
          <ThemedText style={[styles.statValue, { color: theme.text }]}>{completedTasks}</ThemedText>
          <ThemedText style={[styles.statLabel, { color: theme.text }]}>Completed</ThemedText>
        </View>
        <View style={styles.statItem}>
          <ThemedText style={[styles.statValue, { color: theme.text }]}>{Math.round(percentage)}%</ThemedText>
          <ThemedText style={[styles.statLabel, { color: theme.text }]}>Progress</ThemedText>
        </View>
      </View>
      <View style={[styles.progressBarContainer, { backgroundColor: theme.borderColor }]}>
        <View 
          style={[
            styles.progressBar, 
            { width: `${percentage}%`, backgroundColor: theme.primaryButtonBackground }
          ]} 
        />
      </View>
    </View>
  );
};

// Styles for the task stats component
const styles = StyleSheet.create({
  container: {
    padding: 16,
    margin: 16,
    marginTop: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    textAlign: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    opacity: 0.7,
  },
  progressBarContainer: {
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
  },
}); 