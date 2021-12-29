using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using SalonManagement.Domain;

namespace SalonManagement.Application.Dtos
{
    public class ServicoDto
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "Preenchimento obrigatório")]
        public DateTime Data { get; set; }

        [Required(ErrorMessage = "Preenchimento obrigatório"),
         MinLength(5, ErrorMessage = "Deve ter no mínimo 5 caracteres"),
         MaxLength(100, ErrorMessage = "Deve ter no máximo 100 caracteres")]
        public string Descricao { get; set; }

        [Required(ErrorMessage = "Preenchimento obrigatório")]
        public decimal Valor { get; set; }

        [Required(ErrorMessage = "Preenchimento obrigatório")]
        public int ProfissionalId { get; set; }

        [Required(ErrorMessage = "Preenchimento obrigatório")]
        public int ClienteId { get; set; }

        public Profissional Profissional { get; set; }

        public Cliente Cliente { get; set; }

        public IEnumerable<ProdutoDto> Produtos { get; set; }
    }
}