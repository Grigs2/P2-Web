import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarrinhoService } from '../service/carrinho.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-gravar-pedido',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './gravar-pedido.component.html',
  styleUrls: ['./gravar-pedido.component.css']
})
export class GravarPedidoComponent implements OnInit {
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
  obj = {
    itens: [] as any[],
    total: 0
  };

  constructor(private carrinhoService: CarrinhoService, private router: Router) {}

  ngOnInit(): void {
    const carrinhoLocal = localStorage.getItem('carrinho');
    if (carrinhoLocal) {
      try{this.obj = JSON.parse(carrinhoLocal);
          this.calcularTotal();
      }
      catch (error) {
        console.error('Erro ao carregar o carrinho do localStorage:', error);
        this.obj = { itens: [], total: 0 };
        }
      
      }
  }

  removerItem(id: number): void {
    this.obj.itens = this.obj.itens.filter(item => item.id !== id);
    this.calcularTotal();
    localStorage.setItem('carrinho', JSON.stringify(this.obj)); 
  }

  calcularTotal(): void {
    const itens = Array.isArray(this.obj.itens) ? this.obj.itens : [];
    this.obj.total = itens.reduce((soma, item) => soma + (item.preco || 0), 0);
  }

  limpar(): void {
    const idUsuario = localStorage.getItem('usuarioLogadoId');

    if (!idUsuario) {
    alert('Você precisa estar logado para finalizar a compra.');
    this.router.navigate(['/login']);
    return;
  }
    
    const carrinhoJson = localStorage.getItem('carrinho');
    if (!carrinhoJson || carrinhoJson === "[]" || carrinhoJson === "{}") {
      alert('Seu carrinho está vazio!');
      return;
    }
    const carrinho = JSON.parse(carrinhoJson || '{}');

    const dto = {
      id: carrinho.id || 0,
      total: carrinho.total,
      produtos: carrinho.itens.map((item: any) => ({
      id: item.id,
      nome: item.nome,
      descricao: item.descricao,
      preco: item.preco
      }))
    };

    this.carrinhoService.finalizarCompra(dto, idUsuario!).subscribe({
      next: (mensagem) => {
        alert(mensagem);
        this.obj = { itens: [], total: 0 };
        localStorage.removeItem('carrinho'); // limpa localStorage após sucesso
      },
      error: () => alert('Erro ao finalizar o pedido!')
    });
  }
}