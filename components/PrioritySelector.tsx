import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ThemedText } from './ThemedText';
import { useAppTheme } from '@/hooks/useAppTheme';
import { PRIORITY_COLORS, PRIORITY_ICONS, PriorityType } from '@/app/types';

interface PrioritySelectorProps {
  selectedPriority: PriorityType;
  onSelectPriority: (priority: PriorityType) => void;
}

export const PrioritySelector: React.FC<PrioritySelectorProps> = ({
  selectedPriority,
  onSelectPriority,
}) => {
  const { theme } = useAppTheme();
  const priorities: PriorityType[] = ['low', 'medium', 'high'];

// This is the priority selector component that allows the user to select the priority of a task

  return (
    <View style={[styles.container, { borderBottomColor: theme.borderColor, borderBottomWidth: StyleSheet.hairlineWidth }]}>
      <ThemedText style={[styles.label, { color: theme.text + '99' }]}>
        Priority:
      </ThemedText>
      <View style={styles.prioritiesContainer}>
        {priorities.map((priority) => (
          <TouchableOpacity
            key={priority}
            style={[
              styles.priorityButton,
              { 
                backgroundColor: selectedPriority === priority 
                  ? PRIORITY_COLORS[priority] 
                  : PRIORITY_COLORS[priority] + '20',
                borderColor: PRIORITY_COLORS[priority],
              },
            ]}
            onPress={() => onSelectPriority(priority)}
          >
            <Ionicons
              name={PRIORITY_ICONS[priority] as any}
              size={16}
              color={selectedPriority === priority ? '#fff' : PRIORITY_COLORS[priority]}
              style={styles.priorityIcon}
            />
            <ThemedText
              style={[
                styles.priorityName,
                { color: selectedPriority === priority ? '#fff' : PRIORITY_COLORS[priority] },
              ]}
            >
              {priority.charAt(0).toUpperCase() + priority.slice(1)}
            </ThemedText>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

// These are the styles for the priority selector component

const styles = StyleSheet.create({
  container: {
    padding: 12,
  },
  label: {
    fontSize: 14,
    marginBottom: 8,
  },
  prioritiesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
  priorityButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    flex: 1,
    marginHorizontal: 4,
    justifyContent: 'center',
  },
  priorityIcon: {
    marginRight: 4,
  },
  priorityName: {
    fontSize: 14,
    fontWeight: '500',
  },
}); 