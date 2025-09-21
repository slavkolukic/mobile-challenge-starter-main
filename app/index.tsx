import { Theme } from '@/source/core/types';
import {
  ConversationStarterCarousel,
  MainAppHeader,
  MainInput,
  TemporaryChatInfo,
} from '@/source/features/chat/components';
import { useMemo, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useStyles } from '../source/core/hooks';

export default function MainScreen() {
  const styles = useStyles(createStyles);
  const [temporaryChatSelected, setTemporaryChatSelected] = useState(false);
  const [text, setText] = useState('');

  const isUserTyping = useMemo(() => {
    return text.length > 0;
  }, [text]);

  const handleSendMessage = () => {
    setText('');
  };

  const handlePressTemporaryChat = () => {
    setTemporaryChatSelected(previous => !previous);
  };

  const content = useMemo(() => {
    if (temporaryChatSelected) {
      return <TemporaryChatInfo />;
    }

    if (!isUserTyping) {
      return <ConversationStarterCarousel />;
    }

    return null;
  }, [temporaryChatSelected, isUserTyping]);

  return (
    <SafeAreaView style={styles.container}>
      <MainAppHeader
        temporaryChatSelected={temporaryChatSelected}
        onPressTemporaryChat={handlePressTemporaryChat}
      />
      <View style={styles.contentContainer}>{content}</View>
      <MainInput
        text={text}
        onTextChange={setText}
        onSendMessage={handleSendMessage}
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
    contentContainer: {
      flex: 1,
      paddingBottom: 16,
    },
  });
