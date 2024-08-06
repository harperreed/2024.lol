import React from 'react';
import { StyleSheet, View, Text, ImageBackground, TouchableOpacity, useWindowDimensions } from 'react-native';

const ActionCard = ({ title, text, url, imageSource, onPress }) => {
  const { width } = useWindowDimensions();
  const isMobile = width < 600;

  return (
    <TouchableOpacity style={[styles.card, isMobile && styles.cardMobile]} onPress={onPress}>
      <ImageBackground
        source={imageSource}
        style={styles.backgroundImage}
        imageStyle={[styles.backgroundImageStyle, { resizeMode: 'cover' }]}
      >
        <View style={styles.overlay}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.text}>{text}</Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    height: 180,
    width: '32%',
    marginBottom: 20,
    borderRadius: 10,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 10,

  },
  cardMobile: {
    width: '100%',
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
  },
  backgroundImageStyle: {
    borderRadius: 10,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 10,
    justifyContent: 'flex-end',
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
