using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SalonManagement.API.Models
{
    public class Servico
    {
        public int ServicoId { get; set; }
        public string DataServico { get; set; }
        public string Cliente { get; set; }
        public string DescricaoServico { get; set; }
        public string ProdutoUtilizadoServico { get; set; }
        public double ValorServico { get; set; }
    }
}