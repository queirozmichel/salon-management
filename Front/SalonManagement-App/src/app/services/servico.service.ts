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
}
