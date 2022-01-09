using System.Collections.Generic;

namespace SalonManagement.Domain
{
    public class Servico
    {
        public int Id { get; set; }
        public string Data { get; set; }
        public string Hora { get; set; }
        public string Descricao { get; set; }
        public decimal Valor { get; set; }
        public int ProfissionalId { get; set; }
        public Profissional Profissional { get; set; }
        public int ClienteId { get; set; }
        public Cliente Cliente { get; set; }
        public IEnumerable<ProdutoServico> ProdutosServicos { get; set; }
    }
}