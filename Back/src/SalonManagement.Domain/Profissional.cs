using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SalonManagement.Domain
{
    public class Profissional
    {
        public int Id { get; set; }
        public string Nome { get; set; }
        public string CPF { get; set; }
        public string Telefone { get; set; }
        public string Especialidade { get; set; }
    }
}