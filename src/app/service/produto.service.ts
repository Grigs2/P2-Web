import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Produto } from '../model/produto';


import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProdutoService {
  private url = 'http://localhost:8080/BackEndWeb/api/Produtos';

  constructor(private http: HttpClient) {}

  listar(): Observable<Produto[]> {
    return this.http.get<Produto[]>(`${this.url}/Listar`);
  }

  salvar(produto: Produto): Observable<string> {
    return this.http.post(`${this.url}/Salvar`, produto, { responseType: 'text' });
  }
}
