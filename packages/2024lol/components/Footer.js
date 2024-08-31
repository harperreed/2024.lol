import React from 'react';
import { StyleSheet, View, Text, Platform } from 'react-native';
import { A } from '@expo/html-elements';

const Footer = () => {
  const links = [
    { title: 'Built by @harper', url: 'http://twitter.com/harper' },
    { title: 'Help Improve This Page', url: 'https://github.com/harperreed/2024.lol' },
  ];

  const LinkComponent = Platform.OS === 'web' ? A : Text;

  return (
    <View style={styles.footer}>
      <View style={styles.linksContainer}>
        {links.map((link, index) => (
          <LinkComponent
            key={index}
            href={Platform.OS === 'web' ? link.url : undefined}
            style={styles.linkText}
            target="_blank"
            rel="noopener noreferrer"
          >
            {link.title}
          </LinkComponent>
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
  linkText: {
    color: '#2563eb',
    fontSize: 14,
    marginHorizontal: 5,
    marginVertical: 2,
    textDecoration: 'none',
  },
  copyright: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    marginTop: 10,
  },
});

export default Footer;
