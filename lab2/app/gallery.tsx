import { View, Image, StyleSheet, useWindowDimensions, ScrollView } from 'react-native';

export default function Gallery() {
  const { width } = useWindowDimensions();
  const columns = width < 400 ? 2 : width < 800 ? 3 : 4;
  const itemSize = width / columns - 15;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {Array.from({ length: 12 }).map((_, index) => (
        <Image
          key={index}
          source={{ uri: 'https://picsum.photos/300' }}
          style={{ width: itemSize, height: itemSize, margin: 5 }}
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container:{ flexDirection:'row', flexWrap:'wrap', justifyContent:'center' }
});