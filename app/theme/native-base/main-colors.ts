import {useColorModeValue, useToken} from 'native-base';

const mainColors = ({type = 'main'}: {type: 'main' | 'bg' | 'text'}) => {
  switch (type) {
    case 'main':
      return useToken('colors', useColorModeValue('primary.500', 'coolGray.900'));
    case 'bg':
      return useToken('colors', useColorModeValue('support.100', 'coolGray.900'));

    case 'text':
      return useToken('colors', useColorModeValue('support.500', 'white'));

    default:
      return useToken('colors', useColorModeValue('primary.500', 'coolGray.900'));
  }
};

export {mainColors};
