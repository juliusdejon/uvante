import React, { ReactNode, Ref, } from 'react';
import GorHomBottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { BottomSheetMethods } from '@gorhom/bottom-sheet/lib/typescript/types';

interface BottomSheetProps {
  children: ReactNode,
  bottomSheetRef?: Ref<BottomSheetMethods>,
  bottomSheetIndex?: number,
  snapPoints?: Array<number | string>,
  onChange?: (index: number) => void,
}

const BottomSheet = (props: BottomSheetProps) => {
  const { children, snapPoints, bottomSheetRef, bottomSheetIndex, onChange = () => { }, ...rest } = props;

  return (
    <GorHomBottomSheet
      ref={bottomSheetRef}
      snapPoints={snapPoints || [400, '100%']}
      index={bottomSheetIndex}
      onChange={onChange}
      {...rest}
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
