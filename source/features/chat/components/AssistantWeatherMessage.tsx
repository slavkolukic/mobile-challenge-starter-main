//
import { useStyles, useTheme } from '@/source/core/hooks';
import { Theme } from '@/source/core/types';
import { FC, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { AnimatedWord } from './AnimatedWord';
import { MessageActions } from './MessageActions';

type Props = {
  location: string;
  temperature: number;
};

export const AssistantWeatherMessage: FC<Props> = ({
  location,
  temperature,
}) => {
  const primaryLine = `Currently ${Math.round(temperature)} °F`;
  const secondaryLine = `${location}`;
  const primaryWords = useMemo(() => {
    return primaryLine
      .split(/\s+/)
      .map(w => w.trim())
      .filter(Boolean);
  }, [primaryLine]);
  const secondaryWords = useMemo(() => {
    return secondaryLine
      .split(/\s+/)
      .map(w => w.trim())
      .filter(Boolean);
  }, [secondaryLine]);
  const styles = useStyles(createStyles);
  const { theme } = useTheme();

  return (
    <View style={styles.itemContainer}>
      <View style={styles.messageContainer}>
        <View style={styles.rowSpacing}>
          <View style={styles.charactersContainer}>
            {primaryWords.map((word, idx) => (
              <AnimatedWord
                key={`p-${idx}`}
                word={word}
                delay={idx * 18}
                textVariant="header2"
                textColor={theme.colors.textPrimary}
              />
            ))}
          </View>
        </View>
        <View style={styles.charactersContainer}>
          {secondaryWords.map((word, idx) => (
            <AnimatedWord
              key={`s-${idx}`}
              word={word}
              delay={150 + idx * 18}
              textVariant="secondary"
              textColor={theme.colors.textSecondary}
            />
          ))}
        </View>
      </View>
      <MessageActions messageText={`${primaryLine}. ${secondaryLine}`} />
    </View>
  );
};

const createStyles = (theme: Theme) => {
  return StyleSheet.create({
    itemContainer: {
      paddingHorizontal: 16,
      alignItems: 'flex-start',
    },
    messageContainer: {
      paddingVertical: 8,
    },
    rowSpacing: {
      marginBottom: 2,
    },
    charactersContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
  });
};
