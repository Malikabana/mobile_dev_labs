import { use, useEffect ,useState} from "react";
import { Button,Text, View, TouchableOpacity,StyleSheet } from "react-native";


export default function Index() {
 const [count, setCount] = useState(0);
  useEffect(() => {
  console.log("Component mounted");
  return () => {
    console.log("Component unmounted");
  }
}, [count]);
  return (
    <View style= {styles.container}>
  <TouchableOpacity style={styles.button} onPress={() => setCount(count + 1)}>
    <Text style={styles.buttonText}>increaaase</Text>
  </TouchableOpacity>
 
  <Text>{count}</Text>
  
  <TouchableOpacity  style={styles.button} onPress={() => setCount(count - 1)}>
    <Text style={styles.buttonText}>decreaseeee</Text>
  </TouchableOpacity>

</View> ) }

 const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    padding: 10,
    backgroundColor: "#007AFF",
    borderRadius: 5,
    margin: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  }
  
});
