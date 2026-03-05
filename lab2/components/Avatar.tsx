import { Image, StyleSheet } from 'react-native';

type AvatarProps = {
  source: string;
  size?: number;
};

export default function Avatar({ source, size = 80 }: AvatarProps) {
  return (
    <Image
      source={{ uri: source }}
      style={[
        styles.avatar,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
        },
      ]}
    />
  );
}

const styles = StyleSheet.create({
  avatar: {
    borderWidth: 2,
    borderColor: '#007AFF',
  },
});