import { MainAppHeader, Text } from '@/source/core/components';
import { Theme } from '@/source/core/types';
import { FlashList } from '@shopify/flash-list';
import { useState } from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useStyles } from '../source/core/hooks';

export default function MainScreen() {
  const styles = useStyles(createStyles);
  const [temporaryChatSelected, setTemporaryChatSelected] = useState(false);

  const handlePressTemporaryChat = () => {
    setTemporaryChatSelected(previous => !previous);
  };

  return (
    <SafeAreaView style={styles.container}>
      <MainAppHeader
        temporaryChatSelected={temporaryChatSelected}
        onPressTemporaryChat={handlePressTemporaryChat}
      />
      <FlashList
        data={['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']}
        renderItem={({ item }) => {
          return <Text style={{ opacity: 0 }}>{item}</Text>;
        }}
      />
    </SafeAreaView>
  );
}

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
  });
