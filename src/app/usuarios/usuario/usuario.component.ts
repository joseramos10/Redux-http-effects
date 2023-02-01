import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Usuario } from 'src/app/models/usuario.model';
import { AppState } from 'src/app/store/app.reducers';
import { cargarUsuario } from '../../store/actions/usuario.actions';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styles: []
})
export class UsuarioComponent implements OnInit {
  usuario: Usuario | null = {
    id: 0,
    first_name: '',
    last_name: '',
    avatar: ''
  };
  constructor( private router: ActivatedRoute, private store: Store<AppState> ) { }

  ngOnInit() {
    this.store.select('usuario').subscribe(action => {
      this.usuario = action?.user;
    })
    
    this.router.params.subscribe( ({id}) => {
        this.store.dispatch(cargarUsuario({id}));
    } )
  }

}
