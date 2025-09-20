import { Theme } from '@/source/core/types';
import { Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { useStyles, useTheme } from '../../source/core/hooks';

export default function App() {
  const { theme, preference, setPreference, isDark } = useTheme();

  const styles = useStyles(createStyles);

  const Button = ({
    label,
    value,
  }: {
    label: string;
    value: 'system' | 'light' | 'dark';
  }) => (
    <Pressable
      onPress={() => setPreference(value)}
      style={({ pressed }) => [
        styles.button,
        preference === value && styles.buttonActive,
        pressed && { opacity: 0.8 },
      ]}
    >
      <Text style={styles.buttonText}>{label}</Text>
    </Pressable>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Theme demo</Text>

      <View style={styles.row}>
        <Button label="System" value="system" />
        <Button label="Light" value="light" />
        <Button label="Dark" value="dark" />
      </View>

      <View style={{ gap: 6 }}>
        <Text style={styles.info}>Preference: {preference}</Text>
        <Text style={styles.info}>Effective: {isDark ? 'dark' : 'light'}</Text>
        <Text style={styles.info}>Background: {theme.colors.background}</Text>
        <Text style={styles.info}>Surface: {theme.colors.surface}</Text>
      </View>
    </SafeAreaView>
  );
}

const createStyles = (theme: Theme) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
      padding: 24,
      gap: 24,
    },
    title: {
      color: theme.colors.textPrimary,
      fontSize: 22,
      fontWeight: '600',
      textAlign: 'center',
      marginTop: 32,
    },
    row: {
      flexDirection: 'row',
      gap: 12,
      justifyContent: 'center',
      alignItems: 'center',
    },
    button: {
      paddingHorizontal: 16,
      paddingVertical: 12,
      borderRadius: 10,
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: theme.colors.border,
      backgroundColor: theme.colors.surface,
    },
    buttonActive: {
      backgroundColor: theme.colors.iconBackground,
      borderColor: theme.colors.textSecondary,
    },
    buttonText: {
      color: theme.colors.textPrimary,
      fontSize: 16,
      fontWeight: '500',
    },
    info: {
      color: theme.colors.textSecondary,
      textAlign: 'center',
    },
  });
};
