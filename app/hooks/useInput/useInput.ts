import React from 'react';

export const useInput = (initialValue: string) => {
  const [value, setValue] = React.useState(initialValue);

  const handleChange = (text: string) => setValue(text);

  return {
    value,
    onChangeText: handleChange,
  };
};
