import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Linking, useWindowDimensions, Platform } from 'react-native';
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import { A } from '@expo/html-elements';

const SocialShareButton = ({ icon, color, name, onPress, url }) => {
  const ButtonComponent = Platform.OS === 'web' ? A : TouchableOpacity;

  return (
    <ButtonComponent
      style={[styles.button, { backgroundColor: color }]}
      onPress={Platform.OS !== 'web' ? onPress : undefined}
      href={Platform.OS === 'web' ? url : undefined}
      target="_blank"
      rel="noopener noreferrer"
    >
      {icon}
      <Text style={styles.buttonText}>{name}</Text>
    </ButtonComponent>
  );
};

const SocialShareButtons = ({ days, hours }) => {
  const windowWidth = useWindowDimensions().width;
  const isMobile = windowWidth < 600;

  const getShareText = () => {
    if (days > 0) {
      return `The election is coming: ${days} day${days > 1 ? 's' : ''} left - Get involved now!`;
    } else {
      return `The election is coming: ${hours} hour${hours > 1 ? 's' : ''} left - Get involved now!`;
    }
  };

  const shareText = getShareText();
  const shareUrl = "https://2024.lol";

  const shareOnPlatform = (url) => {
    if (Platform.OS === 'web') {
      window.open(url, '_blank');
    } else {
      Linking.openURL(url).catch(err => console.error("Couldn't load page", err));
    }
  };

  const socialPlatforms = [
    {
      name: 'Twitter',
      color: '#1DA1F2',
      icon: <FontAwesome name="twitter" size={24} color="white" />,
      shareUrl: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
    },
    {
      name: 'Bluesky',
      color: '#0560ff',
      icon: <MaterialCommunityIcons name="butterfly" size={24} color="white" />,
      shareUrl: `https://bsky.app/intent/compose?text=${encodeURIComponent(shareText + " " + shareUrl)}`,
    },
    {
      name: 'Threads',
      color: '#000000',
      icon: <FontAwesome name="at" size={24} color="white" />,
      shareUrl: `https://www.threads.net/intent/post?text=${encodeURIComponent(shareText + " " + shareUrl)}`,
    },
    {
      name: 'Mastodon',
      color: '#6364FF',
      icon: <MaterialCommunityIcons name="elephant" size={24} color="white" />,
      shareUrl: `https://mastodon.social/share?text=${encodeURIComponent(shareText + " " + shareUrl)}`,
    },
  ];

  const renderButtons = () => {
    const buttonRows = [];
    const buttonsPerRow = isMobile ? 2 : 4;

    for (let i = 0; i < socialPlatforms.length; i += buttonsPerRow) {
      const rowButtons = socialPlatforms.slice(i, i + buttonsPerRow).map((platform) => (
        <View key={platform.name} style={styles.buttonWrapper}>
          <SocialShareButton
            icon={platform.icon}
            color={platform.color}
            name={platform.name}
            onPress={() => shareOnPlatform(platform.shareUrl)}
            url={platform.shareUrl}
          />
        </View>
      ));

      buttonRows.push(
        <View key={i} style={styles.row}>
          {rowButtons}
        </View>
      );
    }

    return buttonRows;
  };

  return (
    <View style={styles.container}>
      {renderButtons()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    flexWrap: 'wrap',
  },
  buttonWrapper: {
    flexBasis: '48%',
    marginBottom: 10,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 8,
    minWidth: 120,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    textDecoration: 'none',
  },
  buttonText: {
    color: 'white',
    marginLeft: 8,
    fontWeight: 'bold',
  },
});

export default SocialShareButtons;
