import React from 'react';
import { StyleSheet, View, Text, ImageBackground, TouchableOpacity } from 'react-native';

const ActionCard = ({ title, text, url, imageUrl, onPress }) => (
  <TouchableOpacity style={styles.card} onPress={onPress}>
    <ImageBackground source={{ uri: imageUrl }} style={styles.backgroundImage} imageStyle={styles.backgroundImageStyle}>
      <View style={styles.overlay}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.text}>{text}</Text>
      </View>
    </ImageBackground>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  card: {
    height: 180,
    flex: 1,
    margin: 5,
    borderRadius: 10,
    overflow: 'hidden',
  },
  backgroundImage: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  backgroundImageStyle: {
    borderRadius: 10,
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
  },
  text: {
    fontSize: 12,
    color: 'white',
  },
});

export default ActionCard;
