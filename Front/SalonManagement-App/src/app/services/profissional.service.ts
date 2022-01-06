import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Profissional } from '../models/Profissional';

@Injectable()
export class ProfissionalService {
  baseURL = 'https://localhost:5001/api/profissionais';

  constructor(private Http: HttpClient) {}

  public getProfissionais(): Observable<Profissional[]> {
    return this.Http.get<Profissional[]>(this.baseURL);
  }

  public getProfissionaisByName(nome: string): Observable<Profissional[]> {
    return this.Http.get<Profissional[]>(`${this.baseURL}/nome/${nome}`);
  }

  public getProfissionalById(id: number): Observable<Profissional> {
    return this.Http.get<Profissional>(`${this.baseURL}/${id}`);
  }

  public postProfissional(
    profissional: Profissional
  ): Observable<Profissional> {
    return this.Http.post<Profissional>(this.baseURL, profissional);
  }

  public putProfissional(
    id: number,
    profissional: Profissional
  ): Observable<Profissional> {
    return this.Http.put<Profissional>(`${this.baseURL}/${id}`, profissional);
  }

  public deleteProfissional(id: number): Observable<any> {
    return this.Http.delete(`${this.baseURL}/${id}`);
  }
}
