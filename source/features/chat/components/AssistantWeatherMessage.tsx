import { Text } from '@/source/core/components';
import { FC } from 'react';
import { StyleSheet, View } from 'react-native';

type Props = {
  location: string;
  temperature: number;
};

export const AssistantWeatherMessage: FC<Props> = ({
  location,
  temperature,
}) => {
  return (
    <View style={styles.itemContainer}>
      <Text>
        The weather in {location} is {temperature}°F
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    paddingHorizontal: 16,
    alignItems: 'flex-start',
  },
});
