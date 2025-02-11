import React, { useRef, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, ListRenderItem, TextInput } from 'react-native';
import TextField from 'components/TextField';
import useDebounce from 'hooks/useDebounce';
import { Place, Coordinate } from 'types/types';
import { useLocationSearch } from 'hooks/useLocationSearch';
import { placeIcons } from 'data/location';
interface SearchLocationProps {
  Icon: React.ReactNode;
  placeholder: string;
  setCoordinates: (coordinates: Coordinate) => void;
  onTouchEnd: () => void;
  location: string;
  setLocation: (location: string) => void;
}

const SearchLocation: React.FC<SearchLocationProps> = (props) => {
  const { location, setLocation, Icon, placeholder, setCoordinates, onTouchEnd } = props;

  const [placeSelected, setPlaceSelected] = useState<boolean>(false);
  const debouncedLocation = useDebounce(location, 500);
  const textFieldRef = useRef<TextInput>(null);

  const { results, setResults } = useLocationSearch(debouncedLocation, placeSelected);

  const onSelectPlace = (item: Place) => {
    setLocation(item.place_name);
    setCoordinates(item.center);
    setResults([]);
    setPlaceSelected(true);
    textFieldRef.current?.blur();
  };


  const renderPlace: ListRenderItem<Place> = ({ item }) => {
    const lastPlaceType = item.place_type[item.place_type.length - 1];
    return (
      <TouchableOpacity onPress={() => onSelectPlace(item)} className='flex gap-2 flex-row items-center truncate'>
        <Text>
          {placeIcons[lastPlaceType] ? placeIcons[lastPlaceType] : null}
        </Text>
        <Text className="font-primary-medium text-lg py-2 px-4">{item.place_name}</Text>
      </TouchableOpacity>
    )
  };

  return (
    <View>

      <TextField
        ref={textFieldRef}
        testID='u-txt-search-location'
        Icon={Icon}
        value={location}
        onChangeText={(text: string) => {
          setLocation(text);
          setPlaceSelected(false);
        }}
        onTouchEnd={onTouchEnd}
        placeholder={placeholder}
      />

      <View className='ml-6'>
        {results.length > 0 ? (
          <FlatList
            data={results}
            renderItem={renderPlace}
            keyExtractor={(item) => item.id}
            style={{ marginTop: 10 }}
          />
        ) : null}
      </View>

    </View>
  );
};

export default SearchLocation;
