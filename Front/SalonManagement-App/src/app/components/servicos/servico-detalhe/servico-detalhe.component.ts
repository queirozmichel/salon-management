import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-servico-detalhe',
  templateUrl: './servico-detalhe.component.html',
  styleUrls: ['./servico-detalhe.component.scss'],
})
export class ServicoDetalheComponent implements OnInit {
  formulario: FormGroup = {} as FormGroup;

  get f(): any {
    return this.formulario.controls;
  }

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.validacao();
  }

  public validacao(): void {
    this.formulario = this.formBuilder.group({
      cliente: ['', Validators.required],
      profissional: ['', Validators.required],
      data: ['', Validators.required],
      valor: ['', Validators.required],
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
