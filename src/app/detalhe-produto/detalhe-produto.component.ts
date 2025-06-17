import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Produto } from '../model/produto';
import { Carrinho } from '../model/carrinho';

@Component({
  selector: 'app-detalhe-produto',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detalhe-produto.component.html',
})


export class DetalheProdutoComponent{

  public obj: Produto = new Produto();
  public mensagem: String = "";
  public constructor(){
      let json = localStorage.getItem("produto");
      if(json==null){
        this.mensagem = "Ocorreu um erro de navegação, verifique!";
      } else {
        this.obj = JSON.parse(json);
      }
  }
  adicionarAoCarrinho(item: Produto): void {
     if (typeof window === 'undefined') return;
 
     let json = localStorage.getItem("carrinho");
     let carrinho: Carrinho = json ? JSON.parse(json) : new Carrinho();
 
     carrinho.itens = carrinho.itens ?? [];
     carrinho.total = carrinho.total ?? 0;
 
     carrinho.itens.push(item);
     carrinho.total += item.preco;
 
     localStorage.setItem("carrinho", JSON.stringify(carrinho));
     alert(`${item.nome} adicionado ao carrinho`);
 
     location.href = "/gravar-pedido";
   }
 
   carrinho() {
     location.href = "./gravar-pedido";
   }
 
   cadastro() {
     location.href = "./cadastro";
   }
 
   login() {
     location.href = "./login";
   }
 
   menu() {
     location.href = "./";
   }
 
  
}
