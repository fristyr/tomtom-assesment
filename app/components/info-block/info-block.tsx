import React, {FC} from 'react';
import {Box, HStack, Icon, Text, VStack} from 'native-base';
import Ionicons from '@expo/vector-icons/Ionicons';

interface InfoBlockProps {
  bgColor?: string;
  color?: string;
  title: string;
  description?: string;
  icon?: keyof typeof Ionicons.glyphMap;
}
export const InfoBlock: FC<InfoBlockProps> = ({
  bgColor = 'white',
  color = 'primary.500',
  title,
  description,
  icon = 'albums-sharp',
}) => {
  return (
    <Box rounded="xl"  >
      <HStack alignItems="center" space="4">
        <Box>
          <Icon as={Ionicons} name={icon} size="24" color={color} />
        </Box>

        <VStack >
          <Text color={color}>{title}</Text>
          {description && <Text color={color}>{description}</Text>}
        </VStack>
      </HStack>
    </Box>
  );
};
