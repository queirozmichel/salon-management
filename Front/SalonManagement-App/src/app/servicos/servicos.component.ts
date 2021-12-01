import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-servicos',
  templateUrl: './servicos.component.html',
  styleUrls: ['./servicos.component.scss'],
})
export class ServicosComponent implements OnInit {
  public servicos: any;
  constructor(private clienteHttp: HttpClient) {}

  ngOnInit(): void {
    this.getServicos();
  }

  public getServicos(): void {
    this.clienteHttp.get('https://localhost:5001/api/servicos').subscribe({
      next: (resposta: any) => (this.servicos = resposta),
      error: (erro: any) => console.error(erro),
      complete: () => {},
    });
  }
}
