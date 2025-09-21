import { Icon } from '@/source/core/components';
import { WINDOW_HEIGHT } from '@/source/core/constants';
import { useStyles } from '@/source/core/hooks';
import { Theme } from '@/source/core/types';
import * as Clipboard from 'expo-clipboard';
import * as Haptics from 'expo-haptics';
import React, {
  FC,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { AnimatedWord } from './AnimatedWord';

type Props = {
  messageText: string;
  streamingDone: boolean;
  isLastMessage: boolean;
};

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export const AssistantMessage: FC<Props> = memo(
  ({ messageText, streamingDone, isLastMessage }) => {
    const styles = useStyles(createStyles);

    const [messageCopied, setMessageCopied] = useState(false);
    const [messageReaction, setMessageReaction] = useState<
      'none' | 'thumbs-up' | 'thumbs-down'
    >('none');

    const timeout = useRef<number | null>(null);

    useEffect(() => {
      return () => {
        if (timeout.current) {
          clearTimeout(timeout.current);
        }
      };
    }, []);

    const words = useMemo(() => {
      return messageText
        .split(/\s+/)
        .map(w => w.trim())
        .filter(Boolean);
    }, [messageText]);

    const handleDuplicatePress = useCallback(() => {
      Haptics.impactAsync();
      Clipboard.setStringAsync(messageText);

      setMessageCopied(true);
      timeout.current = setTimeout(() => {
        setMessageCopied(false);
      }, 2000);
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
        {streamingDone && (
          <View style={styles.actionsContainer}>
            <AnimatedPressable
              onPress={handleDuplicatePress}
              entering={FadeIn}
              exiting={FadeOut}
              style={styles.iconContainer}
            >
              <Icon
                name={messageCopied ? 'checkmark' : 'duplicate'}
                size={20}
              />
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
                style={[
                  styles.iconContainer,
                  styles.activatedReactionIconContainer,
                ]}
              >
                <Icon name="thumbs-up-filled" size={20} />
              </AnimatedPressable>
            )}

            {messageReaction === 'thumbs-down' && (
              <AnimatedPressable
                onPress={() => setMessageReaction('none')}
                entering={FadeIn}
                exiting={FadeOut}
                style={[
                  styles.iconContainer,
                  styles.activatedReactionIconContainer,
                ]}
              >
                <Icon name="thumbs-down-filled" size={20} />
              </AnimatedPressable>
            )}
          </View>
        )}
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
