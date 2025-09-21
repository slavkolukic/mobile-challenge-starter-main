import { Text } from '@/source/core/components';
import { UIMessage } from '@ai-sdk/react';
import { FlashList, ListRenderItem } from '@shopify/flash-list';
import { FC } from 'react';

type Props = {
  messages: UIMessage[];
};

export const MessagesList: FC<Props> = ({ messages }) => {
  const renderItem: ListRenderItem<UIMessage> = ({ item }) => {
    return (
      <Text>
        {item.parts
          .map(part => (part.type === 'text' ? part.text : ''))
          .join('')}
      </Text>
    );
  };
  return <FlashList data={messages} renderItem={renderItem} />;
};
