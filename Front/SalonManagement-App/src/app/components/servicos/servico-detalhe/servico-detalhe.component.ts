import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Servico } from 'src/app/models/Servico';
import { ServicoService } from 'src/app/services/servico.service';

@Component({
  selector: 'app-servico-detalhe',
  templateUrl: './servico-detalhe.component.html',
  styleUrls: ['./servico-detalhe.component.scss'],
})
export class ServicoDetalheComponent implements OnInit {
  servico: Servico = {} as Servico;
  servicos: Servico[] = [];
  formulario: FormGroup = {} as FormGroup;

  get f(): any {
    return this.formulario.controls;
  }

  constructor(
    private formBuilder: FormBuilder,
    private router: ActivatedRoute,
    private servicoService: ServicoService,
    private spinner: NgxSpinnerService,
    private toaster: ToastrService
  ) {}

  ngOnInit() {
    this.carregarServico();
    this.pegaNomes();
    this.validacao();
  }

  public carregarServico(): void {
    this.spinner.show();
    const servicoIdParam = this.router.snapshot.paramMap.get('id');
    if (servicoIdParam != null) {
      this.servicoService.getServicoById(+servicoIdParam).subscribe({
        next: (_servico: Servico) => {
          this.servico = { ..._servico };
          this.formulario.patchValue(this.servico);
        },
        error: (error: any) => {
          console.error(error);
          this.spinner.hide();
          this.toaster.error('Erro ao tentar detalhar o serviço.', 'Erro!');
        },
        complete: () => {
          this.spinner.hide();
        },
      });
    }
    this.spinner.hide();
  }

  public salvarAlteracao(): void {
    // this.spinner.show();
    if (this.formulario.valid) {
      this.servico = { ...this.formulario.value };
      // console.log(this.servico);

      // this.servicoService.postServico(this.servico).subscribe(
      //   () => this.toaster.success('Serviço salvo com sucesso.', 'Sucesso!'),
      //   (error: any) => {
      //     this.spinner.hide();
      //     console.error(error);
      //     this.toaster.error('Erro ao salvar o serviço.', 'Erro!');
      //   },
      //   () => this.spinner.hide()
      // );
    }
  }

  public pegaNomes(): void {
    this.servicoService.getServicos().subscribe({
      next: (resposta: Servico[]) => {
        this.servicos = resposta;
      },
      error: (erro: any) => {
        console.error(erro);
      },
      complete: () => {},
    });
  }

  public validacao(): void {
    this.formulario = this.formBuilder.group({
      clienteId: [''],
      cliente: this.formBuilder.group({
        nome: ['', Validators.required],
      }),
      profissional: this.formBuilder.group({
        nome: ['', Validators.required],
      }),
      data: ['', Validators.required],
      valor: [''],
      descricao: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(100),
        ],
      ],
    });
  }
  public resetarFormulario(): void {
    this.formulario.reset();
  }
}
