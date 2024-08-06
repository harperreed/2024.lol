import React from 'react';
import { StyleSheet, View, TouchableOpacity, useWindowDimensions } from 'react-native';
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';

const SocialShareButton = ({ icon, color, onPress }) => (
  <TouchableOpacity style={[styles.button, { backgroundColor: color }]} onPress={onPress}>
    {icon}
  </TouchableOpacity>
);

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
    Linking.openURL(url).catch(err => console.error("Couldn't load page", err));
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
        <SocialShareButton
          key={platform.name}
          icon={platform.icon}
          color={platform.color}
          onPress={() => shareOnPlatform(platform.shareUrl)}
        />
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
  },
  button: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SocialShareButtons;
