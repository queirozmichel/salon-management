import { Cliente } from './Cliente';
import { ProdutoServico } from './ProdutoServico';
import { Profissional } from './Profissional';

export interface Servico {
  id: number;
  data: string;
  descricao: string;
  valor: number;
  profissionalId: number;
  profissional: Profissional;
  clienteId: number;
  cliente: Cliente;
  produtosServicos: ProdutoServico[];
}
