import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { Profissional } from '../models/Profissional';

@Injectable()
export class ProfissionalService {
  baseURL = 'https://localhost:5001/api/profissionais';

  constructor(private Http: HttpClient) {}

  public getProfissionais(): Observable<Profissional[]> {
    return this.Http.get<Profissional[]>(this.baseURL).pipe(take(1));
  }

  public getProfissionaisByName(nome: string): Observable<Profissional[]> {
    return this.Http.get<Profissional[]>(`${this.baseURL}/nome/${nome}`).pipe(
      take(1)
    );
  }

  public getProfissionalById(id: number): Observable<Profissional> {
    return this.Http.get<Profissional>(`${this.baseURL}/${id}`).pipe(take(1));
  }

  public postProfissional(
    profissional: Profissional
  ): Observable<Profissional> {
    return this.Http.post<Profissional>(this.baseURL, profissional).pipe(
      take(1)
    );
  }

  public putProfissional(
    id: number,
    profissional: Profissional
  ): Observable<Profissional> {
    return this.Http.put<Profissional>(
      `${this.baseURL}/${id}`,
      profissional
    ).pipe(take(1));
  }

  public deleteProfissional(id: number): Observable<any> {
    return this.Http.delete(`${this.baseURL}/${id}`).pipe(take(1));
  }
}
