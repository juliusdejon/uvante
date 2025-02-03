import React, { useCallback, useRef } from 'react';
import { Text, StyleSheet, Button } from 'react-native';

import GorHomBottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';

const BottomSheet = () => {
  const bottomSheetRef = useRef<GorHomBottomSheet>(null);

  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  return (
    <GorHomBottomSheet
      ref={bottomSheetRef}
      index={2}
      snapPoints={['40%', '20%']}
      onChange={handleSheetChanges}
    >
      <BottomSheetView
        style={styles.contentContainer}
      >
        <Text>Pickup</Text>
        <Text>Drop-off</Text>
        <Button title='Book'></Button>
      </BottomSheetView>
    </GorHomBottomSheet>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    height: '100%',
    flex: 1,
    padding: 36,
    alignItems: 'center',
  },
});

export default BottomSheet;