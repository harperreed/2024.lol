import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, useWindowDimensions } from 'react-native';

const ELECTION_DATE = new Date(2024, 10, 5, 9, 0, 0);

const Countdown = ({ onCountdownUpdate, isFullscreen }) => {
  const [timeLeft, setTimeLeft] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { width, height } = useWindowDimensions();
  const isMobile = width < 600;

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = ELECTION_DATE - now;

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / 1000 / 60) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      return { days, hours, minutes, seconds };
    };

    const updateCountdown = () => {
      const newTimeLeft = calculateTimeLeft();
      setTimeLeft(newTimeLeft);
      onCountdownUpdate(newTimeLeft);
      setIsLoading(false);
    };

    updateCountdown();
    const timer = setInterval(updateCountdown, 1000);

    return () => clearInterval(timer);
  }, [onCountdownUpdate]);

  const renderMainUnit = () => {
    if (!timeLeft) return null;
    if (timeLeft.days > 0) {
      return (
        <Text style={[styles.mainUnit, isFullscreen && styles.fullscreenMainUnit]}>
          {timeLeft.days} <Text style={[styles.unitLabel, isFullscreen && styles.fullscreenUnitLabel]}>day{timeLeft.days !== 1 ? 's' : ''}</Text>
        </Text>
      );
    } else {
      return (
        <Text style={[styles.mainUnit, isFullscreen && styles.fullscreenMainUnit]}>
          {timeLeft.hours} <Text style={[styles.unitLabel, isFullscreen && styles.fullscreenUnitLabel]}>hour{timeLeft.hours !== 1 ? 's' : ''}</Text>
        </Text>
      );
    }
  };

  const renderSubUnits = () => {
    if (!timeLeft) return null;
    if (timeLeft.days > 0) {
      return isMobile ? (
        <View style={styles.subUnitsContainerMobile}>
          <Text style={[styles.subUnitMobile, isFullscreen && styles.fullscreenSubUnit]}>{timeLeft.hours} hours</Text>
          <Text style={[styles.subUnitMobile, isFullscreen && styles.fullscreenSubUnit]}>{timeLeft.minutes} minutes</Text>
          <Text style={[styles.subUnitMobile, isFullscreen && styles.fullscreenSubUnit]}>{timeLeft.seconds} seconds</Text>
        </View>
      ) : (
        <Text style={[styles.subUnits, isFullscreen && styles.fullscreenSubUnit]}>
          {timeLeft.hours} hours, {timeLeft.minutes} minutes, {timeLeft.seconds} seconds
        </Text>
      );
    } else {
      return isMobile  ? (
        <View style={styles.subUnitsContainerMobile}>
          <Text style={[styles.subUnitMobile, isFullscreen && styles.fullscreenSubUnit]}>{timeLeft.minutes} minutes</Text>
          <Text style={[styles.subUnitMobile]}>{timeLeft.seconds} seconds</Text>
        </View>
      ) : (
        <Text style={[styles.subUnits, isFullscreen && styles.fullscreenSubUnit]}>
          {timeLeft.minutes} minutes, {timeLeft.seconds} seconds
        </Text>
      );
    }
  };

  if (isLoading) {
    return (
      <View style={[styles.container, isMobile && styles.containerMobile, isFullscreen && styles.fullscreenContainer]}>
        <ActivityIndicator size="large" color="#2563eb" />
      </View>
    );
  }

  return (
    <View style={[styles.container, isMobile && styles.containerMobile, isFullscreen && styles.fullscreenContainer]}>
      <View style={[styles.content, isMobile && styles.contentMobile, isFullscreen && styles.fullscreenContent]}>
        {renderMainUnit()}
        {renderSubUnits()}
         {!isFullscreen && <Text style={styles.title}>Until Election Day</Text>}
          {isFullscreen && <Text style={styles.fullScreenTitle}>Until Election Day</Text>}
          {isFullscreen && <Text style={styles.fullScreenSubTitle}>Let's go!</Text>}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  containerMobile: {
    borderRadius: 0,
    shadowColor: 'transparent',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
    paddingTop: 10,
    paddingBottom: 10,
    marginBottom: 10,
    width: '100%',
  },
  fullscreenContainer: {
    backgroundColor: 'transparent',
    shadowColor: 'transparent',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  content: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 200,
  },
  contentMobile: {
    paddingLeft: 0,
    paddingRight: 0,
    paddingTop: 0,
    paddingBottom: 20,
    marginBottom: 20,
  },
  fullscreenContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
  },
  fullScreenTitle: {
    fontSize: '6vw',
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 40,
    color: '#fff',
  },
  fullScreenSubTitle: {
    fontSize: '7vw',
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 40,
    color: '#fff',
  },
  mainUnit: {
    fontSize: 96,
    fontWeight: 'bold',
    color: '#2563eb',
    marginBottom: 10,
    textAlign: 'center',
  },
  fullscreenMainUnit: {
    fontSize: '10vw',
    color: '#fff',

  },
  unitLabel: {
    fontSize: 96,
  },
  fullscreenUnitLabel: {
    fontSize: '10vw',
  },
  subUnits: {
    fontSize: 48,
    color: '#4b5563',
    textAlign: 'center',
  },
  subUnitsContainerMobile: {
    alignItems: 'center',
  },
  subUnitMobile: {
    fontSize: 36,
    color: '#4b5563',
    textAlign: 'center',
    marginBottom: 5,
  },
  fullscreenSubUnit: {
    fontSize: 48,
    color: '#fff',
  },
});

export default Countdown;
