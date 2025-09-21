import { Text } from '@/source/core/components';
import { memo, useEffect } from 'react';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';

export const AnimatedWord = memo(
  ({ word, delay }: { word: string; delay: number }) => {
    const offset = useSharedValue(0);

    const animatedStyle = useAnimatedStyle(() => ({
      opacity: offset.value,
      transform: [{ translateY: interpolate(offset.value, [0, 1], [-1, 0]) }],
    }));

    useEffect(() => {
      offset.value = withDelay(delay, withTiming(1, { duration: 200 }));
    }, [offset, delay]);

    return (
      <Animated.View style={animatedStyle}>
        <Text>{`${word} `}</Text>
      </Animated.View>
    );
  }
);

AnimatedWord.displayName = 'AnimatedWord';
