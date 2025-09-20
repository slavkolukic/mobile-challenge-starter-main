import { Theme } from '@/source/core/types';
import {
  ConversationStarterCarousel,
  MainAppHeader,
  TemporaryChatInfo,
} from '@/source/features/chat/components';
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

  const content = temporaryChatSelected ? (
    <TemporaryChatInfo />
  ) : (
    <ConversationStarterCarousel />
  );

  return (
    <SafeAreaView style={styles.container}>
      <MainAppHeader
        temporaryChatSelected={temporaryChatSelected}
        onPressTemporaryChat={handlePressTemporaryChat}
      />
      {content}
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
