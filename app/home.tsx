import { useNavigation } from 'expo-router';
import { useEffect } from 'react';

import BookRide from 'containers/BookRide';
import ViewRide from 'containers/ViewRide';
import Map from 'containers/Map';


export default function Home() {

  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  return (
    [
      <Map key={0} />,
      <BookRide key={1} />,
      <ViewRide key={2} />
    ]
  );
}