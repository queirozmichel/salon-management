import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Profissional } from 'src/app/models/Profissional';
import { ProfissionalService } from 'src/app/services/profissional.service';

@Component({
  selector: 'app-profissionais-lista',
  templateUrl: './profissionais-lista.component.html',
  styleUrls: ['./profissionais-lista.component.scss'],
})
export class ProfissionaisListaComponent implements OnInit {
  public profissionais: Profissional[] = [];
  public profissionalId: number = 0;
  private _filtroTabela: string = '';
  public profissionaisFiltrados: Profissional[] = [];
  modalRef?: BsModalRef;

  public get filtroTabela(): string {
    return this._filtroTabela;
  }

  public set filtroTabela(value: string) {
    this._filtroTabela = value;
    this.profissionaisFiltrados = this.filtroTabela
      ? this.filtrarProfissionais(this.filtroTabela)
      : this.profissionais;
  }

  constructor(
    private profissionalService: ProfissionalService,
    private modalService: BsModalService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private router: Router
  ) {}

  ngOnInit() {
    this.spinner.show();
    this.carregarProfissionais();
  }

  public openModal(
    event: any,
    profissionalId: number,
    template: TemplateRef<any>
  ): void {
    this.profissionalId = profissionalId;
    event.stopPropagation();
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }

  public confirmarExclusao(): void {
    this.modalRef?.hide();
    this.spinner.show();
    this.profissionalService.deleteProfissional(this.profissionalId).subscribe(
      (resultado: any) => {
        console.log(resultado);
        this.toastr.success('O profissional foi excluído.', 'Sucesso!');
        this.spinner.hide();
        this.carregarProfissionais();
      },
      (error: any) => {
        console.error(error);
        this.toastr.error(
          `Erro ao tentar apagar o profissional de código ${this.profissionalId}.`,
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

  public filtrarProfissionais(filtro: string): Profissional[] {
    filtro = filtro.toLocaleLowerCase();
    return this.profissionais.filter(
      (profissional: any) =>
        profissional.nome.toLocaleLowerCase().indexOf(filtro) !== -1
    );
  }

  public carregarProfissionais(): void {
    this.spinner.show();
    this.profissionalService.getProfissionais().subscribe({
      next: (resposta: Profissional[]) => {
        (this.profissionais = resposta),
          (this.profissionaisFiltrados = this.profissionais);
      },
      error: (erro: any) => {
        this.spinner.hide();
        console.error(erro);
        this.toastr.error('Erro ao tentar carregar os profissionais.', 'Erro!');
      },
      complete: () => {
        this.spinner.hide();
      },
    });
  }

  public detalheProfissional(profissionalId: number): void {
    this.router.navigate([`profissionais/detalhe/${profissionalId}`]);
  }
}
