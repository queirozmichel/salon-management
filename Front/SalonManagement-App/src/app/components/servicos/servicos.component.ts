import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

import { Servico } from '../../models/Servico';
import { ServicoService } from '../../services/servico.service';

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
