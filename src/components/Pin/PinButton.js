import React, {useState} from 'react';
import {SafeAreaView, Text, View} from 'react-native';

import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';

import styles from './PinButtonStyles';

const PinButton = ({onSucces, CELL_COUNT}) => {
  const [enableMask, setEnableMask] = useState(true);
  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  const toggleMask = () => setEnableMask(f => !f);
  const renderCell = ({index, symbol, isFocused}) => {
    let textChild = null;

    if (symbol) {
      textChild = enableMask ? '•' : symbol;
    } else if (isFocused) {
      textChild = <Cursor />;
    }

    return (
      <Text
        key={index}
        style={[styles.cell, isFocused && styles.focusCell]}
        onLayout={getCellOnLayoutHandler(index)}>
        {textChild}
      </Text>
    );
  };

  const onSubmit = res => {
    setValue(res);
    onSucces(res);
  };

  return (
    <CodeField
      ref={ref}
      {...props}
      value={value}
      onChangeText={onSubmit}
      cellCount={CELL_COUNT}
      keyboardType="number-pad"
      textContentType="oneTimeCode"
      renderCell={renderCell}
      autoFocus={true}
      focusable={true}
    />
  );
};

export default PinButton;
