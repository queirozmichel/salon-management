import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Cliente } from 'src/app/models/Cliente';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-cliente-detalhe',
  templateUrl: './cliente-detalhe.component.html',
  styleUrls: ['./cliente-detalhe.component.scss'],
})
export class ClienteDetalheComponent implements OnInit {
  cliente: Cliente = {} as Cliente;
  clientes: Cliente[] = [];
  formulario: FormGroup = {} as FormGroup;

  get f(): any {
    return this.formulario.controls;
  }

  constructor(
    private formBuilder: FormBuilder,
    private router: ActivatedRoute,
    private clienteService: ClienteService,
    private spinner: NgxSpinnerService,
    private toaster: ToastrService
  ) {}

  ngOnInit() {
    this.carregarCliente();
    this.validacao();
  }

  public carregarCliente(): void {
    this.spinner.show();
    const clienteIdParam = this.router.snapshot.paramMap.get('id');
    if (clienteIdParam != null) {
      this.clienteService.getClienteById(+clienteIdParam).subscribe({
        next: (_cliente: Cliente) => {
          this.cliente = { ..._cliente };
          this.formulario.patchValue(this.cliente);
        },
        error: (error: any) => {
          console.error(error);
          this.spinner.hide();
          this.toaster.error('Erro ao tentar detalhar o cliente.', 'Erro!');
        },
        complete: () => {
          this.spinner.hide();
        },
      });
    }
    this.spinner.hide();
  }

  public salvarAlteracao(): void {}

  public validacao(): void {
    this.formulario = this.formBuilder.group({
      nome: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(25),
        ],
      ],
      endereco: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(50),
        ],
      ],
      cpf: ['', [Validators.required, Validators.minLength(11)]],
      telefone: ['', [Validators.required, Validators.minLength(11)]],
    });
  }
  public resetarFormulario(): void {
    this.formulario.reset();
  }
}
