import React, { useCallback, useRef, useState, useMemo } from 'react';
import { Text, TextInput } from 'react-native';
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
      <BottomSheetView
        style={{ flex: 1, padding: 24, gap: 2 }}
      >
        <Text className='font-primary text-md'>Hey Julius</Text>
        <Text className='font-primary-bold text-2xl font-bold'>Where are you going?</Text>
        <TextInput
          className='font-primary-medium border rounded-lg border-1 border-gray-300 mt-4 bg-white text-lg px-6 p-4 pb-6 font-medium shadow-sm'
          placeholder='Enter destination'
          placeholderTextColor='#A0A0A0'
          onChangeText={setText}
          value={text}
          onTouchEnd={handleTouchEnd}
        />
      </BottomSheetView>

    </GorHomBottomSheet>
  );
};



export default BottomSheet;
