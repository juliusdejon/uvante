import { Text, Pressable } from 'react-native';
import React, { Ref } from 'react';

interface ButtonProps {
  className?: string;
  onPress: () => void;
  children: React.ReactNode;
}

const Button = React.forwardRef((props: ButtonProps, ref: Ref<any>) => {
  const { onPress, className, children } = props;
  return (
    <Pressable
      ref={ref}
      style={({ pressed }) => [
        {
          backgroundColor: pressed ? 'black' : 'grey',
        },
        className === 'bg-blue-600' ? { backgroundColor: '#2563EB' } : { backgroundColor: '#D1D5DB' },
      ]}
      className={`w-full mt-6 h-[48] flex rounded-full items-center justify-center`}
      onPress={onPress}
    >
      <Text className='text-white font-primary text-xl font-primary-semibold'>
        {children}
      </Text>
    </Pressable>
  );
});

export default Button;