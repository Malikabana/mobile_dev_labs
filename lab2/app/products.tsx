import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { router } from 'expo-router';

const PRODUCTS = [
  { id: '1', name: 'iPhone 16', price: 1200 },
  { id: '2', name: 'MacBook Pro', price: 2500 },
  { id: '3', name: 'AirPods', price: 300 },
];

export default function Products() {
  return (
    <View style={styles.container}>
      {PRODUCTS.map(product => (
        <TouchableOpacity
          key={product.id}
          style={styles.card}
          onPress={() =>
            router.push({ 
              pathname: '/product-details',
              params: {
                id: product.id,
                name: product.name,
                price: product.price,
              },
            })
          }
        >
          <Text style={styles.name}>{product.name}</Text>
          <Text>${product.price}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f2f2f2',
  },
  card: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 3,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
  },
});