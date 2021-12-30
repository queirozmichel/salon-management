import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-servicos',
  templateUrl: './servicos.component.html',
  styleUrls: ['./servicos.component.scss'],
})
export class ServicosComponent implements OnInit {
  constructor(private router: Router) {}
  ngOnInit(): void {}

  public botaoListar(): boolean {
    if (this.router.url != '/servicos/lista') {
      return true;
    }
    return false;
  }

  public botaoNovo(): boolean {
    if (this.router.url != '/servicos/detalhe') {
      return true;
    }
    return false;
  }
}
