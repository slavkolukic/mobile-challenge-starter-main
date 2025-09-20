import { FC, useMemo } from 'react';
import {
  Text as RNText,
  TextProps as RNTextProps,
  StyleSheet,
} from 'react-native';
import { useTheme } from '../hooks';

type TextVariant = keyof typeof styles;

type TextProps = RNTextProps & {
  variant?: TextVariant;
  textColor?: string;
};

export const Text: FC<TextProps> = ({
  variant = 'body',
  textColor,
  ...props
}) => {
  const { theme } = useTheme();

  const color = useMemo(
    () => (textColor ? textColor : theme.colors.textPrimary),
    [textColor, theme.colors.textPrimary]
  );

  return (
    <RNText {...props} style={[styles[variant], props.style, { color }]}>
      {props.children}
    </RNText>
  );
};

const styles = StyleSheet.create({
  header: {
    fontSize: 18,
    fontWeight: '500',
  },
  body: {
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 22,
  },
  secondary: {
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 20,
  },
  caption: {
    fontSize: 13,
    fontWeight: '400',
    lineHeight: 18,
  },
  label: {
    fontSize: 13,
    fontWeight: '500',
  },
});
