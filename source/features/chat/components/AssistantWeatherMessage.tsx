import { Text } from '@/source/core/components';
import { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import { MessageActions } from './MessageActions';

type Props = {
  location: string;
  temperature: number;
};

export const AssistantWeatherMessage: FC<Props> = ({
  location,
  temperature,
}) => {
  const messageText = `The weather in ${location} is ${temperature}°F`;
  return (
    <View style={styles.itemContainer}>
      <Text>
        The weather in {location} is {temperature}°F
      </Text>
      <MessageActions messageText={messageText} />
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    paddingHorizontal: 16,
    alignItems: 'flex-start',
  },
});
