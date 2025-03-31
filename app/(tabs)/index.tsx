import React from 'react';
import { StyleSheet, SafeAreaView, View, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { TaskProvider } from '../context/TaskContext';
import { TaskInput } from '@/components/TaskInput';
import { TaskList } from '@/components/TaskList';
import { TaskStats } from '@/components/TaskStats';
import { ThemedText } from '@/components/ThemedText';
import { ThemeToggle } from '@/components/ThemeToggle';
import { useAppTheme } from '@/hooks/useAppTheme';

export default function TaskScreen() {
  const { styles: themeStyles, theme, colorScheme } = useAppTheme();

  return (
    <TaskProvider>
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
            <ThemeToggle />
          </View>
        </View>
        <TaskInput />
        <TaskStats />
        <TaskList />
      </SafeAreaView>
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
  logo: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
});
