import { useStyles, useTheme } from '@/source/core/hooks';
import { Theme } from '@/source/core/types';
import * as Haptics from 'expo-haptics';
import { FC, ReactNode } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from 'react-native';
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
} from 'react-native-popup-menu';
import Checkmark from '../assets/icons/checkmark.svg';
import { ACTIVE_OPACITY } from '../constants';
import { Text } from './Text';

type PopupSelectItem = {
  id: string;
  title: string;
  subtitle?: string;
  isSelected?: boolean;
  isDisabled?: boolean;
};

type PopupSelectMenuProps = {
  title: string;
  items: PopupSelectItem[];
  onSelect?: (item: PopupSelectItem) => void;
  trigger: ReactNode;
};

const CustomTouchableOpacity: FC<TouchableOpacityProps> = props => {
  return <TouchableOpacity {...props} activeOpacity={ACTIVE_OPACITY.WEAK} />;
};

export const PopupSelectMenu: FC<PopupSelectMenuProps> = ({
  title,
  items,
  onSelect,
  trigger,
}) => {
  const styles = useStyles(createStyles);
  const { theme } = useTheme();

  const handleTriggerOnPress = () => {
    Haptics.impactAsync();
  };

  return (
    <Menu>
      <MenuTrigger
        onPress={handleTriggerOnPress}
        customStyles={{ TriggerTouchableComponent: CustomTouchableOpacity }}
      >
        {trigger}
      </MenuTrigger>
      <MenuOptions customStyles={{ optionsContainer: styles.optionsContainer }}>
        <View style={styles.header}>
          <View style={styles.headerRow}>
            <View style={styles.leadingIcon}>
              <Checkmark
                width={16}
                height={16}
                color={theme.colors.iconPrimary}
                style={{ opacity: 0 }}
              />
            </View>
            <View style={styles.texts}>
              <Text
                variant="label"
                textColor={theme.colors.textSecondary}
                numberOfLines={1}
              >
                {title}
              </Text>
            </View>
          </View>
        </View>
        {items.map((item, index) => (
          <MenuOption
            key={item.id}
            disabled={item.isDisabled}
            onSelect={() => onSelect?.(item)}
            customStyles={{ optionWrapper: styles.optionWrapper }}
          >
            <View style={[styles.row, index > 0 && styles.rowDivider]}>
              <View style={styles.leadingIcon}>
                {item.isSelected ? (
                  <Checkmark
                    width={16}
                    height={16}
                    color={theme.colors.iconPrimary}
                  />
                ) : null}
              </View>

              <View style={styles.texts}>
                <Text variant="body" numberOfLines={1}>
                  {item.title}
                </Text>
                {item.subtitle ? (
                  <Text
                    variant="secondary"
                    numberOfLines={1}
                    textColor={theme.colors.textSecondary}
                  >
                    {item.subtitle}
                  </Text>
                ) : null}
              </View>
            </View>
          </MenuOption>
        ))}
      </MenuOptions>
    </Menu>
  );
};

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    optionsContainer: {
      borderRadius: 14,
      backgroundColor: theme.colors.surface,
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: theme.colors.border,
      overflow: 'hidden',
      width: 280,
      marginTop: 24,
      marginLeft: 16,
    },
    header: {
      paddingHorizontal: 12,
      paddingVertical: 8,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
    },
    headerRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
    },
    optionWrapper: {
      paddingHorizontal: 0,
      paddingVertical: 0,
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 12,
      paddingVertical: 10,
      gap: 10,
    },
    rowDivider: {
      borderTopWidth: 1,
      borderTopColor: theme.colors.border,
    },
    leadingIcon: {
      width: 20,
      alignItems: 'center',
    },
    texts: {
      flex: 1,
    },
  });
