import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarrinhoService } from '../service/carrinho.service';

@Component({
  selector: 'app-gravar-pedido',
  standalone: true,
  imports: [CommonModule],
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

  constructor(private carrinhoService: CarrinhoService) {}

  ngOnInit(): void {
  const carrinhoLocal = localStorage.getItem('carrinho');
  if (carrinhoLocal) {
    // Recupera o carrinho do LocalStorage
    const carrinho = JSON.parse(carrinhoLocal);

    // Ajusta os dados do carrinho na estrutura esperada
    this.obj.itens = carrinho.itens ?? [];
    this.obj.total = carrinho.total ?? 0;

    this.calcularTotal();
  }
}

 removerItem(id: number): void {
  this.obj.itens = this.obj.itens.filter(item => item.id !== id);
  this.calcularTotal();

  // Salvar o objeto completo com total atualizado
  localStorage.setItem('carrinho', JSON.stringify(this.obj));
}

  calcularTotal(): void {
  // Garantir que seja um array para evitar erros
  if (!Array.isArray(this.obj.itens)) {
    this.obj.itens = [];
  }

  this.obj.total = this.obj.itens.reduce((sum, item) => sum + item.preco, 0);
}

  limpar(): void {
    const dto = {
      valor: this.obj.total,
      produtosCarrinhos: this.obj.itens.map(item => ({
        produto: { id: item.id }
      }))
    };

    this.carrinhoService.finalizarCompra(dto).subscribe({
      next: (mensagem) => {
        alert(mensagem);
        this.obj = { itens: [], total: 0 };
        localStorage.removeItem('carrinho'); // limpa localStorage após sucesso
      },
      error: () => alert('Erro ao finalizar o pedido!')
    });
  }
}
