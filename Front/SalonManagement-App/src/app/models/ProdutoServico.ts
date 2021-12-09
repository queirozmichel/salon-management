import { Produto } from './Produto';
import { Servico } from './Servico';

export interface ProdutoServico {
  produtoId: number;
  produto: Produto;
  servicoId: number;
  servico: Servico;
}
