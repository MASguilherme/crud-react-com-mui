
import { Environment } from '../../../environment';
import { Api } from '../axios-config';

export interface IListagemCidade {
  nomeCidade: string;
  id: number;
}

export interface IDetalheCidade {
  nomeCidade: string;
  id: number;
}

export type TCidadesTotalCount = {
  data: IListagemCidade[];
  totalCount: number;
}

const getAll = async (page = 1, filter = '', id = ''): Promise<TCidadesTotalCount | Error> => {

  try {
    const urlRelativa =
      `/cidades?_page=${page}&_limit=${Environment.LIMITE_DE_LINHAS}&nomeCidade_like=${filter}&id_like=${id}`;
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



const getById = async (id: number): Promise<IDetalheCidade | Error> => {

  try {
    const urlRelativa = `/cidades/${id}`;
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

const create = async (dados: Omit<IDetalheCidade, 'id'>): Promise<number | Error> => {

  try {
    const { data } = await Api.post<IDetalheCidade>('/cidades', dados);

    if (data) {
      return data.id;
    }
    return new Error('Erro ao criar registro...');

  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || 'Erro ao criar registro...');
  }
};


const updateById = async (id: number, dados: IDetalheCidade): Promise<void | Error> => {

  try {
    await Api.put(`/cidades/${id}`, dados);

  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || 'Erro ao atualizar registro...');
  }
};

const deleteById = async (id: number): Promise<void | Error> => {

  try {
    await Api.delete(`/cidades/${id}`);

  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || 'Erro ao deletar registro...');
  }
};


export const CidadesService = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
};  