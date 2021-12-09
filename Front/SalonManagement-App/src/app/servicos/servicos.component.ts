import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ServicoService } from '../services/servico.service';

@Component({
  selector: 'app-servicos',
  templateUrl: './servicos.component.html',
  styleUrls: ['./servicos.component.scss'],
})
export class ServicosComponent implements OnInit {
  public servicos: any = [];
  private _filtroTabela: string = '';
  public servicosFiltrados: any = [];

  public get filtroTabela(): string {
    return this._filtroTabela;
  }

  public set filtroTabela(value: string) {
    this._filtroTabela = value;
    this.servicosFiltrados = this.filtroTabela
      ? this.filtrarServicos(this.filtroTabela)
      : this.servicos;
  }

  public filtrarServicos(filtro: string): any {
    filtro = filtro.toLocaleLowerCase();
    return this.servicos.filter(
      (servico: any) =>
        servico.cliente.toLocaleLowerCase().indexOf(filtro) !== -1 ||
        servico.dataServico.toLocaleLowerCase().indexOf(filtro) !== -1
    );
  }

  constructor(private servicoService: ServicoService) {}

  ngOnInit(): void {
    this.getServicos();
  }

  public getServicos(): void {
    this.servicoService.getServico().subscribe({
      next: (resposta: any) => {
        (this.servicos = resposta), (this.servicosFiltrados = this.servicos);
      },
      error: (erro: any) => console.error(erro),
      complete: () => {},
    });
  }
}
