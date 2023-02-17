import { useEffect, useState } from 'react';
import { Box, Grid, LinearProgress, Paper, Typography } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import * as yup from 'yup';

import { PessoasService } from '../../shared/services/api/pessoas/PessoasService';
import { UnTextField, UnForm, useUnForm, IUnFormErrors } from '../../shared/forms';
import { AutoCompleteCidade } from '../components/AutoCompleteCidade';
import { FerramentaDeDetalhe } from '../../shared/components';
import { LayoutBaseDePagina } from '../../shared/layouts';

interface IFormData {
  nomeCompleto: string;
  email: string;
  cidadeId: number;
}

const formValidationSchema: yup.Schema<IFormData> = yup.object().shape({
  nomeCompleto: yup.string().required().min(3),
  email: yup.string().required().email(),
  cidadeId: yup.number().required(),
});

export const DetalheDePessoa: React.FC = () => {

  const { id = 'nova' } = useParams<'id'>();

  const navigate = useNavigate();

  const { formRef, isSaveAndClose, saveAndClose, save } = useUnForm();

  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState('');

  useEffect(() => {
    if (id !== 'nova') {
      setIsLoading(true);

      PessoasService.getById(Number(id))
        .then((result) => {
          setIsLoading(false);

          if (result instanceof Error) {
            alert(result.message);
            navigate('/pessoas');
          } else {
            setName(result.nomeCompleto);
            formRef.current?.setData(result);

            console.log(result);
          }
        });
    } else {
      formRef.current?.setData({
        nomeCompleto: '',
        email: '',
        cidadeId: undefined,
      });
      navigate(`/pessoas/detalhe/${id}`);
    }
  }, [id]);

  const handleSave = (dados: IFormData) => {

    formValidationSchema
      .validate(dados, { abortEarly: false })
      .then((dadosValidados) => {

        setIsLoading(true);

        if (id === 'nova') {
          PessoasService.create(dadosValidados)
            .then((result) => {
              setIsLoading(false);

              if (result instanceof Error) {
                alert(result.message);
              } else {
                if (isSaveAndClose()) {
                  alert('Pessoa cadastrada com sucesso!');
                  navigate('/pessoas');
                } else {
                  alert('Pessoa cadastrada com sucesso!');
                  navigate(`/pessoas/detalhe/${result}`);
                }
              }
            });
        } else {
          PessoasService.updateById(Number(id), { id: Number(id), ...dadosValidados })
            .then((result) => {
              setIsLoading(false);

              if (result instanceof Error) {
                alert(result.message);
              } else {
                if (isSaveAndClose()) {
                  alert('Atualizado com Sucesso!');
                  navigate('/pessoas');
                } else {
                  alert('Atualizado com Sucesso!');
                }
              }
            });
        }

      })
      .catch((errorsOfValidation: yup.ValidationError) => {
        const validationErrors: IUnFormErrors = {};

        errorsOfValidation.inner.forEach(error => {
          if (!error.path) return;

          validationErrors[error.path] = error.message;
        });

        formRef.current?.setErrors(validationErrors);
        console.log(validationErrors);
      });


  };

  const handleDelete = (id: number) => {
    if (confirm(`Deseja apagar o cadastro de ${name}?`)) {
      PessoasService.deleteById(id)
        .then(result => {
          if (result instanceof Error) {
            alert(result.message);
          } else {
            alert('Apagado com sucesso!');
            navigate('/pessoas');
          }
        });
    }
  };


  return (
    <LayoutBaseDePagina
      titulo={id !== 'nova' ? name : 'Cadastrar'}
      barraDeFerramentas={
        <FerramentaDeDetalhe
          textoBotaoNovo='nova'
          textoBotaoSalvar={id !== 'nova' ? 'Atualizar' : 'Salvar'}
          textoBotaoSalvarEFechar={id !== 'nova' ? 'Atualizar e Fechar' : 'Salvar e Fechar'}
          mostrarBotaoSalvarEFechar
          mostrarBotaoApagar={id !== 'nova'}
          mostrarBotaoNovo={id !== 'nova'}

          aoClicarVoltar={() => navigate('/pessoas')}
          aoClicarNovo={() => navigate('/pessoas/detalhe/nova')}
          aoClicarApagar={() => handleDelete(Number(id))}
          aoClicarSalvar={save}
          aoClicarSalvarEFechar={saveAndClose}
        />
      }
    >
      <UnForm ref={formRef} onSubmit={handleSave}>

        <Box component={Paper} variant='outlined'
          padding={2}
        >
          <Grid container>

            <Grid item xs={12} paddingY={1}>
              {isLoading && (<LinearProgress variant='indeterminate' />)}
            </Grid>

            <Grid container item direction='row' paddingBottom={3}>
              <Grid item xs={12}>
                <Typography variant='h5'>
                  Informações:
                </Typography>
              </Grid>
            </Grid>

            <Grid container item
              spacing={3}
            >
              <Grid item xs={12} md={8} lg={6}>
                <UnTextField
                  placeholder='Nome Completo'
                  name='nomeCompleto'
                  label='Nome Completo'
                  fullWidth disabled={isLoading}
                  onChange={e => setName(e.target.value)}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <UnTextField
                  placeholder='E-mail'
                  name='email'
                  label='email'
                  fullWidth disabled={isLoading}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <AutoCompleteCidade AutoCompleteLoading={isLoading} />
              </Grid>

            </Grid>
          </Grid>

        </Box>
      </UnForm>

    </LayoutBaseDePagina>
  );
};