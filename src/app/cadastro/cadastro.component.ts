import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { PerfilService } from '../service/perfil.service'; // ajuste o caminho
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent {
  usuario = {
    nome: '', email: '', telefone: '', cep: '', rua: '', numero: '',
    complemento: '', cidade: '', bairro: '', estado: '', senha: '', confirmarSenha: ''
  };

  constructor(private perfilService: PerfilService) {}

  cadastrarUsuario(form: NgForm): void {
    if (form.valid && this.usuario.senha === this.usuario.confirmarSenha) {
      this.perfilService.salvar(this.usuario.nome, this.usuario.email, this.usuario.senha, 'cliente', this.usuario.telefone)
        .subscribe({
          next: (res) => {
            alert(res);
            form.resetForm();
            this.usuario = { nome: '', email: '', telefone: '', cep: '', rua: '', numero: '', complemento: '', cidade: '', bairro: '', estado: '', senha: '', confirmarSenha: '' };
          },
          error: (err) => {
            console.error(err);
            alert('Erro ao salvar usuário!');
          }
        });
    } else {
      alert('Por favor, preencha todos os campos corretamente!');
    }
  }
  carrinho() { location.href = "./gravar-pedido"; }
  cadastro() { location.href = "./cadastro"; }
  login() { location.href = "./login"; }
  menu() { location.href = "./"; }
}
