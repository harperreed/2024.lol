import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, Linking, useWindowDimensions } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Countdown from './components/Countdown';
import ActionCard from './components/ActionCard';
import SocialShareButtons from './components/SocialShareButtons';
import Footer from './components/Footer';

const BREAKPOINT_MOBILE = 600; // Define breakpoint for mobile devices

export default function App() {
  const { width } = useWindowDimensions();
  const isMobile = width < BREAKPOINT_MOBILE;
  const [countdownData, setCountdownData] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  const actions = [
    {
      title: 'Donate',
      text: 'Support the Vice President Kamala Harris campaign.',
      url: 'https://secure.actblue.com/donate/web-hfp-august-2024',
      imageSource: require('./assets/images/donate.jpg'),
    },
    {
      title: 'Volunteer',
      text: 'Help Vice President Kamala Harris win the election.',
      url: 'https://web.kamalaharris.com/forms/take-action-for-kamala-harris/?source=web_an_takeactionpage_20240726',
      imageSource: require('./assets/images/volunteer.jpg'),
    },
    {
      title: 'Vote',
      text: 'Speak up for Democracy.',
      url: 'https://www.google.com/search?q=register%20to%20vote',
      imageSource: require('./assets/images/vote.jpg'),
    },
  ];

  const renderActionCards = () => {
    return (
      <View style={styles.actionCardsContainer}>
        {actions.map((action, index) => (
          <ActionCard
            key={index}
            {...action}
            onPress={() => Linking.openURL(action.url)}
          />
        ))}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <ScrollView contentContainerStyle={[
        styles.scrollContent,
        isMobile ? styles.scrollContentMobile : styles.scrollContentDesktop
      ]}>
        <View style={styles.countdownSection}>
          <Countdown onCountdownUpdate={setCountdownData} />
          <Text style={styles.subtitle}>Election day is November 5, 2024, 9:00 AM</Text>
        </View>
        <View style={styles.contentSection}>
          <Text style={styles.sectionTitle}>What can I do to help?</Text>
          {renderActionCards()}
          <Text style={styles.sectionTitle}>Share</Text>
          <SocialShareButtons days={countdownData.days} hours={countdownData.hours} />
          <Footer />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
  },
  scrollContent: {
    flexGrow: 1,
  },
  scrollContentMobile: {
    padding: 0,
  },
  scrollContentDesktop: {
    padding: 20,
  },
  countdownSection: {
    alignItems: 'center',
    marginBottom: 30,
    // paddingTop: 20,
  },
  contentSection: {
    padding: 20,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  actionCardsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
});
