import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profissionais',
  templateUrl: './profissionais.component.html',
  styleUrls: ['./profissionais.component.scss'],
})
export class ProfissionaisComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {}

  public botaoListar(): boolean {
    if (this.router.url != '/profissionais/lista') {
      return true;
    }
    return false;
  }

  public botaoNovo(): boolean {
    if (this.router.url != '/profissionais/detalhe') {
      return true;
    }
    return false;
  }
}
