import { Theme } from '@/source/core/types';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { Text } from '../../source/core/components';
import { useStyles } from '../../source/core/hooks';

export default function App() {
  const styles = useStyles(createStyles);

  return (
    <SafeAreaView style={styles.container}>
      <Text variant="header">Text variants</Text>

      <View style={styles.stack}>
        <Text>Body text (default)</Text>
        <Text variant="secondary">Secondary text</Text>
        <Text variant="caption">Caption text</Text>
        <Text variant="label">Label text</Text>
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
    stack: {
      gap: 8,
    },
  });
};
