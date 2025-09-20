import { Text } from '@/source/core/components';
import { useStyles, useTheme } from '@/source/core/hooks';
import { Theme } from '@/source/core/types';
import { StyleSheet } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

const text =
  "This chat won't appear in history, use or update ChatGPT's memory, or be used to train our models. For safety purposes, we may keep a copy of this chat for up to 30 days.";

export const TemporaryChatInfo = () => {
  const styles = useStyles(createStyles);
  const { theme } = useTheme();

  return (
    <Animated.View entering={FadeIn} exiting={FadeOut} style={styles.container}>
      <Text
        variant="header2"
        style={styles.headingText}
        textColor={theme.colors.textSecondary}
      >
        Temporary chat
      </Text>
      <Text
        variant="secondary"
        style={styles.text}
        textColor={theme.colors.textSecondary}
      >
        {text}
      </Text>
    </Animated.View>
  );
};

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      paddingHorizontal: 54,
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    headingText: {
      textAlign: 'center',
    },
    text: {
      textAlign: 'center',
      marginTop: 8,
    },
  });
