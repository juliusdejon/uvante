import { Text, Pressable } from 'react-native'
import React from 'react'

interface ButtonProps {
  className?: string,
  onPress: () => void,
  children: React.ReactNode
}
const Button = (props: ButtonProps) => {
  const { onPress, className, children } = props
  return (
    <Pressable
      style={({ pressed }) => [
        {
          backgroundColor: pressed ? 'black' : 'grey',
        },
      ]}
      className={`bg-blue-600 ${className} w-full mt-6 h-[48] flex  rounded-full items-center justify-center`}
      onPress={onPress}>
      <Text className='text-white font-primary text-xl font-primary-semibold' >
        {children}
      </Text>
    </Pressable>
  )
}

export default Button