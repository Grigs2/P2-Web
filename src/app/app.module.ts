import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { LoginComponent } from './login/login.component';
import { GravarPedidoComponent } from './gravar-pedido/gravar-pedido.component';
import { DetalheProdutoComponent } from './detalhe-produto/detalhe-produto.component';
import { routes } from './app.routes';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(routes),
    CadastroComponent,
    LoginComponent,
    GravarPedidoComponent,
    DetalheProdutoComponent,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }