import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView, useWindowDimensions, TouchableOpacity, Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Countdown from './components/Countdown';
import ActionCard from './components/ActionCard';
import { Ionicons } from '@expo/vector-icons';
import SocialShareButtons from './components/SocialShareButtons';
import Footer from './components/Footer';

const BREAKPOINT_MOBILE = 600;

export default function App() {
  const { width, height } = useWindowDimensions();
  const isMobile = width < BREAKPOINT_MOBILE;
  const [countdownData, setCountdownData] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    if (Platform.OS === 'web') {
      const handleFullscreenChange = () => {
        setIsFullscreen(!!document.fullscreenElement);
      };

      document.addEventListener('fullscreenchange', handleFullscreenChange);
      return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
    }
  }, []);

  const toggleFullscreen = () => {
    if (Platform.OS === 'web') {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        }
      }
    }
  };

  const actions = [
    {
      title: 'Donate',
      text: 'Support the Vice President Kamala Harris campaign.',
      url: 'https://secure.actblue.com/donate/web-hfp-august-2024',
      imageSource: require('./assets/images/donate.webp'),
    },
    {
      title: 'Volunteer',
      text: 'Help Vice President Kamala Harris win the election.',
      url: 'https://web.kamalaharris.com/forms/take-action-for-kamala-harris/?source=web_an_takeactionpage_20240726',
      imageSource: require('./assets/images/volunteer.webp'),
    },
    {
      title: 'Vote',
      text: 'Speak up for Democracy.',
      url: 'https://www.google.com/search?q=register%20to%20vote',
      imageSource: require('./assets/images/vote.webp'),
    },
  ];

  const renderActionCards = () => {
    return (
      <View style={styles.actionCardsContainer}>
        {actions.map((action, index) => (
          <ActionCard
            key={index}
            {...action}
          />
        ))}
      </View>
    );
  };

  return (
    <View style={[styles.container, isFullscreen && styles.fullscreenContainer]}>
      <StatusBar style="auto" />
      {isFullscreen ? (
        <View style={styles.fullscreenCountdown}>
          <Countdown onCountdownUpdate={setCountdownData} isFullscreen={isFullscreen} />
          <TouchableOpacity style={styles.exitFullscreenButton} onPress={toggleFullscreen}>
            <Text style={styles.exitFullscreenText}>Exit Fullscreen</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <ScrollView contentContainerStyle={[
          styles.scrollContent,
          isMobile ? styles.scrollContentMobile : styles.scrollContentDesktop
        ]}>
          <View style={styles.countdownSection}>
            <Countdown onCountdownUpdate={setCountdownData} isFullscreen={isFullscreen} />
            <Text style={styles.subtitle}>Election day is November 5, 2024, 9:00 AM</Text>
            {!isMobile && Platform.OS === 'web' && (
              <TouchableOpacity style={styles.fullscreenButton} onPress={toggleFullscreen}>
              <Ionicons name="expand-outline" size={24} color="white" />
                <Text style={styles.fullscreenButtonText}>Enter Fullscreen</Text>
              </TouchableOpacity>
            )}
          </View>
          <View style={styles.contentSection}>
            <Text style={styles.sectionTitle}>What can I do to help?</Text>
            {renderActionCards()}
            <Text style={styles.sectionTitle}>Share</Text>
            <SocialShareButtons days={countdownData.days} hours={countdownData.hours} />
            <Footer />
          </View>
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
  },
  fullscreenContainer: {
    backgroundColor: '#000',
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
  fullscreenButton: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 10,
      padding: 10,
      backgroundColor: '#2563eb',
      borderRadius: 5,
    },
    fullscreenButtonText: {
      color: 'white',
      fontWeight: 'bold',
      marginLeft: 5,
    },
  fullscreenCountdown: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  exitFullscreenButton: {
    position: 'absolute',
    bottom: 20,
    padding: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 5,
  },
  exitFullscreenText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
