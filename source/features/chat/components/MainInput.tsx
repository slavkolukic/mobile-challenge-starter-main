import { Icon, textStyles } from '@/source/core/components';
import { ACTIVE_OPACITY } from '@/source/core/constants';
import { useStyles, useTheme } from '@/source/core/hooks';
import { Theme } from '@/source/core/types';
import * as Haptics from 'expo-haptics';
import { useMemo, useState } from 'react';
import {
  Alert,
  Pressable,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

type Props = {
  onSendMessage?: (message: string) => void;
};

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export const MainInput = ({ onSendMessage }: Props) => {
  const styles = useStyles(createStyles);
  const { theme } = useTheme();

  const micScale = useSharedValue(1);
  const mainScale = useSharedValue(1);

  const [text, setText] = useState('');

  const isUserTyping = useMemo(() => {
    return text.length > 0;
  }, [text]);

  const handleAttachmentButtonPress = () => {
    Haptics.impactAsync();
    Alert.alert('Opens attachment bottom sheet');
  };

  const handleMainActionButtonPress = () => {
    Haptics.impactAsync();
    runTapAnimation(mainScale);

    if (isUserTyping) {
      onSendMessage?.(text);
      setText('');
    } else {
      Alert.alert('Opens talk to GPT mode.');
    }
  };

  const handleMicrophoneButtonPress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Rigid);
    runTapAnimation(micScale);

    Alert.alert('Starts text to speech mode.');
  };

  const runTapAnimation = (sv: { value: number }) => {
    sv.value = withSequence(
      withTiming(0.95, { duration: 100, easing: Easing.out(Easing.quad) }),
      withTiming(1, { duration: 120, easing: Easing.out(Easing.quad) })
    );
  };

  const micAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: micScale.value }],
  }));
  const mainAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: mainScale.value }],
  }));

  return (
    <View style={styles.container}>
      <TouchableOpacity
        activeOpacity={ACTIVE_OPACITY.WEAK}
        onPress={handleAttachmentButtonPress}
        style={styles.attachmentButton}
      >
        <Icon color={theme.colors.iconSecondary} size={22} name="plus" />
      </TouchableOpacity>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Ask anything"
          placeholderTextColor={theme.colors.textSecondary}
          value={text}
          onChangeText={setText}
          autoCorrect={false}
          multiline={true}
          scrollEnabled={true}
        />
        <View style={styles.iconsContainer}>
          {!isUserTyping && (
            <AnimatedPressable
              style={[styles.microphoneButton, micAnimatedStyle]}
              onPress={handleMicrophoneButtonPress}
            >
              <Icon
                color={theme.colors.iconSecondary}
                size={22}
                name="microphone"
              />
            </AnimatedPressable>
          )}
          <AnimatedPressable
            style={[styles.mainActionButton, mainAnimatedStyle]}
            onPress={handleMainActionButtonPress}
          >
            <Icon
              color={theme.colors.textContrast}
              size={22}
              name={isUserTyping ? 'arrow-up-alt' : 'soundwave'}
            />
          </AnimatedPressable>
        </View>
        <View style={styles.fakeIcon} pointerEvents="none" />
      </View>
    </View>
  );
};

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      paddingHorizontal: 16,
      flexDirection: 'row',
      alignItems: 'flex-end',
    },
    attachmentButton: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: theme.colors.surface,
      justifyContent: 'center',
      alignItems: 'center',
    },
    inputContainer: {
      flex: 1,
      backgroundColor: theme.colors.surface,
      borderRadius: 20,
      paddingLeft: 6,
      paddingVertical: 6,
      marginLeft: 8,
      flexDirection: 'row',
    },
    input: {
      flex: 1,
      paddingLeft: 12,
      paddingRight: 48,
      ...textStyles.body,
      lineHeight: 0,
      color: theme.colors.textPrimary,
      maxHeight: 160,
    },
    iconsContainer: {
      justifyContent: 'center',
      alignItems: 'flex-end',
      flexDirection: 'row',
      gap: 8,

      position: 'absolute',
      right: 6,
      bottom: 6,
      alignSelf: 'flex-end',
    },
    mainActionButton: {
      width: 28,
      height: 28,
      borderRadius: 14,
      backgroundColor: theme.colors.backgroundContrast,
      alignItems: 'center',
      justifyContent: 'center',
    },
    microphoneButton: {
      width: 28,
      height: 28,
      borderRadius: 14,
      alignItems: 'center',
      justifyContent: 'center',
    },
    fakeIcon: {
      opacity: 0,
      height: 28,
    },
  });
