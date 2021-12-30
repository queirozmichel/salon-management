import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss'],
})
export class ClientesComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {}

  public botaoListar(): boolean {
    if (this.router.url != '/clientes/lista') {
      return true;
    }
    return false;
  }

  public botaoNovo(): boolean {
    if (this.router.url != '/clientes/detalhe') {
      return true;
    }
    return false;
  }
}
