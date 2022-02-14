import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Produto } from 'src/app/models/Produto';
import { ProdutoService } from 'src/app/services/produto.service';

@Component({
  selector: 'app-produto-detalhe',
  templateUrl: './produto-detalhe.component.html',
  styleUrls: ['./produto-detalhe.component.scss'],
})
export class ProdutoDetalheComponent implements OnInit {
  produto: Produto = {} as Produto;
  produtos: Produto[] = [];
  formulario: FormGroup = {} as FormGroup;
  modoPutOuPost = 'post';

  get f(): any {
    return this.formulario.controls;
  }

  constructor(
    private formBuilder: FormBuilder,
    private router: ActivatedRoute,
    private produtoService: ProdutoService,
    private spinner: NgxSpinnerService,
    private toaster: ToastrService
  ) {}

  ngOnInit() {
    this.carregarProduto();
    this.validacao();
  }

  public carregarProduto(): void {
    const produtoIdParam = this.router.snapshot.paramMap.get('id');
    if (produtoIdParam != null) {
      this.spinner.show();
      this.modoPutOuPost = 'put';
      this.produtoService.getProdutoById(+produtoIdParam).subscribe({
        next: (_produto: Produto) => {
          this.produto = { ..._produto };
          this.formulario.patchValue(this.produto);
        },
        error: (error: any) => {
          console.error(error);
          this.spinner.hide();
          this.toaster.error('Erro ao tentar detalhar o produto.', 'Erro!');
        },
        complete: () => {
          this.spinner.hide();
        },
      });
    }
    this.spinner.hide();
  }

  public salvarAlteracao(): void {
    this.spinner.show();
    if (this.formulario.valid) {
      if (this.modoPutOuPost == 'post') {
        this.produto = { ...this.formulario.value };
        this.produtoService.postProduto(this.produto).subscribe(
          () => this.toaster.success('Produto salvo com sucesso!', 'Sucesso'),
          (error: any) => {
            this.spinner.hide();
            console.error(error);
            this.toaster.error('Erro ao tentar salvar o produto!', 'Erro');
          },
          () => {
            this.spinner.hide();
          }
        );
      } else {
        this.produto = { id: this.produto.id, ...this.formulario.value };
        this.produtoService.putProduto(this.produto.id, this.produto).subscribe(
          () => this.toaster.success('Produto salvo com sucesso!', 'Sucesso'),
          (error: any) => {
            this.spinner.hide();
            console.error(error);
            this.toaster.error('Erro ao tentar salvar o produto!', 'Erro');
          },
          () => {
            this.spinner.hide();
          }
        );
      }
    }
  }

  public validacao(): void {
    this.formulario = this.formBuilder.group({
      tipo: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
        ],
      ],
      marca: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(20),
        ],
      ],
      descricao: ['', [Validators.maxLength(50)]],
    });
  }
  public resetarFormulario(): void {
    this.formulario.reset();
  }
}
