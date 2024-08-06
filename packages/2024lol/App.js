import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, Linking, useWindowDimensions } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Countdown from './components/Countdown';
import ActionCard from './components/ActionCard';
import SocialShareButtons from './components/SocialShareButtons';

export default function App() {
  const windowWidth = useWindowDimensions().width;
  const [countdownData, setCountdownData] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  const actions = [
    {
      title: 'Donate',
      text: 'Support the Vice President Kamala Harris campaign.',
      url: 'https://secure.actblue.com/donate/web-hfp-august-2024',
      imageUrl: 'https://kagi.com/proxy/XKsJcVG-asset-mezzanine-16x9-y065NJy.jpg?c=spW3Fj0L-4fXKC0f4mRdJxEljKHw1Pb4F7zwueYnh4X98iWrIM9VyLZ6hJkdtTU8VyVKy6thZ2xjzX2FCzDSjSmzo2fi8tZk5k3r7JazmwYR4vaM-QC9RABYhSL4_2El',
    },
    {
      title: 'Volunteer',
      text: 'Help Vice President Kamala Harris win the election.',
      url: 'https://web.kamalaharris.com/forms/take-action-for-kamala-harris/?source=web_an_takeactionpage_20240726',
      imageUrl: 'https://kagi.com/proxy/?c=ZIhQRmoa0u7oEmIYzxXCowdYWQPx3V2Cq8eZGB9LQOhr6ll02dNwAIJZu2prXvrzOcTp-9-wikmI8xnKbGrU9TRtwtBC-Iys9qNvUi9ucXz2zD-UXA5tQF5enuYOIfikAGYZSmu6n2r0rBdy6Dkv-yT6KG1mUx6AiZgf9p15wwbK03_Hp-9psR0d3f4b0bybRZBRrV59EEVvmqM888DtTa5y3NJ9BvCYzdQGtBa16YYYVtbef6UuJ8pvEdXXDa6z5ybaFLYv2DLD3wNQPJJO47k8BAude9GlCiFeQZIkiS64UTV4M55qPJNaAIq45YUA',
    },
    {
      title: 'Vote',
      text: 'Speak up for Democracy.',
      url: 'https://www.google.com/search?q=register%20to%20vote',
      imageUrl: 'https://kagi.com/proxy/images?c=_m3km2RjA3G0qleowsZXHZb9NEn0fSsEYIHbKzMDyAFb4nUPIanknmQV_g0rmdCI_HXK1ZKyqOdmMst1fcUMv7aPX7t_-TRrt0ajXTR8D_eYFqcoBFaM2vNTqauLc73ficwysUx3wtaJEdeJuC7dsXAD3FxabUdQb2xnzp2hsFw%3D',
    },
  ];

  const renderActionCards = () => {
    const isSingleColumn = windowWidth < 600;

    if (isSingleColumn) {
      return actions.map((action, index) => (
        <ActionCard
          key={index}
          {...action}
          onPress={() => Linking.openURL(action.url)}
        />
      ));
    } else {
      const rows = [];
      for (let i = 0; i < actions.length; i += 2) {
        rows.push(
          <View key={i} style={styles.row}>
            <ActionCard
              {...actions[i]}
              onPress={() => Linking.openURL(actions[i].url)}
            />
            {i + 1 < actions.length && (
              <ActionCard
                {...actions[i + 1]}
                onPress={() => Linking.openURL(actions[i + 1].url)}
              />
            )}
          </View>
        );
      }
      return rows;
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <ScrollView contentContainerStyle={styles.scrollContent}>
      <View style={styles.countdownSection}>

           <Countdown onCountdownUpdate={setCountdownData} />
           <Text style={styles.subtitle}>Election day is November 5, 2024, 9:00 AM</Text>
         </View>

        <Text style={styles.sectionTitle}>What can I do to help?</Text>
        {renderActionCards()}
        <Text style={styles.sectionTitle}>Share</Text>
        <SocialShareButtons days={countdownData.days} hours={countdownData.hours} />
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
    padding: 20,
  },
  countdownSection: {
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
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
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
});
