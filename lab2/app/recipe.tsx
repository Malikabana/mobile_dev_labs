import { ScrollView, StyleSheet } from 'react-native';
import RecipeCard from '../components/RecipeCard';

const RECIPES = [
  {
    id: '1',
    title: 'Spaghetti',
    image: 'https://picsum.photos/400',
    cookTime: 25,
    difficulty: 'Medium',   // ← ADD THIS
    rating: 4.5,
    tags: ['Italian', 'Quick'],
  },
];

export default function Recipe() {
  return (
    <ScrollView style={styles.container}>
      {RECIPES.map(recipe => (
        <RecipeCard key={recipe.id} recipe={recipe} />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#f2f2f2',
  },
});