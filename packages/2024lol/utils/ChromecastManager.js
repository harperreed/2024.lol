import { useState, useEffect } from 'react';
import GoogleCast, { CastButton } from 'react-native-google-cast';
import { Alert } from 'react-native';

const ChromecastManager = () => {
  const [isCasting, setIsCasting] = useState(false);

  useEffect(() => {
    const initChromecast = async () => {
      try {
        // Initialize Google Cast SDK
        await GoogleCast.initialize({
          receiverApplicationId: process.env.REACT_APP_RECEIVER_ID, // Use the ID provided by Google for your receiver app
        });

        // Add listener for cast state changes
        const listener = GoogleCast.EventEmitter.addListener(
          GoogleCast.SESSION_STARTED,
          () => setIsCasting(true)
        );

        return () => {
          // Remove listener when component unmounts
          listener.remove();
        };
      } catch (error) {
        console.error('Failed to initialize Chromecast:', error);
        Alert.alert('Chromecast Error', 'Failed to initialize Chromecast. Please try again.');
      }
    };

    initChromecast();
  }, []);

  return <CastButton style={{ width: 24, height: 24 }} />;
};