
import { Environment } from '../../../environment';
import { Api } from '../axios-config';

export interface IListagemPessoa {
  nomeCompleto: string;
  cidadeId?: number;
  email: string;
  id: number;
}

export interface IDetalhePessoa {
  nomeCompleto: string;
  cidadeId?: number;
  email: string;
  id: number;
}

export type TPessoasTotalCount = {
  data: IListagemPessoa[];
  totalCount: number;
}

const getAll = async (page = 1, filter = ''): Promise<TPessoasTotalCount | Error> => {

  try {
    const urlRelativa =
      `/pessoas?_page=${page}&_limit=${Environment.LIMITE_DE_LINHAS}&nomeCompleto_like=${filter}`;
    const { data, headers } = await Api.get(urlRelativa);

    if (data) {
      return {
        data,
        totalCount: Number(headers['x-total-count'] || Environment.LIMITE_DE_LINHAS),
      };
    }
    return new Error('Erro ao buscar os registros...');

  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || 'Erro ao buscar os registros...');
  }
};



const getById = async (id: number): Promise<IDetalhePessoa | Error> => {

  try {
    const urlRelativa = `/pessoas/${id}`;
    const { data } = await Api.get(urlRelativa);

    if (data) {
      return data;
    }
    return new Error('Erro ao buscar o registro');

  } catch (error) {
    console.error(Error);
    return Error((error as { message: string }).message || 'Erro ao buscar o registro');
  }
}; export

const create = async (dados: Omit<IDetalhePessoa, 'id'>): Promise<number | Error> => {

  try {
    const { data } = await Api.post<IDetalhePessoa>('/pessoas', dados);

    if (data) {
      return data.id;
    }
    return new Error('Erro ao criar registro...');

  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || 'Erro ao criar registro...');
  }
};


const updateById = async (id: number, dados: IDetalhePessoa): Promise<void | Error> => {

  try {
    await Api.put(`/pessoas/${id}`, dados);

  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || 'Erro ao atualizar registro...');
  }
};

const deleteById = async (id: number): Promise<void | Error> => {

  try {
    await Api.delete(`/pessoas/${id}`);

  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || 'Erro ao deletar registro...');
  }
};


export const PessoasService = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
};  