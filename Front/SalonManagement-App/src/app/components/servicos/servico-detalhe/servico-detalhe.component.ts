import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Cliente } from 'src/app/models/Cliente';
import { Profissional } from 'src/app/models/Profissional';
import { Servico } from 'src/app/models/Servico';
import { ClienteService } from 'src/app/services/cliente.service';
import { ProfissionalService } from 'src/app/services/profissional.service';
import { ServicoService } from 'src/app/services/servico.service';

@Component({
  selector: 'app-servico-detalhe',
  templateUrl: './servico-detalhe.component.html',
  styleUrls: ['./servico-detalhe.component.scss'],
})
export class ServicoDetalheComponent implements OnInit {
  servico: Servico = {} as Servico;
  servicos: Servico[] = [];
  clientes: Cliente[] = [];
  profissionais: Profissional[] = [];
  formulario: FormGroup = {} as FormGroup;
  disableSelect = new FormControl(false);
  modoPutOuPost = 'post';

  get f(): any {
    return this.formulario.controls;
  }

  constructor(
    private formBuilder: FormBuilder,
    private router: ActivatedRoute,
    private servicoService: ServicoService,
    private clienteService: ClienteService,
    private profissionalService: ProfissionalService,
    private spinner: NgxSpinnerService,
    private toaster: ToastrService
  ) {}

  ngOnInit() {
    this.carregarServico();
    this.carregarClientes();
    this.carregarProfissionais();
    this.validacao();
  }

  carregarClientes(): void {
    this.spinner.show();
    this.clienteService.getClientes().subscribe(
      (retorno: Cliente[]) => {
        this.clientes = retorno.sort((a, b) => {
          return a.nome.localeCompare(b.nome);
        });
      },
      (erro: any) => {
        console.error(erro);
      },
      () => {
        this.spinner.hide();
      }
    );
  }

  carregarProfissionais(): void {
    this.spinner.show();
    this.profissionalService.getProfissionais().subscribe(
      (retorno: Profissional[]) => {
        this.profissionais = retorno.sort((a, b) => {
          return a.nome.localeCompare(b.nome);
        });
      },
      (erro: any) => {
        console.error(erro);
      },
      () => {
        this.spinner.hide();
      }
    );
  }

  public carregarServico(): void {
    this.spinner.show();
    const servicoIdParam = this.router.snapshot.paramMap.get('id');
    if (servicoIdParam != null) {
      this.modoPutOuPost = 'put';
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
    this.spinner.show();
    if (this.formulario.valid) {
      if (this.modoPutOuPost == 'post') {
        this.servico = { ...this.formulario.value };
        this.servicoService.postServico(this.servico).subscribe(
          () => this.toaster.success('Serviço salvo com sucesso.', 'Sucesso!'),
          (error: any) => {
            this.spinner.hide();
            console.error(error);
            this.toaster.error('Erro ao salvar o serviço.', 'Erro!');
          },
          () => this.spinner.hide()
        );
      } else {
        this.servico = { id: this.servico.id, ...this.formulario.value };
        this.servicoService.putServico(this.servico.id, this.servico).subscribe(
          () =>
            this.toaster.success('Serviço atualizado com sucesso.', 'Sucesso!'),
          (error: any) => {
            this.spinner.hide();
            console.error(error);
            this.toaster.error('Erro ao atualizar o serviço.', 'Erro!');
          },
          () => this.spinner.hide()
        );
      }
    }
  }

  public validacao(): void {
    this.formulario = this.formBuilder.group({
      clienteId: ['', [Validators.required]],
      profissionalId: ['', [Validators.required]],
      data: ['', [Validators.required, Validators.minLength(10)]],
      hora: ['', [Validators.required, Validators.minLength(5)]],
      valor: ['', [Validators.min(0.01), Validators.max(9999.99)]],
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
