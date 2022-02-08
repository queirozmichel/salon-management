import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { Produto } from '../models/Produto';

@Injectable()
export class ProdutoService {
  baseURL = 'https://localhost:5001/api/produtos';
  constructor(private Http: HttpClient) {}

  public getProdutos(): Observable<Produto[]> {
    return this.Http.get<Produto[]>(this.baseURL).pipe(take(1));
  }

  public getProdutosByTipo(tipo: string): Observable<Produto[]> {
    return this.Http.get<Produto[]>(`${this.baseURL}/tipo/${tipo}`).pipe(
      take(1)
    );
  }

  public getProdutosByMarca(marca: string): Observable<Produto[]> {
    return this.Http.get<Produto[]>(`${this.baseURL}/marca/${marca}`).pipe(
      take(1)
    );
  }

  public getProdutoById(id: number): Observable<Produto> {
    return this.Http.get<Produto>(`${this.baseURL}/${id}`).pipe(take(1));
  }

  public postProduto(produto: Produto): Observable<Produto> {
    return this.Http.post<Produto>(this.baseURL, produto).pipe(take(1));
  }

  public putProduto(id: number, produto: Produto): Observable<Produto> {
    return this.Http.put<Produto>(`${this.baseURL}/${id}`, produto).pipe(
      take(1)
    );
  }

  public deleteProduto(id: number): Observable<any> {
    return this.Http.delete(`${this.baseURL}/${id}`).pipe(take(1));
  }
}
