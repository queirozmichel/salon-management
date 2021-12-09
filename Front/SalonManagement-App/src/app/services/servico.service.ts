import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ServicoService {
  baseURL = 'https://localhost:5001/api/servicos';
  constructor(private clienteHttp: HttpClient) {}

  getServico() {
    return this.clienteHttp.get(this.baseURL);
  }
}
