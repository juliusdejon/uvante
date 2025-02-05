import Map from 'containers/Map';
import BookRide from 'containers/BookRide';
import ViewRide from 'containers/ViewRide';
import { View } from 'react-native';


export default function App() {
  return (
    <View style={{ flex: 1 }}>
      <Map />
      <BookRide />
      <ViewRide />
    </View>
  );
}