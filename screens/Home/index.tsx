import { View, StyleSheet } from 'react-native';
import SearchBar from '../../components/SearchBar';
import Mapbox from '@rnmapbox/maps';

Mapbox.setAccessToken('pk.eyJ1IjoianVsaXVzZGVqb24iLCJhIjoiY202b3YwcHVlMHRyNTJscTBkYW96bDI4MyJ9.DE9eY_MiUPSbRMsuI7b28g');

const Home = () => {
  return (
    <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center', }}>
      <View style={{ flex: 1, alignItems: 'center', padding: 10 }}>
        <SearchBar placeholder='Pickup' />
        <SearchBar placeholder='Drop-off' />
        <View style={styles.container}>
          <Mapbox.MapView style={styles.map} />
        </View>

      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    height: 300,
    width: 300,
  },
  map: {
    flex: 1
  }
});


export default Home