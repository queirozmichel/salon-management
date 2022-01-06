import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Profissional } from 'src/app/models/Profissional';
import { ProfissionalService } from 'src/app/services/profissional.service';

@Component({
  selector: 'app-profissional-detalhe',
  templateUrl: './profissional-detalhe.component.html',
  styleUrls: ['./profissional-detalhe.component.scss'],
})
export class ProfissionalDetalheComponent implements OnInit {
  profissional: Profissional = {} as Profissional;
  profissionais: Profissional[] = [];
  formulario: FormGroup = {} as FormGroup;

  get f(): any {
    return this.formulario.controls;
  }

  constructor(
    private formBuilder: FormBuilder,
    private router: ActivatedRoute,
    private profissionalService: ProfissionalService,
    private spinner: NgxSpinnerService,
    private toaster: ToastrService
  ) {}

  ngOnInit() {
    this.carregarProfissional();
    this.validacao();
  }

  public carregarProfissional(): void {
    this.spinner.show();
    const profissionalIdParam = this.router.snapshot.paramMap.get('id');
    if (profissionalIdParam != null) {
      this.profissionalService
        .getProfissionalById(+profissionalIdParam)
        .subscribe({
          next: (_profissional: Profissional) => {
            this.profissional = { ..._profissional };
            this.formulario.patchValue(this.profissional);
          },
          error: (error: any) => {
            console.error(error);
            this.spinner.hide();
            this.toaster.error(
              'Erro ao tentar detalhar o profissional.',
              'Erro!'
            );
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
      cpf: ['', [Validators.required, Validators.minLength(11)]],
      endereco: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(50),
        ],
      ],
      especialidade: ['', [Validators.maxLength(32)]],
      telefone: ['', [Validators.required, Validators.minLength(11)]],
    });
  }
  public resetarFormulario(): void {
    this.formulario.reset();
  }
}
