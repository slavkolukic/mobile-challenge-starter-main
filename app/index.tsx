import { Theme } from '@/source/core/types';
import {
  ConversationStarterCarousel,
  MainAppHeader,
  MainInput,
  MessagesList,
  TemporaryChatInfo,
} from '@/source/features/chat/components';
import { generateAPIUrl } from '@/utils';
import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport } from 'ai';
import { fetch as expoFetch } from 'expo/fetch';
import { useCallback, useMemo, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useStyles } from '../source/core/hooks';

export default function MainScreen() {
  const [chatId, setChatId] = useState<number>(1);

  const { messages, sendMessage, status } = useChat({
    id: chatId?.toString(),
    transport: new DefaultChatTransport({
      fetch: expoFetch as unknown as typeof globalThis.fetch,
      api: generateAPIUrl('/api/chat'),
    }),
    onError: error => console.error(error, 'ERROR'),
  });

  const styles = useStyles(createStyles);
  const [temporaryChatSelected, setTemporaryChatSelected] = useState(false);
  const [text, setText] = useState('');

  const isUserTyping = useMemo(() => {
    return text.length > 0;
  }, [text]);

  const sessionStarted = useMemo(() => {
    return messages.length > 0;
  }, [messages]);

  const handleSendMessage = () => {
    sendMessage({ text: text.trim() });
    setText('');
  };

  const handlePressTemporaryChat = () => {
    setTemporaryChatSelected(previous => !previous);
  };

  const handlePressCompose = () => {
    setText('');
    setChatId(previous => previous + 1);
  };

  const handleConversationStarterCarouselItemSelected = useCallback(
    (prompt: string) => {
      sendMessage({ text: prompt });
    },
    [sendMessage]
  );

  const content = useMemo(() => {
    if (sessionStarted) {
      return <MessagesList messages={messages} />;
    }

    if (temporaryChatSelected) {
      return <TemporaryChatInfo />;
    }

    if (!isUserTyping) {
      return (
        <ConversationStarterCarousel
          onItemSelected={handleConversationStarterCarouselItemSelected}
        />
      );
    }

    return null;
  }, [
    temporaryChatSelected,
    isUserTyping,
    sessionStarted,
    messages,
    handleConversationStarterCarouselItemSelected,
  ]);

  return (
    <SafeAreaView style={styles.container}>
      <MainAppHeader
        sessionStarted={sessionStarted}
        temporaryChatSelected={temporaryChatSelected}
        onPressTemporaryChat={handlePressTemporaryChat}
        onPressCompose={handlePressCompose}
      />
      <View style={styles.contentContainer}>{content}</View>
      <MainInput
        text={text}
        onTextChange={setText}
        onSendMessage={handleSendMessage}
        actionsDisabled={status !== 'ready'}
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
