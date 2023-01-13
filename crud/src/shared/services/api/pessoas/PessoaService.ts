
import { Api } from '../axios-config';
import { Environment } from '../../../environment';


interface IListagemPessoas {
    id: number;
    nomeCompleto: string;
    email: string;
    cidadeId: number;
}

interface IDetalhePessoa {
    id: number;
    nomeCompleto: string;
    email: string;
    cidadeId: string;
}

type TPessoasComTotalCount = {
    data: IListagemPessoas[];
    totalCount: number
}

const getAll = async (numPage = 1, filter = ''): Promise<TPessoasComTotalCount | Error> => {
    try {
        const urlRelativa = `/pessoas?_pages=${numPage}&_limit=${Environment.LIMITE_DE_LINHAS}
        &nomeCompleto_like=${filter}`;

        const { data, headers } = await Api.get(urlRelativa);

        if(data){
            return {
                data,
                totalCount: Number(headers['x-total-count'] || Environment.LIMITE_DE_LINHAS),
            };
        }
        return new Error('Erro ao consultar os registros...');
    } catch (error) {
        console.error(error);
        return new Error((error as {message: string}).message || 'Erro ao consultar os registros...');
    }
};

const getById = async (): Promise<any> => { }

const create = async (): Promise<any> => { }

const updateById = async (): Promise<any> => { }

const deleteById = async (): Promise<any> => { }


export const PessoaService = {
    getAll,
    getById,
    create,
    updateById,
    deleteById
};