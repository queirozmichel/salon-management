import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.scss'],
})
export class ProdutosComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {}

  public botaoListar(): boolean {
    if (this.router.url != '/produtos/lista') {
      return true;
    }
    return false;
  }

  public botaoNovo(): boolean {
    if (this.router.url != '/produtos/detalhe') {
      return true;
    }
    return false;
  }
}
