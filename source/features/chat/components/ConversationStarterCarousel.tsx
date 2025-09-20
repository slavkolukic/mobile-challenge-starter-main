import { Text } from '@/source/core/components';
import { useStyles, useTheme } from '@/source/core/hooks';
import { Theme } from '@/source/core/types';
import { FlashList, ListRenderItem } from '@shopify/flash-list';
import { FC } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

const data = [
  {
    id: '1',
    title: 'Tell me the country',
    subtitle: 'with the most olympic athletes',
  },
  { id: '2', title: 'Explain superconductors', subtitle: 'in simple terms' },
  { id: '3', title: 'Tell me about the', subtitle: 'Roman Empire' },
  { id: '4', title: 'What is the capital', subtitle: 'of the United States' },
  {
    id: '5',
    title: 'What is the elevation',
    subtitle: 'of the highest mountain',
  },
];

type Props = {
  onItemSelected?: (prompt: string) => void;
};

export const ConversationStarterCarousel: FC<Props> = ({ onItemSelected }) => {
  const styles = useStyles(createStyles);
  const { theme } = useTheme();

  const handleOnItemSelected = (title: string, subtitle: string) => {
    onItemSelected?.(`${title} ${subtitle}`);
  };

  const renderItem: ListRenderItem<(typeof data)[0]> = ({ item }) => (
    <Pressable
      style={styles.card}
      onPress={() => handleOnItemSelected(item.title, item.subtitle)}
    >
      <Text
        variant="header2"
        textColor={theme.colors.textPrimary}
        numberOfLines={1}
      >
        {item.title}
      </Text>
      <Text
        variant="secondary"
        textColor={theme.colors.textSecondary}
        numberOfLines={1}
      >
        {item.subtitle}
      </Text>
    </Pressable>
  );

  return (
    <Animated.View entering={FadeIn} exiting={FadeOut} style={styles.container}>
      <FlashList
        data={data}
        keyExtractor={item => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        estimatedItemSize={220}
        ItemSeparatorComponent={() => <View style={{ width: 12 }} />}
        contentContainerStyle={styles.listContent}
        renderItem={renderItem}
      />
    </Animated.View>
  );
};

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'flex-end',
    },
    listContent: {
      paddingHorizontal: 16,
      paddingVertical: 12,
    },
    card: {
      padding: 12,
      borderRadius: 12,
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: theme.colors.border,
      backgroundColor: theme.colors.surface,
      justifyContent: 'center',
      gap: 2,
    },
  });
