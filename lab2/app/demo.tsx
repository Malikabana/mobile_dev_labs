import { View, StyleSheet } from 'react-native';
import Avatar from '../components/Avatar';
import Tag from '../components/Tag';
import StatCard from '../components/StatCard';

export default function Demo() {
  return (
    <View style={styles.container}>
      <Avatar source="https://i.pravatar.cc/150?img=12" size={100} />
      <Tag text="Primary Tag" />
      <StatCard value="2,847" label="Total Users" icon="👥" change={12} />
    </View>
  );
}

const styles = StyleSheet.create({
  container:{ flex:1, justifyContent:'center', alignItems:'center', backgroundColor:'#f2f2f2' }
});