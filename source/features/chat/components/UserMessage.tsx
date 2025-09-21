import { Text } from '@/source/core/components';
import { useStyles } from '@/source/core/hooks';
import { Theme } from '@/source/core/types';
import { FC, memo } from 'react';
import { StyleSheet, View } from 'react-native';

type Props = {
  messageText: string;
};

export const UserMessage: FC<Props> = memo(({ messageText }) => {
  const styles = useStyles(createStyles);

  return (
    <View style={styles.itemContainer}>
      <View style={styles.messageContainer}>
        <Text>{messageText}</Text>
      </View>
    </View>
  );
});

UserMessage.displayName = 'UserMessage';

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    itemContainer: {
      paddingHorizontal: 16,
      alignItems: 'flex-end',
    },
    messageContainer: {
      paddingVertical: 8,
      paddingHorizontal: 12,
      borderRadius: 16,
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: theme.colors.border,
      backgroundColor: theme.colors.surface,
      maxWidth: '80%',
    },
  });
