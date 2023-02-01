import { createAction, props } from "@ngrx/store";
import { Usuario } from "src/app/models/usuario.model";
import { UsuariosState } from "../reducer/usuarios.reducer";

export const cargarUsuarios = createAction('[Usuarios] Cargar Usuarios');
export const cargarUsuariosSuccess = createAction('[Usuarios] Cargar Usuarios success', props<{usuarios: Usuario[]}>());
export const cargarUsuariosError = createAction('[Usuarios] Cargar Usuarios error', props<{payload: any}>());

