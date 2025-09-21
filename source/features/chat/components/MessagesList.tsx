import { UIMessage } from '@ai-sdk/react';
import { FlashList, ListRenderItem } from '@shopify/flash-list';
import { FC, useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import { AssistantMessage } from './AssistantMessage';
import { MessageLoading } from './MessageLoading';
import { UserMessage } from './UserMessage';
type Props = {
  messages: UIMessage[];
};

export const MessagesList: FC<Props> = ({ messages }) => {
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

      if (message.role === 'user') {
        return <UserMessage messageText={messageText} />;
      }

      return (
        <AssistantMessage
          isLastMessage={index === messages.length - 1}
          messageText={messageText}
          streamingDone={streamingDone}
        />
      );
    },
    [messages]
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
    flexGrow: 1,
  },
  separator: {
    height: 12,
  },
});

const ItemSeparatorComponent = () => {
  return <View style={styles.separator} />;
};
