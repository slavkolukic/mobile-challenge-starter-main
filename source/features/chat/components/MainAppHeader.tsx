import { Icon, PopupSelectMenu, Text } from '@/source/core/components';
import { ACTIVE_OPACITY } from '@/source/core/constants';
import { useStyles, useTheme } from '@/source/core/hooks';
import { Theme } from '@/source/core/types';
import * as Haptics from 'expo-haptics';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { ModelSelector } from './ModelSelector';

type Props = {
  temporaryChatSelected: boolean;
  onPressTemporaryChat?: () => void;
  sessionStarted: boolean;
  onPressCompose?: () => void;
};

export const MainAppHeader = ({
  temporaryChatSelected,
  onPressTemporaryChat,
  sessionStarted,
  onPressCompose,
}: Props) => {
  const styles = useStyles(createStyles);
  const { theme } = useTheme();
  const { preference, setPreference } = useTheme();

  const handlePressTemporaryChat = () => {
    Haptics.impactAsync();
    onPressTemporaryChat?.();
  };

  const handlePressCompose = () => {
    Haptics.impactAsync();
    onPressCompose?.();
  };

  return (
    <View style={styles.headerContainer}>
      <View style={styles.headerLeft}>
        <PopupSelectMenu
          trigger={<Icon name="menu" />}
          title="Select Theme"
          items={[
            {
              id: 'system',
              title: 'System',
              subtitle: 'Follow device setting',
              isSelected: preference === 'system',
            },
            {
              id: 'light',
              title: 'Light',
              subtitle: 'Bright appearance',
              isSelected: preference === 'light',
            },
            {
              id: 'dark',
              title: 'Dark',
              subtitle: 'Better for low light',
              isSelected: preference === 'dark',
            },
          ]}
          onSelect={item =>
            setPreference(item.id as 'system' | 'light' | 'dark')
          }
        />
      </View>
      <View style={styles.headerCenter}>
        <ModelSelector />
        {temporaryChatSelected && (
          <Text textColor={theme.colors.textSecondary} variant="label">
            Temporary Chat
          </Text>
        )}
      </View>
      <View style={styles.headerRight}>
        {sessionStarted ? (
          <TouchableOpacity
            activeOpacity={ACTIVE_OPACITY.WEAK}
            onPress={handlePressCompose}
          >
            <Icon name={'compose'} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            activeOpacity={ACTIVE_OPACITY.WEAK}
            onPress={handlePressTemporaryChat}
          >
            <Icon
              name={
                temporaryChatSelected
                  ? 'temporary-chat-on'
                  : 'temporary-chat-off'
              }
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    headerContainer: {
      flexDirection: 'row',
      paddingHorizontal: 16,
      justifyContent: 'space-between',
      borderBottomWidth: 0.5,
      borderBottomColor: theme.colors.border,
    },
    headerLeft: {
      paddingVertical: 14,
    },
    headerRight: {
      paddingVertical: 14,
    },
    headerCenter: {
      flex: 1,
      justifyContent: 'center',
      paddingHorizontal: 16,
    },
  });
