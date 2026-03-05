import { View, Text, Image, StyleSheet } from 'react-native';
import Tag from './Tag';

type Recipe = {
  id: string;
  title: string;
  image: string;
  cookTime: number;
  difficulty: string;
  rating: number;
  tags: string[];
};

type Props = {
  recipe: Recipe;
};

export default function RecipeCard({ recipe }: Props) {
  return (
    <View style={styles.card}>

      <Image
        source={{ uri: recipe.image }}
        style={styles.image}
      />

      <View style={styles.content}>
        <Text style={styles.title}>{recipe.title}</Text>

        <Text style={styles.info}>
          ⏱ {recipe.cookTime} min | {recipe.difficulty}
        </Text>

        <Text style={styles.rating}>
          ⭐ {recipe.rating}
        </Text>

        <View style={styles.tagsRow}>
          {recipe.tags.map((tag, index) => (
            <Tag key={index} text={tag} variant="primary" />
          ))}
        </View>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    elevation: 5,
  },

  image: {
    width: '100%',
    height: 200,
  },

  content: {
    padding: 15,
  },

  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },

  info: {
    marginTop: 5,
    color: 'gray',
  },

  rating: {
    marginTop: 5,
  },

  tagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
  },
});