import { ActionReducerMap } from '@ngrx/store';
import { usuarioReducer, UsuarioState } from './reducer/usuario.reducer';
import { UsuariosState, usuariosReducer } from './reducer/usuarios.reducer';


export interface AppState {
    usuarios: UsuariosState
    usuario: UsuarioState

}


export const appReducers: ActionReducerMap<AppState> = {
    usuarios: usuariosReducer,
    usuario: usuarioReducer,

}