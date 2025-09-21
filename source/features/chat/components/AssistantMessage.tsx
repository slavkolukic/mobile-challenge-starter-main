import { Text } from '@/source/core/components';
import React, { FC, memo, useEffect, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';

type Props = {
  messageText: string;
};

export const AssistantMessage: FC<Props> = memo(({ messageText }) => {
  const words = useMemo(() => {
    return messageText
      .split(/\s+/)
      .map(w => w.trim())
      .filter(Boolean);
  }, [messageText]);

  return (
    <View style={styles.itemContainer}>
      <View style={styles.messageContainer}>
        <View style={styles.charactersContainer}>
          {words.map((word, idx) => (
            <Word key={idx} word={word} delay={idx * 18} />
          ))}
        </View>
      </View>
    </View>
  );
});

AssistantMessage.displayName = 'AssistantMessage';

const styles = StyleSheet.create({
  itemContainer: {
    paddingHorizontal: 16,
    alignItems: 'flex-start',
  },
  messageContainer: {
    paddingVertical: 8,
  },
  charactersContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});

const Word = memo(({ word, delay }: { word: string; delay: number }) => {
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
});

Word.displayName = 'Word';
