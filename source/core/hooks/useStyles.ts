import { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { Theme } from '../types';
import { useTheme } from './useTheme';

type StyleFactory<T extends StyleSheet.NamedStyles<T>> = (theme: Theme) => T;

export function useStyles<T extends StyleSheet.NamedStyles<T>>(
  styleFactory: StyleFactory<T>
): T {
  const { theme } = useTheme();

  return useMemo(() => styleFactory(theme), [theme, styleFactory]);
}
