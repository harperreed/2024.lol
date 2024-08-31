import { useState, useEffect } from 'react';
import { CastButton } from 'react-native-google-cast';
import { Alert } from 'react-native';

const ChromecastManager = () => {
  const [isCasting, setIsCasting] = useState(false);

  useEffect(() => {
    // Initialize Google Cast SDK
    GoogleCast.initializeWithOptions({
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
  }, []);

  return <CastButton style={{ width: 24, height: 24 }} />;
};