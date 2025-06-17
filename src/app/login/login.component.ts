import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { PerfilService } from '../service/perfil.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm = {
    email: '',
    senha: ''
  };

  constructor(private router: Router, private perfilService: PerfilService) {}

  validarLogin(form: NgForm): void {
    if (form.valid) {
      this.perfilService.autenticar(this.loginForm.email, this.loginForm.senha)
        .subscribe({
          next: (tipo) => {
            if (tipo) {
              alert('Login realizado com sucesso!');
              localStorage.setItem('usuarioLogado', 'true');
              localStorage.setItem('tipoUsuario', tipo); 
              this.router.navigate(['/']);
            } else {
              alert('Email ou senha incorretos!');
            }
          },
          error: (err) => {
            console.error(err);
            alert('Erro ao autenticar. Verifique o console.');
          }
        });
    } else {
      alert('Por favor, preencha todos os campos corretamente!');
    }
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
