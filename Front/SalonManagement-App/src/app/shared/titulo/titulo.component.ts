import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-titulo',
  templateUrl: './titulo.component.html',
  styleUrls: ['./titulo.component.scss'],
})
export class TituloComponent implements OnInit {
  @Input() titulo: string = '';
  @Input() iconeTitulo: string = '';
  @Input() textoBotaoNovo: string = '';
  @Input() botaoListar: boolean = false;
  @Input() botaoNovo: boolean = false;

  constructor(private rota: Router) {}

  ngOnInit() {}

  public listar(): void {
    this.rota.navigate([
      `/${this.titulo
        .normalize('NFD')
        .replace(/([\u0300-\u036f]|[^0-9a-zA-Z])/g, '')
        .toLocaleLowerCase()}/lista`,
    ]);
  }

  public novo(): void {
    this.rota.navigate([
      `/${this.titulo
        .normalize('NFD')
        .replace(/([\u0300-\u036f]|[^0-9a-zA-Z])/g, '')
        .toLocaleLowerCase()}/detalhe`,
    ]);
  }
}
