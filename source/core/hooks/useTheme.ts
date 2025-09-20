import { useColorScheme } from 'react-native';
import { useThemeStore } from '../store';
import { darkTheme, lightTheme } from '../themes';

export const useTheme = () => {
  const systemScheme = useColorScheme();
  const preference = useThemeStore(store => store.preference);
  const setPreference = useThemeStore(store => store.setPreference);

  const effectiveScheme = preference === 'system' ? systemScheme : preference;
  const isDark = effectiveScheme === 'dark';
  const theme = isDark ? darkTheme : lightTheme;

  return { theme, preference, setPreference, isDark };
};
