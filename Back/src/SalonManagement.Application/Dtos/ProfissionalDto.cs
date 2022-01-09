using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace SalonManagement.Application.Dtos
{
    public class ProfissionalDto
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "Preenchimento obrigatório"),
        MinLength(5, ErrorMessage = "Deve ter no mínimo 5 caracteres"),
        MaxLength(25, ErrorMessage = "Deve ter no máximo 25 caracteres")]
        public string Nome { get; set; }

        [Required(ErrorMessage = "Preenchimento obrigatório")]
        [RegularExpression("([0-9]{3}[.][0-9]{3}[.][0-9]{3}[-][0-9]{2})", ErrorMessage = "Deve estar no seguinte formato: 000.000.000-00")]
        public string CPF { get; set; }

        [Required(ErrorMessage = "Preenchimento obrigatório")]
        [RegularExpression("([(][0-9]{2}[)][0-9]{5}[-][0-9]{4})", ErrorMessage = "Deve estar no seguinte formato: (00)00000-0000")]
        public string Telefone { get; set; }

        [Required(ErrorMessage = "Preenchimento obrigatório"),
        MinLength(5, ErrorMessage = "Deve ter no mínimo 5 caracteres"),
        MaxLength(25, ErrorMessage = "Deve ter no máximo 50 caracteres")]
        public string Endereco { get; set; }

        public string Especialidade { get; set; }
    }
}