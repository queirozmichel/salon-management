using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SalonManagement.Domain
{
    public class ProdutoServico
    {
        public int ProdutoId { get; set; }
        public Produto Produto { get; set; }
        public int ServicoId { get; set; }
        public Servico Servico { get; set; }
    }
}