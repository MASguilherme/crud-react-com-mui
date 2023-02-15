import { useEffect, useState } from 'react';
import { Box, Grid, LinearProgress, Paper, Typography } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import * as yup from 'yup';

import { CidadesService } from '../../shared/services/api/cidades/CidadesService';
import { UnTextField, UnForm, useUnForm, IUnFormErrors } from '../../shared/forms';
import { FerramentaDeDetalhe } from '../../shared/components';
import { LayoutBaseDePagina } from '../../shared/layouts';

interface IFormData {
  nomeCidade: string;
}

const formValidationSchema: yup.Schema<IFormData> = yup.object().shape({
  nomeCidade: yup.string().required().min(3),
});

export const DetalheCidades: React.FC = () => {

  const { id = 'nova' } = useParams<'id'>();

  const navigate = useNavigate();

  const { formRef, isSaveAndClose, saveAndClose, save } = useUnForm();

  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState('');

  useEffect(() => {
    if (id !== 'nova') {
      setIsLoading(true);

      CidadesService.getById(Number(id))
        .then((result) => {
          setIsLoading(false);

          if (result instanceof Error) {
            alert(result.message);
            navigate('/cidades');
          } else {
            setName(result.nomeCidade);
            formRef.current?.setData(result);

            console.log(result);
          }
        });
    } else {
      formRef.current?.setData({
        nomeCidade: '',
      });
      navigate(`/cidades/detalhe/${id}`);
    }
  }, [id]);

  const handleSave = (dados: IFormData) => {

    formValidationSchema
      .validate(dados, { abortEarly: false })
      .then((dadosValidados) => {

        setIsLoading(true);

        if (id === 'nova') {
          CidadesService.create(dadosValidados)
            .then((result) => {
              setIsLoading(false);

              if (result instanceof Error) {
                alert(result.message);
              } else {
                if (isSaveAndClose()) {
                  alert('Cidade cadastrada com sucesso!');
                  navigate('/cidades');
                } else {
                  alert('Cidade cadastrada com sucesso!');
                  navigate(`/cidades/detalhe/${result}`);
                }
              }
            });
        } else {
          CidadesService.updateById(Number(id), { id: Number(id), ...dadosValidados })
            .then((result) => {
              setIsLoading(false);

              if (result instanceof Error) {
                alert(result.message);
              } else {
                if (isSaveAndClose()) {
                  alert('Atualizado com Sucesso!');
                  navigate('/cidades');
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
      CidadesService.deleteById(id)
        .then(result => {
          if (result instanceof Error) {
            alert(result.message);
          } else {
            alert('Apagado com sucesso!');
            navigate('/cidades');
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

          aoClicarVoltar={() => navigate('/cidades')}
          aoClicarNovo={() => navigate('/cidades/detalhe/nova')}
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
                  Geral:
                </Typography>
              </Grid>
            </Grid>

            <Grid container item
              spacing={3}
            >
              <Grid item xs={12} md={8} lg={6}>
                <UnTextField
                  placeholder='Nome da Cidade'
                  name='nomeCidade'
                  label='Nome da Cidade'
                  fullWidth disabled={isLoading}
                  onChange={e => setName(e.target.value)}
                />
              </Grid>

            </Grid>
          </Grid>

        </Box>
      </UnForm>

    </LayoutBaseDePagina>
  );
};