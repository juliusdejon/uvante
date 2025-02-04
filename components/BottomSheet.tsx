import React, { ReactNode, Ref, } from 'react';
import GorHomBottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { BottomSheetMethods } from '@gorhom/bottom-sheet/lib/typescript/types';

interface BottomSheetProps {
  children: ReactNode,
  bottomSheetRef?: Ref<BottomSheetMethods>,
  index?: number,
  onChange?: (index: number) => void,
}

const BottomSheet = (props: BottomSheetProps) => {
  const { children, bottomSheetRef, index, onChange = () => { } } = props;

  return (
    <GorHomBottomSheet
      ref={bottomSheetRef}
      snapPoints={[400, '100%']}
      index={index || 0}
      onChange={onChange}
    >
      <BottomSheetView
        className='flex p-8 gap-2'
      >
        {children}
      </BottomSheetView>
    </GorHomBottomSheet>
  );
};



export default BottomSheet;
