import { TextInput, TextInputProps } from 'react-native'
import React from 'react'

interface TextFieldProps extends TextInputProps {
  textFieldRef: React.LegacyRef<TextInput>;
}

const TextField = (props: TextFieldProps) => {
  const { textFieldRef, placeholder, value, onChangeText, ...rest } = props;
  return (
    <TextInput
      ref={textFieldRef}
      className="font-primary-medium border rounded-lg border-1 border-gray-300 mt-4 bg-white text-lg px-6 p-4 pb-6 font-medium shadow-sm"
      placeholder={placeholder}
      placeholderTextColor="#A0A0A0"
      onChangeText={onChangeText}
      value={value}
      {...rest}
    />
  )
}

export default TextField