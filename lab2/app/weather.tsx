import { View, Text, StyleSheet } from 'react-native';

export default function Weather() {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.city}>Dakar</Text>
        <Text style={styles.temp}>32°</Text>
        <Text>☀️ Sunny</Text>
        <View style={styles.row}>
          <Text>H: 35°</Text>
          <Text>L: 25°</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex:1, justifyContent:'center', alignItems:'center', backgroundColor:'#87CEEB' },
  card:{ backgroundColor:'white', padding:20, borderRadius:15, width:300, alignItems:'center', elevation:5 },
  city:{ fontSize:28, fontWeight:'bold' },
  temp:{ fontSize:70, fontWeight:'bold' },
  row:{ flexDirection:'row', justifyContent:'space-between', width:'100%', marginTop:10 }
});