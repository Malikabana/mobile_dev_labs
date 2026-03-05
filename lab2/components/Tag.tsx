import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

type TagProps = {
  text: string;
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger';
  onPress?: () => void;
};

const colors = {
  default: { bg: '#e0e0e0', text: '#666' },
  primary: { bg: '#007AFF', text: '#fff' },
  success: { bg: '#34C759', text: '#fff' },
  warning: { bg: '#FF9500', text: '#fff' },
  danger: { bg: '#FF3B30', text: '#fff' },
};

export default function Tag({ text, variant = 'default', onPress }: TagProps) {
  const selectedColor = colors[variant];

  return (
    <TouchableOpacity
      style={[
        styles.tag,
        { backgroundColor: selectedColor.bg },
      ]}
      onPress={onPress}
    >
      <Text style={{ color: selectedColor.text }}>
        {text}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  tag: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    margin: 5,
  },
});