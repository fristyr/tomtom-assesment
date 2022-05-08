export const buttonBaseStyle = {
  baseStyle: {
    rounded: 'xl',

    _text: {
      color: 'white',
      fontFamily: 'interstate',
      py: '2.5',
      _light: {
        color: 'white',
        fontSize: 'lg',
      },
      _dark: {
        color: 'white',
        fontSize: 'lg',
      },
    },
    _light: {
      bg: 'primary.500',
    },
    _dark: {
      bg: 'primary.500',
    },
    _disabled: {
      bg: 'primary.300',
      _text: {
        color: 'primary.500',
        _light: {
          color: 'primary.500',
        },
        _dark: {
          color: 'primary.500',
        },
      },
    },
  },
  variants: {
    'with-icon': {
      justifyContent: 'flex-start',
      pl: '4',
      _text: {
        pl: '1',
      },
    },
    'inverted': {
      _text: {
        _light: {
          color: 'primary.500',
        },
        _dark: {
          color: 'primary.500',
        },
      },
      _light: {
        bg: 'white',
      },
      _dark: {
        bg: 'white',
      },
    }
  },
  defaultProps: {
    variant: 'bp',
  },
};
