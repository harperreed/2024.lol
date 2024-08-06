import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Linking } from 'react-native';

const Footer = () => {
  const links = [
    { title: 'Built by @harper', url: 'http://twitter.com/harper' },
    { title: 'Help Improve This Page', url: 'https://github.com/harperreed/2024.lol' },
  ];

  const handleLinkPress = (url) => {
    Linking.openURL(url).catch(err => console.error("Couldn't load page", err));
  };

  return (
    <View style={styles.footer}>
      <View style={styles.linksContainer}>
        {links.map((link, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handleLinkPress(link.url)}
            style={styles.linkButton}
          >
            <Text style={styles.linkText}>{link.title}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <Text style={styles.copyright}>
        © 2024 2024.lol - All rights reserved
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    marginTop: 20,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#e5e5e5',
  },
  linksContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  linkButton: {
    marginHorizontal: 5,
    marginVertical: 2,
  },
  linkText: {
    color: '#2563eb',
    fontSize: 14,
  },
  copyright: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    marginTop: 10,
  },
});

export default Footer;
