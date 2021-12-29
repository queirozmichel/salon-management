import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Servico } from '../models/Servico';

@Injectable()
export class ServicoService {
  baseURL = 'https://localhost:5001/api/servicos';
  constructor(private clienteHttp: HttpClient) {}

  public getServicos(): Observable<Servico[]> {
    return this.clienteHttp.get<Servico[]>(this.baseURL);
  }

  public getServicosByData(data: string): Observable<Servico[]> {
    return this.clienteHttp.get<Servico[]>(`${this.baseURL}/data/${data}`);
  }

  public getServicoById(id: number): Observable<Servico> {
    return this.clienteHttp.get<Servico>(`${this.baseURL}/${id}`);
  }

  public postServico(servico: Servico): Observable<Servico> {
    return this.clienteHttp.post<Servico>(this.baseURL, servico);
  }

  public putServico(id: number, servico: Servico): Observable<Servico> {
    return this.clienteHttp.put<Servico>(`${this.baseURL}/${id}`, servico);
  }

  public deleteServico(id: number): Observable<any> {
    return this.clienteHttp.delete(`${this.baseURL}/${id}`);
  }
}
