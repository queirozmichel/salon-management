using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using SalonManagement.Domain;

namespace SalonManagement.Application.Dtos
{
    public class ProdutoDto
    {
        public int Id { get; set; }
        public string Tipo { get; set; }
        public string Marca { get; set; }
        public string Descricao { get; set; }
    }
}