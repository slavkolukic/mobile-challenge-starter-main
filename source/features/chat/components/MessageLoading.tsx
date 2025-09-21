import { WINDOW_HEIGHT } from '@/source/core/constants';
import { useTheme } from '@/source/core/hooks';
import { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

export const MessageLoading = () => {
  const { theme } = useTheme();
  const opacity = useSharedValue(0);
  const scale = useSharedValue(0);

  useEffect(() => {
    opacity.value = withTiming(1, { duration: 600 });
    scale.value = withSequence(
      withTiming(1, { duration: 600 }),
      withRepeat(
        withSequence(
          withDelay(400, withTiming(0.6, { duration: 600 })),
          withTiming(1, { duration: 600 })
        ),
        -1,
        true
      )
    );
  }, [opacity, scale]);

  const animatedStyle = useAnimatedStyle(() => ({
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: theme.colors.backgroundContrast,
    opacity: opacity.value,
    transform: [{ scale: scale.value }],
  }));

  return (
    <View style={styles.loadingContainer}>
      <Animated.View style={animatedStyle} />
    </View>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    paddingHorizontal: 16,
    marginTop: 18,
    minHeight: WINDOW_HEIGHT,
  },
});
