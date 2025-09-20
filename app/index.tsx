import { Theme } from '@/source/core/types';
import { SafeAreaView, StyleSheet } from 'react-native';
import { Text } from '../source/core/components';
import { useStyles } from '../source/core/hooks';

export default function MainScreen() {
  const styles = useStyles(createStyles);
  return (
    <SafeAreaView style={styles.container}>
      <Text variant="header">Main screen</Text>
    </SafeAreaView>
  );
}

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
      padding: 24,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
