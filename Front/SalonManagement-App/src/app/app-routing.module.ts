import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientesComponent } from './components/clientes/clientes.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PerfilComponent } from './components/usuario/perfil/perfil.component';
import { ProdutosComponent } from './components/produtos/produtos.component';
import { ProfissionaisComponent } from './components/profissionais/profissionais.component';
import { ServicoDetalheComponent } from './components/servicos/servico-detalhe/servico-detalhe.component';
import { ServicosListaComponent } from './components/servicos/servicos-lista/servicos-lista.component';
import { ServicosComponent } from './components/servicos/servicos.component';
import { LoginComponent } from './components/usuario/login/login.component';
import { RegistrarComponent } from './components/usuario/registrar/registrar.component';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { ClienteDetalheComponent } from './components/clientes/cliente-detalhe/cliente-detalhe.component';
import { ClientesListaComponent } from './components/clientes/clientes-lista/clientes-lista.component';
import { ProfissionalDetalheComponent } from './components/profissionais/profissional-detalhe/profissional-detalhe.component';
import { ProfissionaisListaComponent } from './components/profissionais/profissionais-lista/profissionais-lista.component';
import { ProdutoDetalheComponent } from './components/produtos/produto-detalhe/produto-detalhe.component';
import { ProdutosListaComponent } from './components/produtos/produtos-lista/produtos-lista.component';

const routes: Routes = [
  {
    path: 'usuario',
    component: UsuarioComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'registrar', component: RegistrarComponent },
    ],
  },
  { path: 'usuario/perfil', component: PerfilComponent },
  { path: 'servicos', redirectTo: 'servicos/lista' },
  { path: 'clientes', redirectTo: 'clientes/lista' },
  { path: 'profissionais', redirectTo: 'profissionais/lista' },
  { path: 'produtos', redirectTo: 'produtos/lista' },
  {
    path: 'servicos',
    component: ServicosComponent,
    children: [
      { path: 'detalhe/:id', component: ServicoDetalheComponent },
      { path: 'detalhe', component: ServicoDetalheComponent },
      { path: 'lista', component: ServicosListaComponent },
    ],
  },
  {
    path: 'clientes',
    component: ClientesComponent,
    children: [
      { path: 'detalhe/:id', component: ClienteDetalheComponent },
      { path: 'detalhe', component: ClienteDetalheComponent },
      { path: 'lista', component: ClientesListaComponent },
    ],
  },

  {
    path: 'profissionais',
    component: ProfissionaisComponent,
    children: [
      { path: 'detalhe/:id', component: ProfissionalDetalheComponent },
      { path: 'detalhe', component: ProfissionalDetalheComponent },
      { path: 'lista', component: ProfissionaisListaComponent },
    ],
  },

  {
    path: 'produtos',
    component: ProdutosComponent,
    children: [
      { path: 'detalhe/:id', component: ProdutoDetalheComponent },
      { path: 'detalhe', component: ProdutoDetalheComponent },
      { path: 'lista', component: ProdutosListaComponent },
    ],
  },

  { path: 'dashboard', component: DashboardComponent },
  { path: 'clientes', component: ClientesComponent },
  { path: 'profissionais', component: ProfissionaisComponent },
  { path: 'produtos', component: ProdutosComponent },

  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: '**', redirectTo: 'dashboard', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
