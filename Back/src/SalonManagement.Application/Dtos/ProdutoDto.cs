using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using SalonManagement.Domain;

namespace SalonManagement.Application.Dtos
{
    public class ProdutoDto
    {
        public int Id { get; set; }
        [Required(ErrorMessage = "Preenchimento obrigatório"),
        MinLength(3, ErrorMessage = "Deve ter no mínimo 3 caracteres"),
        MaxLength(20, ErrorMessage = "Deve ter no máximo 20 caracteres")]
        public string Tipo { get; set; }
        [Required(ErrorMessage = "Preenchimento obrigatório"),
        MinLength(3, ErrorMessage = "Deve ter no mínimo 3 caracteres"),
        MaxLength(20, ErrorMessage = "Deve ter no máximo 20 caracteres")]
        public string Marca { get; set; }
        [MaxLength(50, ErrorMessage = "Deve ter no máximo 50 caracteres")]
        public string Descricao { get; set; }
    }
}