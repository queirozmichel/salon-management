import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Servico } from '../models/Servico';

@Injectable()
export class ServicoService {
  baseURL = 'https://localhost:5001/api/servicos';
  constructor(private Http: HttpClient) {}

  public getServicos(): Observable<Servico[]> {
    return this.Http.get<Servico[]>(this.baseURL);
  }

  public getServicosByData(data: string): Observable<Servico[]> {
    return this.Http.get<Servico[]>(`${this.baseURL}/data/${data}`);
  }

  public getServicoById(id: number): Observable<Servico> {
    return this.Http.get<Servico>(`${this.baseURL}/${id}`);
  }

  public postServico(servico: Servico): Observable<Servico> {
    return this.Http.post<Servico>(this.baseURL, servico);
  }

  public putServico(id: number, servico: Servico): Observable<Servico> {
    return this.Http.put<Servico>(`${this.baseURL}/${id}`, servico);
  }

  public deleteServico(id: number): Observable<any> {
    return this.Http.delete(`${this.baseURL}/${id}`);
  }
}
