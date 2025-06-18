import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarrinhoService {
  private apiUrl = 'http://localhost:8080/BackEndWeb/api/Carrinho';

  constructor(private http: HttpClient) {}

  finalizarCompra(dto: any, idUsuario: string): Observable<string> {
    return this.http.post(`${this.apiUrl}/FinalizarCompra/${idUsuario}`, dto, { responseType: 'text' });
  }
}