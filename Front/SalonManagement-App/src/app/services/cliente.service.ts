import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cliente } from '../models/Cliente';

@Injectable()
export class ClienteService {
  baseURL = 'https://localhost:5001/api/clientes';
  constructor(private Http: HttpClient) {}

  public getClientes(): Observable<Cliente[]> {
    return this.Http.get<Cliente[]>(this.baseURL);
  }

  public getClientesByName(nome: string): Observable<Cliente[]> {
    return this.Http.get<Cliente[]>(`${this.baseURL}/nome/${nome}`);
  }

  public getClienteById(id: number): Observable<Cliente> {
    return this.Http.get<Cliente>(`${this.baseURL}/${id}`);
  }

  public postCliente(cliente: Cliente): Observable<Cliente> {
    return this.Http.post<Cliente>(this.baseURL, cliente);
  }

  public putCliente(id: number, cliente: Cliente): Observable<Cliente> {
    return this.Http.put<Cliente>(`${this.baseURL}/${id}`, cliente);
  }

  public deleteCliente(id: number): Observable<any> {
    return this.Http.delete(`${this.baseURL}/${id}`);
  }
}
