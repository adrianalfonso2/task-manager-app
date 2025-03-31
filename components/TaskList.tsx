import React, { useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { useTaskContext } from '../app/context/TaskContext';
import { TaskItem } from './TaskItem';
import { ThemedText } from './ThemedText';
import { useAppTheme } from '@/hooks/useAppTheme';
import { CategoryFilter } from './CategoryFilter';

export const TaskList: React.FC = () => {
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const { tasks, showArchived } = useTaskContext();
  const { theme, styles: themeStyles } = useAppTheme();

  const filteredTasks = categoryFilter
    ? tasks.filter(task => task.category === categoryFilter)
    : tasks;

  const renderEmptyList = () => (
    <View style={styles.emptyContainer}>
      <ThemedText style={[styles.emptyText, { color: theme.text }]}>
        {showArchived 
          ? (categoryFilter
            ? "No archived tasks in this category."
            : "No archived tasks yet.")
          : (categoryFilter
            ? "No tasks in this category. Add a task with this category to see it here!"
            : "No tasks yet. Add a task to get started!")}
      </ThemedText>
    </View>
  );

  return (
    <View style={{ flex: 1 }}>
      <CategoryFilter
        selectedFilter={categoryFilter}
        onSelectFilter={setCategoryFilter}
      />
      
      {filteredTasks.length === 0 ? (
        renderEmptyList()
      ) : (
        <FlatList
          data={filteredTasks}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <TaskItem task={item} />}
          contentContainerStyle={styles.listContent}
        />
      )}
    </View>
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