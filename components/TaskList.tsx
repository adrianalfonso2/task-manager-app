import React, { useState, useCallback } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { useTaskContext } from '../app/context/TaskContext';
import { TaskItem } from './TaskItem';
import { ThemedText } from './ThemedText';
import { useAppTheme } from '@/hooks/useAppTheme';
import { CategoryFilter } from './CategoryFilter';
import { Celebration } from './Celebration';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

export const TaskList: React.FC = () => {
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const [showCelebration, setShowCelebration] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const { tasks, showArchived } = useTaskContext();
  const { theme } = useAppTheme();

  const filteredTasks = categoryFilter
    ? tasks.filter(task => task.category === categoryFilter)
    : tasks;

  const handleTaskComplete = useCallback(() => {
    // This prevents multiple celebrations from triggering at once
    if (!showCelebration && !isAnimating) {
      setShowCelebration(true);
      setIsAnimating(true);
    }
  }, [showCelebration, isAnimating]);

  const handleCelebrationComplete = useCallback(() => {
    setShowCelebration(false);
    // This will give a short delay before allowing new animations
    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  }, []);

  const handleSelectCategory = useCallback((categoryId: string | null) => {
    setCategoryFilter(categoryId);
  }, []);

  const renderEmptyList = () => (
    <Animated.View 
      style={styles.emptyContainer}
      entering={FadeIn.duration(400)}
      exiting={FadeOut.duration(300)}
    >
      <ThemedText style={[styles.emptyText, { color: theme.text }]}>
        {showArchived 
          ? (categoryFilter
            ? "No archived tasks in this category."
            : "No archived tasks yet.")
          : (categoryFilter
            ? "No tasks in this category. Add a task with this category to see it here!"
            : "No tasks yet. Add a task to get started!")}
      </ThemedText>
    </Animated.View>
  );

  return (
    <View style={{ flex: 1 }}>
      <Celebration show={showCelebration} onComplete={handleCelebrationComplete} />
      
      <CategoryFilter
        selectedFilter={categoryFilter}
        onSelectFilter={handleSelectCategory}
      />
      
      {filteredTasks.length === 0 ? (
        renderEmptyList()
      ) : (
        <FlatList
          data={filteredTasks}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <TaskItem task={item} onComplete={handleTaskComplete} />}
          contentContainerStyle={styles.listContent}
          removeClippedSubviews={false} // This helps with animation issues
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