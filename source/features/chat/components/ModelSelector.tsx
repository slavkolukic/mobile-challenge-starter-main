import { Icon, PopupSelectMenu, Text } from '@/source/core/components';
import { useStyles, useTheme } from '@/source/core/hooks';
import { Theme } from '@/source/core/types';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  FadeInUp,
  FlipOutXDown,
  LinearTransition,
} from 'react-native-reanimated';

type ModelOption = 'auto' | 'Instant' | 'Thinking';

export const ModelSelector = () => {
  const styles = useStyles(createStyles);
  const { theme } = useTheme();
  const [model, setModel] = useState<ModelOption>('auto');

  const items = [
    {
      id: 'auto',
      title: 'Auto',
      subtitle: 'Decides how long to think',
      isSelected: model === 'auto',
    },
    {
      id: 'Instant',
      title: 'Instant',
      subtitle: 'Answers right away',
      isSelected: model === 'Instant',
    },
    {
      id: 'Thinking',
      title: 'Thinking',
      subtitle: 'Thinks longer for better answers',
      isSelected: model === 'Thinking',
    },
  ] as const;

  const handleSelect = (item: { id: string }) => {
    setModel(item.id as ModelOption);
  };

  const suffix = model === 'auto' ? '' : `${model}`;

  return (
    <View style={styles.container}>
      <PopupSelectMenu
        title="GPT-5"
        items={items as unknown as any[]}
        onSelect={handleSelect}
        trigger={
          <View style={styles.pressableContainer}>
            <Text variant="header">ChatGPT</Text>
            <Text
              style={styles.textContainer}
              textColor={theme.colors.textSecondary}
              variant="header"
            >
              5
            </Text>
            {suffix ? (
              <View style={styles.suffixContainer}>
                <Text variant="header" textColor={theme.colors.textSecondary}>
                  {' '}
                </Text>
                {suffix.split('').map((character, i) => (
                  <Animated.View
                    key={`suffix-${suffix}-${i}`}
                    entering={FadeInUp.withInitialValues({
                      opacity: 0,
                      transform: [{ translateY: -7 }],
                    })
                      .delay(i * 30)
                      .springify(700)}
                    exiting={FlipOutXDown.delay(i * 30).springify(200)}
                  >
                    <Text
                      variant="header"
                      textColor={theme.colors.textSecondary}
                    >
                      {character}
                    </Text>
                  </Animated.View>
                ))}
              </View>
            ) : null}
            <Animated.View layout={LinearTransition}>
              <Icon
                color={theme.colors.textSecondary}
                name="arrow-down"
                size={16}
                style={styles.iconContainer}
              />
            </Animated.View>
          </View>
        }
      />
    </View>
  );
};

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    iconContainer: {
      marginLeft: 2,
    },
    textContainer: {
      marginLeft: 4,
    },
    pressableContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    suffixContainer: {
      flexDirection: 'row',
    },
  });
