import React, { useEffect } from "react";
import { View } from "react-native";
import Animated, { useSharedValue, useAnimatedStyle, withRepeat, withTiming } from "react-native-reanimated";

const LinearLoader = () => {
  const translateX = useSharedValue(-100);

  useEffect(() => {
    translateX.value = withRepeat(
      withTiming(300, { duration: 1200 }),
      -1,
      false
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <View style={{ width: "100%", height: 8, backgroundColor: "#e5e7eb", borderRadius: 4, overflow: "hidden" }}>
      <Animated.View
        style={[
          { height: "100%", width: 96, backgroundColor: "#3b82f6", borderRadius: 4 },
          animatedStyle,
        ]}
      />
    </View>
  );
};

export default LinearLoader;
