import { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { LinearProgress } from '@mui/material';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';

import { PessoasService } from '../../shared/services/api/pessoas/PessoasService';
import { FerramentaDeDetalhe } from '../../shared/components';
import { LayoutBaseDePagina } from '../../shared/layouts';
import { UnTextField } from '../../shared/forms';

interface IFormData {
  nomeCompleto: string;
  email: string;
  cidadeId: number;
}

export const DetalheDePessoa: React.FC = () => {

  const { id = 'nova' } = useParams<'id'>();

  const navigate = useNavigate();

  const formRef = useRef<FormHandles>(null);

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
            formRef.current?.setData(result);
            setName(result.nomeCompleto);
            console.log(result);
          }
        });
    }
  }, [id]);

  const handleSave = (dados: IFormData) => {
    setIsLoading(true);

    if (id === 'nova') {
      PessoasService.create(dados)
        .then((result) => {
          setIsLoading(false);

          if (result instanceof Error) {
            alert(result.message);
          } else {
            alert('Pessoa cadastrada com sucesso!');
            navigate(`/pessoas/detalhe/${result}`);
          }
        });
    } else {
      PessoasService.updateById(Number(id), {id: Number(id), ...dados})
        .then((result) => {
          setIsLoading(false);

          if (result instanceof Error) {
            alert(result.message);
          } else {
            alert('Atualizado com Sucesso!');
          }
        });
    }
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

  interface IEndereco {
    endereco: {
      rua: string,
      numero: number,
    }
  }

  return (
    <LayoutBaseDePagina
      titulo={id !== 'nova' ? name : 'Cadastrar'}
      barraDeFerramentas={
        <FerramentaDeDetalhe
          textoBotaoNovo='nova'
          mostrarBotaoSalvarEFechar
          mostrarBotaoApagar={id !== 'nova'}
          mostrarBotaoNovo={id !== 'nova'}

          aoClicarVoltar={() => navigate('/pessoas  ')}
          aoClicarNovo={() => navigate('/pessoas/detalhe/nova')}
          aoClicarApagar={() => handleDelete(Number(id))}
          aoClicarSalvar={formRef.current?.submitForm}
          aoClicarSalvarEFechar={formRef.current?.submitForm}
        />
      }
    >

      <Form ref={formRef} onSubmit={handleSave}>

        <UnTextField placeholder='Nome Completo' name='nomeCompleto' />

        <UnTextField placeholder='E-mail' name='email' />

        <UnTextField placeholder='Cidade Id' name='cidadeId' />

      </Form>

    </LayoutBaseDePagina>
  );
};