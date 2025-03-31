import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ThemedText } from './ThemedText';
import { useTaskContext } from '../app/context/TaskContext';
import { useAppTheme } from '@/hooks/useAppTheme';

export const ArchiveToggle: React.FC = () => {
  const { showArchived, toggleShowArchived } = useTaskContext();
  const { theme } = useAppTheme();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[
          styles.button,
          {
            backgroundColor: !showArchived ? theme.primaryButtonBackground : 'transparent',
            borderColor: theme.primaryButtonBackground,
          },
        ]}
        onPress={toggleShowArchived}
        accessibilityLabel={!showArchived ? 'View active tasks' : 'Switch to active tasks'}
      >
        <Ionicons
          name="list"
          size={16}
          color={!showArchived ? '#fff' : theme.primaryButtonBackground}
          style={styles.icon}
        />
        <ThemedText
          style={[
            styles.text,
            { color: !showArchived ? '#fff' : theme.primaryButtonBackground },
          ]}
        >
          Active
        </ThemedText>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.button,
          {
            backgroundColor: showArchived ? theme.primaryButtonBackground : 'transparent',
            borderColor: theme.primaryButtonBackground,
          },
        ]}
        onPress={toggleShowArchived}
        accessibilityLabel={showArchived ? 'View archived tasks' : 'Switch to archived tasks'}
      >
        <Ionicons
          name="archive"
          size={16}
          color={showArchived ? '#fff' : theme.primaryButtonBackground}
          style={styles.icon}
        />
        <ThemedText
          style={[
            styles.text,
            { color: showArchived ? '#fff' : theme.primaryButtonBackground },
          ]}
        >
          Archived
        </ThemedText>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 12,
    justifyContent: 'center',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    marginHorizontal: 4,
    minWidth: 110,
  },
  icon: {
    marginRight: 6,
  },
  text: {
    fontSize: 14,
    fontWeight: '500',
  },
}); 