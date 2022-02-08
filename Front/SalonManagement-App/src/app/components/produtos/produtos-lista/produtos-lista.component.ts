import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Produto } from 'src/app/models/Produto';
import { ProdutoService } from 'src/app/services/produto.service';

@Component({
  selector: 'app-produtos-lista',
  templateUrl: './produtos-lista.component.html',
  styleUrls: ['./produtos-lista.component.scss'],
})
export class ProdutosListaComponent implements OnInit {
  public produtos: Produto[] = [];
  public produtoId: number = 0;
  private _filtroTabela: string = '';
  public produtosFiltrados: Produto[] = [];
  modalRef?: BsModalRef;

  public get filtroTabela(): string {
    return this._filtroTabela;
  }

  public set filtroTabela(value: string) {
    this._filtroTabela = value;
    this.produtosFiltrados = this.filtroTabela
      ? this.filtrarProdutos(this.filtroTabela)
      : this.produtos;
  }

  constructor(
    private produtoService: ProdutoService,
    private modalService: BsModalService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private router: Router
  ) {}

  ngOnInit() {
    this.spinner.show();
    this.carregarProdutos();
  }

  public openModal(
    event: any,
    produtoId: number,
    template: TemplateRef<any>
  ): void {
    this.produtoId = produtoId;
    event.stopPropagation();
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }

  public confirmarExclusao(): void {
    this.modalRef?.hide();
    this.spinner.show();
    this.produtoService.deleteProduto(this.produtoId).subscribe(
      (resultado: any) => {
        console.log(resultado);
        this.toastr.success('O produto foi excluído.', 'Sucesso!');
        this.spinner.hide();
        this.carregarProdutos();
      },
      (error: any) => {
        console.error(error);
        this.toastr.error(
          `Erro ao tentar apagar o produto de código ${this.produtoId}.`,
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

  public filtrarProdutos(filtro: string): Produto[] {
    filtro = filtro.toLocaleLowerCase();
    return this.produtos.filter(
      (produto: any) =>
        produto.tipo.toLocaleLowerCase().indexOf(filtro) !== -1 ||
        produto.marca.toLocaleLowerCase().indexOf(filtro) !== -1
    );
  }

  public carregarProdutos(): void {
    this.spinner.show();
    this.produtoService.getProdutos().subscribe({
      next: (resposta: Produto[]) => {
        (this.produtos = resposta), (this.produtosFiltrados = this.produtos);
      },
      error: (erro: any) => {
        this.spinner.hide();
        console.error(erro);
        this.toastr.error('Erro ao tentar carregar os produtos.', 'Erro!');
      },
      complete: () => {
        this.spinner.hide();
      },
    });
  }

  public detalheProduto(produtoId: number): void {
    this.router.navigate([`produtos/detalhe/${produtoId}`]);
  }
}
