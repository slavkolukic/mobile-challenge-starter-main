import { UIMessage } from '@ai-sdk/react';
import { FlashList, ListRenderItem } from '@shopify/flash-list';
import { FC, useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
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

      if (message.role === 'user') {
        return <UserMessage messageText={messageText} />;
      }

      return <AssistantMessage messageText={messageText} />;
    },
    []
  );

  return (
    <FlashList
      data={messages}
      renderItem={renderItem}
      ItemSeparatorComponent={ItemSeparatorComponent}
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
});

const ItemSeparatorComponent = () => {
  return <View style={styles.separator} />;
};
