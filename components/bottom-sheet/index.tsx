import React, { useCallback, useRef, useState, useMemo } from 'react';
import { Text, StyleSheet, TextInput } from 'react-native';
import GorHomBottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';

enum BottomSheetEnum {
  Closed = 'closed',
  Half = 'half',
  Full = 'full',
}

type BottomSheetState = BottomSheetEnum.Closed | BottomSheetEnum.Half | BottomSheetEnum.Full;

const BOTTOM_SHEET_MAP: Record<number, BottomSheetEnum> = {
  0: BottomSheetEnum.Closed,
  1: BottomSheetEnum.Half,
  2: BottomSheetEnum.Full,
};

const BottomSheet = () => {
  const bottomSheetRef = useRef<GorHomBottomSheet>(null);
  const [bottomSheetState, setBottomSheetState] = useState<BottomSheetState>(BottomSheetEnum.Half);
  const [text, setText] = useState('');

  const handleSheetChanges = useCallback((index: number) => {
    setBottomSheetState(BOTTOM_SHEET_MAP[index] ?? BottomSheetEnum.Half);
  }, []);

  const handleTouchEnd = () => setBottomSheetState(BottomSheetEnum.Full);

  const bottomSheetIndex = useMemo(() => {
    return Object.entries(BOTTOM_SHEET_MAP).find(([_, value]) => value === bottomSheetState)?.[0] ?? 1;
  }, [bottomSheetState]);

  return (
    <GorHomBottomSheet
      ref={bottomSheetRef}
      snapPoints={[400, '100%']}
      index={Number(bottomSheetIndex)}
      onChange={handleSheetChanges}
    >
      <BottomSheetView style={styles.contentContainer}>
        <Text className='text-2xl'>Nice to see you, Julius</Text>
        <TextInput
          className='bg-gray-100'
          placeholder="Where are you going?"
          style={styles.input}
          onChangeText={setText}
          value={text}
          onTouchEnd={handleTouchEnd}
        />
      </BottomSheetView>
    </GorHomBottomSheet>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderWidth: 1,
    padding: 10,
  },
  contentContainer: {
    flex: 1,
    padding: 36,
    paddingTop: 12,
  },
});

export default BottomSheet;
