import React from 'react';
import { StyleSheet, TouchableOpacity, View, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ThemedText } from './ThemedText';
import { useTaskContext } from '../app/context/TaskContext';
import { useAppTheme } from '@/hooks/useAppTheme';

interface CategoryFilterProps {
  selectedFilter: string | null;
  onSelectFilter: (categoryId: string | null) => void;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  selectedFilter,
  onSelectFilter,
}) => {
  const { categories } = useTaskContext();
  const { theme } = useAppTheme();

  return (
    <View style={[styles.container, { borderBottomColor: theme.borderColor, borderBottomWidth: StyleSheet.hairlineWidth }]}>
      <ThemedText style={[styles.label, { color: theme.text + 'CC' }]}>
        Filter by:
      </ThemedText>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false} 
        contentContainerStyle={styles.categoriesContainer}
      >
        <TouchableOpacity
          style={[
            styles.categoryButton,
            { 
              backgroundColor: selectedFilter === null 
                ? theme.primaryButtonBackground 
                : theme.primaryButtonBackground + '20',
              borderColor: theme.primaryButtonBackground,
            },
          ]}
          onPress={() => onSelectFilter(null)}
        >
          <Ionicons
            name="layers-outline"
            size={16}
            color={selectedFilter === null ? '#fff' : theme.primaryButtonBackground}
            style={styles.categoryIcon}
          />
          <ThemedText
            style={[
              styles.categoryName,
              { color: selectedFilter === null ? '#fff' : theme.primaryButtonBackground },
            ]}
          >
            All
          </ThemedText>
        </TouchableOpacity>

        {categories.map((category) => (
          <TouchableOpacity
            key={category.id}
            style={[
              styles.categoryButton,
              { 
                backgroundColor: selectedFilter === category.id 
                  ? category.color 
                  : category.color + '20',
                borderColor: category.color,
              },
            ]}
            onPress={() => onSelectFilter(category.id)}
          >
            <Ionicons
              name={category.icon as any}
              size={16}
              color={selectedFilter === category.id ? '#fff' : category.color}
              style={styles.categoryIcon}
            />
            <ThemedText
              style={[
                styles.categoryName,
                { color: selectedFilter === category.id ? '#fff' : category.color },
              ]}
            >
              {category.name}
            </ThemedText>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 12,
  },
  label: {
    fontSize: 14,
    marginBottom: 8,
  },
  categoriesContainer: {
    paddingVertical: 4,
  },
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginRight: 10,
    borderWidth: 1,
  },
  categoryIcon: {
    marginRight: 4,
  },
  categoryName: {
    fontSize: 14,
    fontWeight: '500',
  },
}); 