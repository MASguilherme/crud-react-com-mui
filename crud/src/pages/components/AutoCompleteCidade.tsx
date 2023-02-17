import { useState, useEffect, useMemo } from 'react';
import { Autocomplete, CircularProgress, TextField } from '@mui/material';
import { useField } from '@unform/core';

import { CidadesService } from '../../shared/services/api/cidades/CidadesService';
import { useDebounce } from '../../shared/hooks';

type TAutoCompleteCidade = {
  id: number;
  label: string;
}

interface IAutoCompleteCidadeProps {
  AutoCompleteLoading?: boolean;
}

export const AutoCompleteCidade: React.FC<IAutoCompleteCidadeProps> = ({ AutoCompleteLoading = false }) => {

  const { fieldName, registerField, defaultValue, clearError, error } = useField('cidadeId');

  const { debounce } = useDebounce();

  const [listOptions, setListOptions] = useState<TAutoCompleteCidade[]>([]);

  const [isLoading, setIsLoading] = useState(false);

  const [search, setSearch] = useState('');

  const [selectedId, setSelectedId] = useState<number | undefined>(undefined);

  useEffect(() => {
    registerField({
      name: fieldName,
      getValue: () => selectedId,
      setValue: (_, newSelectedId) => setSelectedId(newSelectedId),
    });
  }, [registerField, fieldName, selectedId]);

  useEffect(() => {
    debounce(() => {
      setIsLoading(true);

      CidadesService.getAll(1, search, selectedId?.toString())
        .then((result) => {
          setIsLoading(false);

          if (result instanceof Error) {
            alert(result.message);
          } else {
            console.log(result);
            setListOptions(result.data.map(
              cidade => (
                {
                  id: cidade.id,
                  label: cidade.nomeCidade,
                }
              )
            ));
          }
        });
    });
  }, [search, selectedId]);

  const autoCompleteSelectedOption = useMemo(() => {
    if (!selectedId) return null;

    const selectedOption = listOptions.find(option => option.id === selectedId);
    if (!selectedOption) return null;

    return selectedOption;
  }, [selectedId, listOptions]);

  return (
    <Autocomplete
      openText='Abrir'
      closeText='Fechar'
      noOptionsText='Sem opções'
      loadingText='Carregando...'
      disablePortal

      value={autoCompleteSelectedOption}
      loading={isLoading}
      disabled={AutoCompleteLoading}
      popupIcon={(AutoCompleteLoading || isLoading) ? <CircularProgress size={28} /> : undefined}
      onInputChange={(_, newValue) => setSearch(newValue)}
      options={listOptions}

      onChange={(_, newValue) => {
        setSelectedId(newValue?.id);
        setSearch('');
        clearError();
      }}

      renderInput={(params) => (
        <TextField
          {...params}
          label='Cidade'
          error={!!error}
          helperText={error}
        />
      )}
    />
  );
};