import { createReducer, on } from '@ngrx/store';
import { Usuario } from 'src/app/models/usuario.model';
import { cargarUsuario, cargarUsuarioError, cargarUsuarioSuccess} from '../actions/usuario.actions';

export interface UsuarioState {
    id: string | null,
   user: Usuario | null,
   loaded: boolean,
   loading: boolean,
   error: any     
};

const usuarioInitialState: UsuarioState = {
    id: null,
    user: null,
    loaded: false,
    loading: false,
    error: null
};

export const usuarioReducer = createReducer(
    usuarioInitialState,
    on( cargarUsuario ,(state, {id}) => ({...state, loading: true, id: id})),
    on( cargarUsuarioSuccess,(state, { usuario }) => ({
        ...state,
        user: {...usuario},
        loading:false,
        loaded: true,
        
    })),
    on( cargarUsuarioError ,(state, { payload }) => ({
        ...state,
        loading:false,
        loaded: true,
        // Para obtener la información del error que sólo queremos
        error: {
            url: payload.url,
            name: payload.name,
            message: payload.message
        }        
    })),
);