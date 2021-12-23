import { Component, OnInit } from '@angular/core';
import {
  AbstractControlOptions,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ValidarCampo } from 'src/app/helpers/ValidarCampo';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.scss'],
})
export class RegistrarComponent implements OnInit {
  formulario: FormGroup = {} as FormGroup;

  get f(): any {
    return this.formulario.controls;
  }
  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.validacao();
  }

  public validacao(): void {
    const formOptions: AbstractControlOptions = {
      validators: ValidarCampo.deveCoincidir('senha', 'confirmarSenha'),
    };
    this.formulario = this.formBuilder.group(
      {
        primeiroNome: [
          '',
          [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(10),
          ],
        ],
        ultimoNome: [
          '',
          [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(10),
          ],
        ],
        email: ['', [Validators.required, Validators.email]],
        nomeUsuario: [
          '',
          [
            Validators.required,
            Validators.minLength(5),
            Validators.maxLength(10),
          ],
        ],
        senha: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(10),
          ],
        ],
        confirmarSenha: ['', Validators.required],
      },
      formOptions
    );
  }

  public resetarFormulario(): void {
    this.formulario.reset();
  }
}
