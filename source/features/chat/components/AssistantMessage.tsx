import { WINDOW_HEIGHT } from '@/source/core/constants';
import { useStyles } from '@/source/core/hooks';
import { Theme } from '@/source/core/types';
import React, { FC, memo, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { AnimatedWord } from './AnimatedWord';
import { MessageActions } from './MessageActions';

type Props = {
  messageText: string;
  streamingDone: boolean;
  isLastMessage: boolean;
};

export const AssistantMessage: FC<Props> = memo(
  ({ messageText, streamingDone, isLastMessage }) => {
    const styles = useStyles(createStyles);

    const words = useMemo(() => {
      return messageText
        .split(/\s+/)
        .map(w => w.trim())
        .filter(Boolean);
    }, [messageText]);

    return (
      <View
        style={[
          styles.itemContainer,
          isLastMessage && { minHeight: WINDOW_HEIGHT },
        ]}
      >
        <View style={styles.messageContainer}>
          <View style={styles.charactersContainer}>
            {words.map((word, idx) => (
              <AnimatedWord key={idx} word={word} delay={idx * 18} />
            ))}
          </View>
        </View>
        {streamingDone && <MessageActions messageText={messageText} />}
      </View>
    );
  }
);

AssistantMessage.displayName = 'AssistantMessage';

const createStyles = (theme: Theme) => {
  return StyleSheet.create({
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
};
