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
  {
    path: 'servicos',
    component: ServicosComponent,
    children: [
      { path: 'detalhe/:id', component: ServicoDetalheComponent },
      { path: 'detalhe', component: ServicoDetalheComponent },
      { path: 'lista', component: ServicosListaComponent },
    ],
  },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'produtos', component: ProdutosComponent },
  { path: 'profissionais', component: ProfissionaisComponent },
  { path: 'clientes', component: ClientesComponent },

  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: '**', redirectTo: 'dashboard', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
