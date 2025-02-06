import React, { ReactNode, Ref } from 'react';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { BottomSheetMethods } from '@gorhom/bottom-sheet/lib/typescript/types';

interface BottomSheetProps {
  children: ReactNode;
  bottomSheetIndex?: number;
  snapPoints?: Array<number | string>;
  onChange?: (index: number) => void;
}

const CustomBottomSheet = React.forwardRef((props: BottomSheetProps, ref: Ref<BottomSheetMethods>) => {
  const { children, snapPoints = [400, '100%'], bottomSheetIndex, onChange = () => { }, ...rest } = props;

  return (
    <BottomSheet
      ref={ref}
      snapPoints={snapPoints}
      index={bottomSheetIndex}
      onChange={onChange}
      {...rest}
    >
      <BottomSheetView className="flex p-8 gap-2">
        {children}
      </BottomSheetView>
    </BottomSheet>
  );
});

export default CustomBottomSheet;