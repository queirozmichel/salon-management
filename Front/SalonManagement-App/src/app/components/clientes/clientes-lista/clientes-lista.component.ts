import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Cliente } from 'src/app/models/Cliente';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-clientes-lista',
  templateUrl: './clientes-lista.component.html',
  styleUrls: ['./clientes-lista.component.scss'],
})
export class ClientesListaComponent implements OnInit {
  public clientes: Cliente[] = [];
  public clienteId: number = 0;
  private _filtroTabela: string = '';
  public clientesFiltrados: Cliente[] = [];
  modalRef?: BsModalRef;

  public get filtroTabela(): string {
    return this._filtroTabela;
  }

  public set filtroTabela(value: string) {
    this._filtroTabela = value;
    this.clientesFiltrados = this.filtroTabela
      ? this.filtrarClientes(this.filtroTabela)
      : this.clientes;
  }

  constructor(
    private clienteService: ClienteService,
    private modalService: BsModalService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.spinner.show();
    this.carregarClientes();
  }

  public openModal(
    event: any,
    clienteId: number,
    template: TemplateRef<any>
  ): void {
    this.clienteId = clienteId;
    event.stopPropagation();
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }

  public confirmarExclusao(): void {
    this.modalRef?.hide();
    this.spinner.show();
    this.clienteService.deleteCliente(this.clienteId).subscribe(
      (resultado: any) => {
        console.log(resultado);
        this.toastr.success('O cliente foi excluído.', 'Sucesso!');
        this.spinner.hide();
        this.carregarClientes();
      },
      (error: any) => {
        console.error(error);
        this.toastr.error(
          `Erro ao tentar apagar o cliente de código ${this.clienteId}.`,
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

  public filtrarClientes(filtro: string): Cliente[] {
    filtro = filtro.toLocaleLowerCase();
    return this.clientes.filter(
      (cliente: any) => cliente.nome.toLocaleLowerCase().indexOf(filtro) !== -1
    );
  }

  public carregarClientes(): void {
    this.spinner.show();
    this.clienteService.getClientes().subscribe({
      next: (resposta: Cliente[]) => {
        (this.clientes = resposta), (this.clientesFiltrados = this.clientes);
      },
      error: (erro: any) => {
        this.spinner.hide();
        console.error(erro);
        this.toastr.error('Erro ao tentar carregar os clientes.', 'Erro!');
      },
      complete: () => {
        this.spinner.hide();
      },
    });
  }
  public detalheCliente(clienteId: number): void {
    this.router.navigate([`clientes/detalhe/${clienteId}`]);
  }
}
