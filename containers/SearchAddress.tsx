import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, ListRenderItem, TextInput } from 'react-native';
import TextField from 'components/TextField';
import useDebounce from 'hooks/useDebounce';
import Config from 'config';

interface SearchAddressProps {
  placeholder: string;
  onTouchEnd: () => void;
}

interface Place {
  id: string;
  place_name: string;
}

const SearchAddress: React.FC<SearchAddressProps> = (props) => {
  const { placeholder, onTouchEnd } = props;
  const [address, setAddress] = useState<string>('');
  const [results, setResults] = useState<Place[]>([]);
  const debouncedAddress = useDebounce(address, 500);
  const [placeSelected, setPlaceSelected] = useState<boolean>(false);
  const textFieldRef = useRef<any>(null);

  const fetchResults = async (query: string) => {
    if (!query || placeSelected) {
      setResults([]);
      return null;
    }
    try {
      const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(query)}.json`;
      const response = await axios.get(url, {
        params: {
          access_token: Config.MAP_BOX_ACCESS_TOKEN
        }
      });
      setResults(response.data.features);
    } catch (error) {
      console.error('Error fetching addresses:', error);
    }
  };

  useEffect(() => {
    fetchResults(debouncedAddress);
  }, [debouncedAddress]);

  const onSelectPlace = (item: Place) => {
    setAddress(item.place_name);
    setResults([]);
    setPlaceSelected(true);
    if (textFieldRef.current) {
      textFieldRef.current.blur();
    }
  };

  const renderPlace: ListRenderItem<Place> = ({ item }) => (
    <TouchableOpacity onPress={() => onSelectPlace(item)}>
      <Text className="font-primary-medium text-lg py-2 px-4">{item.place_name}</Text>
    </TouchableOpacity>
  );

  return (
    <View>
      <TextField
        textFieldRef={textFieldRef}
        value={address}
        onChangeText={(text: string) => {
          setAddress(text);
          setPlaceSelected(false);
        }}
        onTouchEnd={onTouchEnd}
        placeholder={placeholder}
      />

      {results.length > 0 && (
        <FlatList
          data={results}
          renderItem={renderPlace}
          keyExtractor={(item) => item.id}
          style={{ marginTop: 10 }}
        />
      )}
    </View>
  );
};

export default SearchAddress;