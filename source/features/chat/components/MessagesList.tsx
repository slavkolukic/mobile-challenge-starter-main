import { UIMessage } from '@ai-sdk/react';
import { FlashList, ListRenderItem } from '@shopify/flash-list';
import { FC, useCallback, useEffect, useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import { AssistantMessage } from './AssistantMessage';
import { AssistantWeatherMessage } from './AssistantWeatherMessage';
import { MessageLoading } from './MessageLoading';
import { UserMessage } from './UserMessage';

type Props = {
  messages: UIMessage[];
};

const SEPARATOR_HEIGHT = 12;

export const MessagesList: FC<Props> = ({ messages }) => {
  const itemHeightsRef = useRef<Record<number, number>>({});
  const renderItem: ListRenderItem<UIMessage> = useCallback(
    ({ item: message, index }) => {
      const messageText = message.parts
        .map(part => (part.type === 'text' ? part.text : ''))
        .join('');

      const lastTextPart = [...message.parts]
        .reverse()
        .find(p => p.type === 'text') as
        | { type: 'text'; state?: 'streaming' | 'done'; text: string }
        | undefined;
      const streamingDone = lastTextPart?.state === 'done';

      const handleMessageLayout = (itemIndex: number, height: number) => {
        itemHeightsRef.current[itemIndex] = height;
      };

      if (message.role === 'user') {
        return (
          <View
            onLayout={e =>
              handleMessageLayout(index, e.nativeEvent.layout.height)
            }
          >
            <UserMessage messageText={messageText} />
          </View>
        );
      }

      const weatherToolPart = (message.parts as unknown as any[]).find(
        p =>
          p?.type === 'tool-weather' &&
          p?.output &&
          typeof p.output.temperature === 'number' &&
          typeof p.output.location === 'string'
      );

      if (weatherToolPart) {
        return (
          <View
            onLayout={e =>
              handleMessageLayout(index, e.nativeEvent.layout.height)
            }
          >
            <AssistantWeatherMessage
              location={weatherToolPart.output.location}
              temperature={weatherToolPart.output.temperature}
            />
          </View>
        );
      }

      return (
        <View
          onLayout={e =>
            handleMessageLayout(index, e.nativeEvent.layout.height)
          }
        >
          <AssistantMessage
            isLastMessage={index === messages.length - 1}
            messageText={messageText}
            streamingDone={streamingDone}
          />
        </View>
      );
    },
    [messages]
  );

  const lastMessageSentByUser = messages[messages.length - 1].role === 'user';

  const flashListRef = useRef<FlashList<UIMessage>>(null);

  useEffect(() => {
    if (messages.length === 0 || messages.length === 1) return;

    const lastMessage = messages[messages.length - 1];
    if (lastMessage.role !== 'user') return;

    setTimeout(() => {
      const lastUserIndex = messages.length - 1;
      let totalHeightBeforeLastUser = 0;
      for (let i = 0; i < lastUserIndex; i++) {
        const height = itemHeightsRef.current[i];
        if (typeof height === 'number') totalHeightBeforeLastUser += height;
      }

      totalHeightBeforeLastUser += SEPARATOR_HEIGHT * lastUserIndex;

      flashListRef.current?.scrollToOffset({
        offset: totalHeightBeforeLastUser + 10,
        animated: true,
      });
    }, 20);
  }, [messages]);

  return (
    <FlashList
      ref={flashListRef}
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
    flexGrow: 1,
  },
  separator: {
    height: SEPARATOR_HEIGHT,
  },
});

const ItemSeparatorComponent = () => {
  return <View style={styles.separator} />;
};
