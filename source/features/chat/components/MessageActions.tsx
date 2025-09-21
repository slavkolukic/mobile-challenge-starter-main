import { Icon } from '@/source/core/components';
import { useStyles } from '@/source/core/hooks';
import { Theme } from '@/source/core/types';
import * as Clipboard from 'expo-clipboard';
import * as Haptics from 'expo-haptics';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

type Props = {
  messageText: string;
};

export const MessageActions = ({ messageText }: Props) => {
  const timeout = useRef<number | null>(null);

  const styles = useStyles(createStyles);

  useEffect(() => {
    return () => {
      if (timeout.current) {
        clearTimeout(timeout.current);
      }
    };
  }, []);

  const [messageCopied, setMessageCopied] = useState(false);
  const [messageReaction, setMessageReaction] = useState<
    'none' | 'thumbs-up' | 'thumbs-down'
  >('none');

  const handleDuplicatePress = useCallback(() => {
    Haptics.impactAsync();
    Clipboard.setStringAsync(messageText);

    setMessageCopied(true);
    timeout.current = setTimeout(() => {
      setMessageCopied(false);
    }, 2000);
  }, [messageText]);

  return (
    <View style={styles.actionsContainer}>
      <AnimatedPressable
        onPress={handleDuplicatePress}
        entering={FadeIn}
        exiting={FadeOut}
        style={styles.iconContainer}
      >
        <Icon name={messageCopied ? 'checkmark' : 'duplicate'} size={20} />
      </AnimatedPressable>

      {messageReaction === 'none' && (
        <>
          <AnimatedPressable
            entering={FadeIn}
            exiting={FadeOut}
            onPress={() => setMessageReaction('thumbs-up')}
            style={styles.iconContainer}
          >
            <Icon name="thumbs-up" size={20} />
          </AnimatedPressable>
          <AnimatedPressable
            entering={FadeIn}
            exiting={FadeOut}
            style={styles.iconContainer}
            onPress={() => setMessageReaction('thumbs-down')}
          >
            <Icon name="thumbs-down" size={20} />
          </AnimatedPressable>
        </>
      )}

      {messageReaction === 'thumbs-up' && (
        <AnimatedPressable
          onPress={() => setMessageReaction('none')}
          entering={FadeIn}
          exiting={FadeOut}
          style={[styles.iconContainer, styles.activatedReactionIconContainer]}
        >
          <Icon name="thumbs-up-filled" size={20} />
        </AnimatedPressable>
      )}

      {messageReaction === 'thumbs-down' && (
        <AnimatedPressable
          onPress={() => setMessageReaction('none')}
          entering={FadeIn}
          exiting={FadeOut}
          style={[styles.iconContainer, styles.activatedReactionIconContainer]}
        >
          <Icon name="thumbs-down-filled" size={20} />
        </AnimatedPressable>
      )}
    </View>
  );
};

const createStyles = (theme: Theme) => {
  return StyleSheet.create({
    actionsContainer: {
      flexDirection: 'row',
      gap: 8,
      marginTop: 4,
      marginLeft: -4,
    },
    iconContainer: {
      padding: 4,
      borderRadius: 4,
      justifyContent: 'center',
      alignItems: 'center',
    },
    activatedReactionIconContainer: {
      backgroundColor: theme.colors.iconBackground,
    },
  });
};
