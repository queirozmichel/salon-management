import { CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { registerLocaleData } from '@angular/common';
import ptBr from '@angular/common/locales/pt';

import { CollapseModule } from 'ngx-bootstrap/collapse';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule } from 'ngx-bootstrap/modal';

import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgxCurrencyModule } from 'ngx-currency';
import { NgxMaskModule, IConfig } from 'ngx-mask';

import { ServicosComponent } from './components/servicos/servicos.component';
import { ProdutosComponent } from './components/produtos/produtos.component';
import { NavbarComponent } from './shared/navbar/navbar.component';

import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ServicoService } from './services/servico.service';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ClientesComponent } from './components/clientes/clientes.component';
import { ProfissionaisComponent } from './components/profissionais/profissionais.component';
import { PerfilComponent } from './components/usuario/perfil/perfil.component';
import { TituloComponent } from './shared/titulo/titulo.component';
import { ServicoDetalheComponent } from './components/servicos/servico-detalhe/servico-detalhe.component';
import { ServicosListaComponent } from './components/servicos/servicos-lista/servicos-lista.component';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { LoginComponent } from './components/usuario/login/login.component';
import { RegistrarComponent } from './components/usuario/registrar/registrar.component';
import { ClientesListaComponent } from './components/clientes/clientes-lista/clientes-lista.component';
import { ClienteDetalheComponent } from './components/clientes/cliente-detalhe/cliente-detalhe.component';
import { ClienteService } from './services/cliente.service';
import { ProfissionaisListaComponent } from './components/profissionais/profissionais-lista/profissionais-lista.component';
import { ProfissionalService } from './services/profissional.service';
import { ProfissionalDetalheComponent } from './components/profissionais/profissional-detalhe/profissional-detalhe.component';

registerLocaleData(ptBr);

@NgModule({
  declarations: [
    AppComponent,
    ServicosComponent,
    ServicosListaComponent,
    ServicoDetalheComponent,
    ProdutosComponent,
    ClientesComponent,
    ClientesListaComponent,
    ClienteDetalheComponent,
    ProfissionaisComponent,
    ProfissionaisListaComponent,
    ProfissionalDetalheComponent,
    PerfilComponent,
    UsuarioComponent,
    LoginComponent,
    RegistrarComponent,
    NavbarComponent,
    DashboardComponent,
    TituloComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    CollapseModule.forRoot(),
    TooltipModule.forRoot(),
    BsDropdownModule.forRoot(),
    ModalModule.forRoot(),
    NgxSpinnerModule,
    NgxCurrencyModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
      progressBar: true,
    }),
    NgxMaskModule.forRoot(),
  ],
  providers: [
    ServicoService,
    ClienteService,
    ProfissionalService,
    { provide: LOCALE_ID, useValue: 'pt' },
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
