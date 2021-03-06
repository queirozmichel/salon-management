import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Servico } from 'src/app/models/Servico';
import { ServicoService } from 'src/app/services/servico.service';

@Component({
  selector: 'app-servicos-lista',
  templateUrl: './servicos-lista.component.html',
  styleUrls: ['./servicos-lista.component.scss'],
})
export class ServicosListaComponent implements OnInit {
  public servicos: Servico[] = [];
  public servicoId: number = 0;
  private _filtroTabela: string = '';
  public servicosFiltrados: Servico[] = [];
  modalRef?: BsModalRef;

  public get filtroTabela(): string {
    return this._filtroTabela;
  }

  public set filtroTabela(value: string) {
    this._filtroTabela = value;
    this.servicosFiltrados = this.filtroTabela
      ? this.filtrarServicos(this.filtroTabela)
      : this.servicos;
  }

  constructor(
    private servicoService: ServicoService,
    private modalService: BsModalService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.spinner.show();
    this.carregarServicos();
  }

  public openModal(
    event: any,
    servicoId: number,
    template: TemplateRef<any>
  ): void {
    this.servicoId = servicoId;
    event.stopPropagation();
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }

  public confirmarExclusao(): void {
    this.modalRef?.hide();
    this.spinner.show();
    this.servicoService.deleteServico(this.servicoId).subscribe(
      (resultado: any) => {
        this.toastr.success('O serviço foi excluído.', 'Sucesso!');
        this.spinner.hide();
        this.carregarServicos();
      },
      (error: any) => {
        console.error(error);
        this.toastr.error(
          `Erro ao tentar apagar o serviço de código ${this.servicoId}.`,
          'Erro!'
        );
        this.spinner.hide();
      },
      () => {
        this.spinner.hide();
      }
    );
  }

  public negarExclusao(): void {
    this.modalRef?.hide();
  }

  public filtrarServicos(filtro: string): Servico[] {
    filtro = filtro.toLocaleLowerCase();
    return this.servicos.filter(
      (servico: any) =>
        servico.data.toLocaleLowerCase().indexOf(filtro) !== -1 ||
        servico.cliente.nome.toLocaleLowerCase().indexOf(filtro) !== -1
    );
  }

  public carregarServicos(): void {
    this.spinner.show();
    this.servicoService.getServicos().subscribe({
      next: (resposta: Servico[]) => {
        (this.servicos = resposta), (this.servicosFiltrados = this.servicos);
      },
      error: (erro: any) => {
        this.spinner.hide();
        console.error(erro);
        this.toastr.error('Erro ao tentar carregar os serviços.', 'Erro!');
      },
      complete: () => {
        this.spinner.hide();
      },
    });
  }
  public detalheServico(servicoId: number): void {
    this.router.navigate([`servicos/detalhe/${servicoId}`]);
  }
}
