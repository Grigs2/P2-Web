import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Produto } from '../model/produto';
import { Carrinho } from '../model/carrinho';
import { FormsModule } from '@angular/forms';
import { ProdutoService } from '../service/produto.service'; // <=== IMPORTANTE

@Component({
  selector: 'app-vitrine',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './vitrine.component.html',
  styleUrls: ['./vitrine.component.css']
})
export class VitrineComponent implements OnInit {
  public mensagem: String = "";
  termoBusca: string = '';
  produtos: Produto[] = [];
  produtosFiltrados: Produto[] = [];

  constructor(private produtoService: ProdutoService) {}

  ngOnInit(): void {
    this.produtoService.listar().subscribe({
      next: (dados) => {
        this.produtos = dados;
        this.produtosFiltrados = [...dados];
      },
      error: (erro) => {
        console.error('Erro ao buscar produtos:', erro);
        alert('Erro ao buscar produtos do servidor.');
      }
    });
  }

  buscar(): void {
    const termo = this.termoBusca.trim().toLowerCase();

    if (termo === '') {
      this.produtos = [...this.produtosFiltrados];
    } else {
      this.produtos = this.produtosFiltrados.filter(produto =>
        produto.nome.toLowerCase().includes(termo)
      );
    }
  }

  adicionarAoCarrinho(item: Produto): void {
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

  carrinho() { location.href = "./gravar-pedido"; }
  cadastro() { location.href = "./cadastro"; }
  login() { location.href = "./login"; }
  menu() { location.href = "./"; }

  detalhe(obj: Produto) {
    localStorage.setItem("produto", JSON.stringify(obj));
    location.href = "./detalhe-produto";
  }
}
