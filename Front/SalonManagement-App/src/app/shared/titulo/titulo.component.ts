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
  @Input() botaoListarServicos: boolean = false;
  @Input() botaoNovoServico: boolean = false;

  constructor(private rota: Router) {}

  ngOnInit() {}

  public listar(): void {
    // this.rota.navigate([`/${this.titulo.toLocaleLowerCase()}/lista`]);
    this.rota.navigate([
      `/${this.titulo
        .normalize('NFD')
        .replace(/([\u0300-\u036f]|[^0-9a-zA-Z])/g, '')
        .toLocaleLowerCase()}/lista`,
    ]);
  }
}
