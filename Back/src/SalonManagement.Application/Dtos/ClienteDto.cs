using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace SalonManagement.Application.Dtos
{
    public class ClienteDto
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "Preenchimento obrigatório")]
        public string Nome { get; set; }

        [Required(ErrorMessage = "Preenchimento obrigatório"),
        MinLength(11, ErrorMessage = "Deve ter 11 caracteres"),
        MaxLength(11, ErrorMessage = "Deve ter 11 caracteres")]
        public string CPF { get; set; }
        public string Endereco { get; set; }
        public string Telefone { get; set; }
    }
}