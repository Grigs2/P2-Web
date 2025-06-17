// app.routes.ts
import { Routes } from '@angular/router';
import { CadastroComponent } from './cadastro/cadastro.component';
import { LoginComponent } from './login/login.component';
import { GravarPedidoComponent } from './gravar-pedido/gravar-pedido.component';
import { DetalheProdutoComponent } from './detalhe-produto/detalhe-produto.component';
import { VitrineComponent} from './vitrine/vitrine.component';
import { Pag2Component } from './pag2/pag2.component';

export const routes: Routes = [
  { path: 'pag2', component: Pag2Component }, 
  { path: '', component: VitrineComponent }, 
  { path: 'cadastro', component: CadastroComponent },
  { path: 'login', component: LoginComponent },
  { path: 'gravar-pedido', component: GravarPedidoComponent },
  { path: 'detalhe-produto', component: DetalheProdutoComponent },
  { path: 'vitrine', component: VitrineComponent }
];

