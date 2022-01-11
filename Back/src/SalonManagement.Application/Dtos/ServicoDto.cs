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
        [RegularExpression("([0-9]{2}[/][0-9]{2}[/][0-9]{4})", ErrorMessage = "Deve estar no seguinte formato: 00/00/0000")]
        public string Data { get; set; }

        [Required(ErrorMessage = "Preenchimento obrigatório")]
        [RegularExpression("([0-9]{2}[:][0-9]{2})", ErrorMessage = "Deve estar no seguinte formato: 00:00")]
        public string Hora { get; set; }

        [Range(1, 999999, ErrorMessage = "Preenchimento obrigatório, e deve ser um valor inteiro de 1 a 999999")]
        public int ClienteId { get; set; }
        public Cliente Cliente { get; set; }

        [Range(1, 999999, ErrorMessage = "Preenchimento obrigatório, e deve ser um valor inteiro de 1 a 999999")]
        public int ProfissionalId { get; set; }
        public Profissional Profissional { get; set; }

        [Required(ErrorMessage = "Preenchimento obrigatório"),
         MinLength(5, ErrorMessage = "Deve ter no mínimo 5 caracteres"),
         MaxLength(100, ErrorMessage = "Deve ter no máximo 100 caracteres")]
        public string Descricao { get; set; }

        public IEnumerable<ProdutoDto> Produtos { get; set; }

        [Range(0.01, 9999.99, ErrorMessage = "Preenchimento obrigatório, e deve ser um valor decimal de 0.01 a 999999.99")]
        // [RegularExpression("^(0|[1-9][0-9]{0,5})(,[0-9]{3})*([.][0-9]{1,2})?$", ErrorMessage = "Deve estar no formato monetário decimal US, por exemplo: 1.60 / 0.10 / 100 / 1000 / 1000.50 / 10000.99")]
        public decimal Valor { get; set; }
    }
}