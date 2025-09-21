import { useTheme } from '@/source/core/hooks';
import { UIMessage } from '@ai-sdk/react';
import { FlashList, ListRenderItem } from '@shopify/flash-list';
import { FC, useCallback, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import { AssistantMessage } from './AssistantMessage';
import { UserMessage } from './UserMessage';
type Props = {
  messages: UIMessage[];
};

export const MessagesList: FC<Props> = ({ messages }) => {
  const renderItem: ListRenderItem<UIMessage> = useCallback(
    ({ item: message }) => {
      const messageText = message.parts
        .map(part => (part.type === 'text' ? part.text : ''))
        .join('');

      const lastTextPart = [...message.parts]
        .reverse()
        .find(p => p.type === 'text') as
        | { type: 'text'; state?: 'streaming' | 'done'; text: string }
        | undefined;
      const streamingDone = lastTextPart?.state === 'done';

      if (message.role === 'user') {
        return <UserMessage messageText={messageText} />;
      }

      return (
        <AssistantMessage
          messageText={messageText}
          streamingDone={streamingDone}
        />
      );
    },
    []
  );

  const lastMessageSentByUser = messages[messages.length - 1].role === 'user';

  return (
    <FlashList
      data={messages}
      renderItem={renderItem}
      ItemSeparatorComponent={ItemSeparatorComponent}
      ListFooterComponent={lastMessageSentByUser ? MessageLoading : null}
      contentContainerStyle={styles.container}
      estimatedItemSize={95}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
  },
  separator: {
    height: 12,
  },
  loadingContainer: {
    paddingHorizontal: 16,
    marginTop: 18,
  },
});

const ItemSeparatorComponent = () => {
  return <View style={styles.separator} />;
};

const MessageLoading = () => {
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
