import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { Cliente } from '../models/Cliente';

@Injectable()
export class ClienteService {
  baseURL = 'https://localhost:5001/api/clientes';
  constructor(private Http: HttpClient) {}

  public getClientes(): Observable<Cliente[]> {
    return this.Http.get<Cliente[]>(this.baseURL).pipe(take(1));
  }

  public getClientesByName(nome: string): Observable<Cliente[]> {
    return this.Http.get<Cliente[]>(`${this.baseURL}/nome/${nome}`).pipe(
      take(1)
    );
  }

  public getClienteById(id: number): Observable<Cliente> {
    return this.Http.get<Cliente>(`${this.baseURL}/${id}`).pipe(take(1));
  }

  public postCliente(cliente: Cliente): Observable<Cliente> {
    return this.Http.post<Cliente>(this.baseURL, cliente).pipe(take(1));
  }

  public putCliente(id: number, cliente: Cliente): Observable<Cliente> {
    return this.Http.put<Cliente>(`${this.baseURL}/${id}`, cliente).pipe(
      take(1)
    );
  }

  public deleteCliente(id: number): Observable<any> {
    return this.Http.delete(`${this.baseURL}/${id}`).pipe(take(1));
  }
}
