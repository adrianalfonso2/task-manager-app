import React from 'react';
import { StyleSheet, SafeAreaView, View, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { TaskProvider, useTaskContext } from '../context/TaskContext';
import { TaskInput } from '@/components/TaskInput';
import { TaskList } from '@/components/TaskList';
import { TaskStats } from '@/components/TaskStats';
import { ThemedText } from '@/components/ThemedText';
import { ThemeToggle } from '@/components/ThemeToggle';
import { ArchiveButton } from '@/components/ArchiveButton';
import { useAppTheme } from '@/hooks/useAppTheme';

const TaskScreenContent = () => {
  const { showArchived } = useTaskContext();
  const { styles: themeStyles, theme } = useAppTheme();

  return (
    <SafeAreaView style={themeStyles.container}>
      <StatusBar style={theme.statusBarStyle} />
      <View style={styles.header}>
        <View style={styles.headerRow}>
          <View style={styles.titleContainer}>
            <Image 
              source={require('@/assets/images/task-manager-logo.png')} 
              style={styles.logo} 
              resizeMode="contain"
            />
            <ThemedText type="title" style={{ color: theme.text }}>Task Manager</ThemedText>
          </View>
          <View style={styles.actionsContainer}>
            <ArchiveButton />
            <ThemeToggle />
          </View>
        </View>
      </View>
      {!showArchived && <TaskInput />}
      <TaskStats />
      <TaskList />
    </SafeAreaView>
  );
};

export default function TaskScreen() {
  return (
    <TaskProvider>
      <TaskScreenContent />
    </TaskProvider>
  );
}

const styles = StyleSheet.create({
  header: {
    padding: 16,
    paddingTop: 24,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
});
