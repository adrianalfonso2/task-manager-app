import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useTaskContext } from '../app/context/TaskContext';
import { ThemedText } from './ThemedText';
import { useAppTheme } from '@/hooks/useAppTheme';

export const TaskStats: React.FC = () => {
  const { tasks, showArchived } = useTaskContext();
  const { theme, styles: themeStyles } = useAppTheme();
  
  const completedTasks = tasks.filter(task => task.completed).length;
  const totalTasks = tasks.length;
  const percentComplete = totalTasks > 0 
    ? Math.round((completedTasks / totalTasks) * 100) 
    : 0;

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
          <ThemedText style={[styles.statValue, { color: theme.text }]}>{percentComplete}%</ThemedText>
          <ThemedText style={[styles.statLabel, { color: theme.text }]}>Progress</ThemedText>
        </View>
      </View>
      <View style={[styles.progressBarContainer, { backgroundColor: theme.borderColor }]}>
        <View 
          style={[
            styles.progressBar, 
            { width: `${percentComplete}%`, backgroundColor: theme.primaryButtonBackground }
          ]} 
        />
      </View>
    </View>
  );
};

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