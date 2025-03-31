import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTaskContext } from '../app/context/TaskContext';
import { useAppTheme } from '@/hooks/useAppTheme';

export const ArchiveButton: React.FC = () => {
  const { showArchived, toggleShowArchived } = useTaskContext();
  const { theme } = useAppTheme();

  return (
    <TouchableOpacity
      style={styles.button}
      onPress={toggleShowArchived}
      accessibilityLabel={showArchived ? 'Switch to active tasks' : 'Switch to archived tasks'}
    >
      <Ionicons
        name={showArchived ? "list" : "archive"}
        size={24}
        color={theme.text}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 8,
    marginRight: 8,
  },
}); 