import {AxiosError} from 'axios';


export const errorInterceptor = (error: AxiosError) =>{

    if(error.message === 'Network Error'){
        return Promise.reject(new Error('Erro de conexão com a internet.'));
    }

    if(error.response?.status === 401){
        // Do somenthing
    }

    return Promise.reject(error);
};