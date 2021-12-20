import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientesComponent } from './components/clientes/clientes.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { ProdutosComponent } from './components/produtos/produtos.component';
import { ProfissionaisComponent } from './components/profissionais/profissionais.component';
import { ServicosComponent } from './components/servicos/servicos.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'servicos', component: ServicosComponent },
  { path: 'produtos', component: ProdutosComponent },
  { path: 'profissionais', component: ProfissionaisComponent },
  { path: 'clientes', component: ClientesComponent },
  { path: 'perfil', component: PerfilComponent },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: '**', redirectTo: 'dashboard', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
