import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { UsuarioService } from 'src/app/services/usuario.service';
import { cargarUsuario, cargarUsuarioSuccess } from '../actions/usuario.actions';
import { cargarUsuarios, cargarUsuariosSuccess, cargarUsuariosError } from '../actions/usuarios.actions';

@Injectable()
export class UsuariosEffects {
    // Observable que está escuchando las acciones:
    constructor(
        private actions$: Actions,
        private usuariosService: UsuarioService
    ){}

    // Crear efecto para mostrar todos los usarios de la primera pestaña.
    cargarUsuarios$ = createEffect(
        () => this.actions$.pipe(
            // Cuál es la acción a evaluar, se queda en el ofType y no pasa al siguiente si por ejemplo se escucha otra acción
            ofType( cargarUsuarios ),
            tap( data => console.log('effect tap ', data)),
            mergeMap(
                () => this.usuariosService.getUsers().pipe(
                    tap( data => console.log('getUsers effect', data)),
                    map( users => cargarUsuariosSuccess({ usuarios: users })),
                    // Aquí es recomendado capturar el error
                    catchError ( err => of(cargarUsuariosError( {payload: err})))
                )
            )
        )
    );

    // Crear efecto para mostrar el usuario en la pestaña usuarios ( cuando buscas por id )
    cargarUsuario$ = createEffect(
        () => this.actions$.pipe(
            // Cuál es la acción a evaluar, se queda en el ofType y no pasa al siguiente si por ejemplo se escucha otra acción
            ofType( cargarUsuario ),
            tap( data => console.log('effect tap ', data)),
            mergeMap(
                (action) => this.usuariosService.getUsersById(action.id).pipe(
                    tap( data => console.log('getUsers effect', data)),
                    map( user => cargarUsuarioSuccess({ usuario: user })),
                    // Aquí es recomendado capturar el error
                    catchError ( err => of(cargarUsuariosError( {payload: err})))
                )
            )
        )
    );
}