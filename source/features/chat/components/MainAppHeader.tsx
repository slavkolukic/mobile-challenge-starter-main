import { Icon, PopupSelectMenu, Text } from '@/source/core/components';
import { ACTIVE_OPACITY } from '@/source/core/constants';
import { useStyles, useTheme } from '@/source/core/hooks';
import { Theme } from '@/source/core/types';
import * as Haptics from 'expo-haptics';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

type Props = {
  temporaryChatSelected: boolean;
  onPressTemporaryChat?: () => void;
};

export const MainAppHeader = ({
  temporaryChatSelected,
  onPressTemporaryChat,
}: Props) => {
  const styles = useStyles(createStyles);
  const { theme } = useTheme();
  const { preference, setPreference } = useTheme();

  const handlePressTemporaryChat = () => {
    Haptics.impactAsync();
    onPressTemporaryChat?.();
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
        <View style={styles.mainPartContainer}>
          <Text variant="header">ChatGPT</Text>
          <Text
            style={styles.textContainer}
            textColor={theme.colors.textSecondary}
            variant="header"
          >
            5
          </Text>
          <Icon
            color={theme.colors.textSecondary}
            name="arrow-down"
            size={16}
            style={styles.iconContainer}
          />
        </View>
        {temporaryChatSelected && (
          <Text textColor={theme.colors.textSecondary} variant="label">
            Temporary Chat
          </Text>
        )}
      </View>
      <View style={styles.headerRight}>
        <TouchableOpacity
          activeOpacity={ACTIVE_OPACITY.WEAK}
          onPress={handlePressTemporaryChat}
        >
          <Icon
            name={
              temporaryChatSelected ? 'temporary-chat-on' : 'temporary-chat-off'
            }
          />
        </TouchableOpacity>
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
    mainPartContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    iconContainer: {
      marginLeft: 2,
    },
    textContainer: {
      marginLeft: 4,
    },
  });
