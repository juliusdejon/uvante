import { TextInput, TextInputProps, View } from 'react-native'
import React from 'react'
interface TextFieldProps extends TextInputProps {
  Icon?: React.ReactNode,
  textFieldRef: React.RefObject<TextInput>;
}

const TextField = (props: TextFieldProps) => {
  const { Icon, textFieldRef, placeholder, value, onChangeText, ...rest } = props;
  const isFocused = textFieldRef?.current?.isFocused();
  return (
    <View className={`flex gap-4 flex-row items-center ${Icon ? 'w-[90%]' : 'w-full'}`}>
      {Icon}
      <TextInput
        ref={textFieldRef}
        className={`
      ${isFocused ? 'bg-white' : 'bg-[#F9F9F9]'}
      font-primary-medium
      text-lg
      rounded-2xl
      border
      ml-auto
      w-full
      p-4
      border-[#EDEDED]
       `}
        placeholder={placeholder}
        placeholderTextColor="#656565"
        onChangeText={onChangeText}
        value={value}
        {...rest}
      />
    </View>
  )
}

export default TextField