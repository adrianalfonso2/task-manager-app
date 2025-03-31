import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { useTaskContext } from '../app/context/TaskContext';
import { TaskItem } from './TaskItem';
import { ThemedText } from './ThemedText';
import { useAppTheme } from '@/hooks/useAppTheme';

export const TaskList: React.FC = () => {
  const { tasks } = useTaskContext();
  const { theme, styles: themeStyles } = useAppTheme();

  if (tasks.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <ThemedText style={[styles.emptyText, { color: theme.text }]}>
          No tasks yet. Add a task to get started!
        </ThemedText>
      </View>
    );
  }

  return (
    <FlatList
      data={tasks}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <TaskItem task={item} />}
      contentContainerStyle={styles.listContent}
    />
  );
};

const styles = StyleSheet.create({
  listContent: {
    flexGrow: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  emptyText: {
    fontSize: 16,
    textAlign: 'center',
    opacity: 0.6,
  },
}); 