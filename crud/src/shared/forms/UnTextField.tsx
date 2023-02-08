import { useEffect, useState } from 'react';
import { TextField, TextFieldProps } from '@mui/material';
import { useField } from '@unform/core';

type TUnTextFieldProps = TextFieldProps & {
  name: string
}

export const UnTextField: React.FC<TUnTextFieldProps> = ({ name, ...rest }) => {
  const { fieldName, defaultValue, registerField, clearError, error } = useField(name);

  const [value, setValue] = useState(defaultValue || '');

  useEffect(() => {
    registerField({
      name: fieldName,
      getValue: () => value,
      setValue: (ref, newValue) => setValue(newValue),

    });
  }, [registerField, fieldName, value]);

  return (
    <TextField
      {...rest}

      error={!!error}
      helperText={error}
      defaultValue={defaultValue}

      value={value}
      onChange={e => setValue(e.target.value)}

      onKeyDown={() => error ? clearError() : undefined}
    />
  );
};