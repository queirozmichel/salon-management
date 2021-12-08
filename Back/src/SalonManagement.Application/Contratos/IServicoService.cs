using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using SalonManagement.Domain;

namespace SalonManagement.Application.Contratos
{
    public interface IServicoService
    {
        Task<Servico> AddServico(Servico model);
        Task<Servico> UpdateServico(int servicoId, Servico model);
        Task<bool> DeleteServico(int servicoId);
        Task<Servico[]> GetAllServicosAsync(bool incluirProdutos = false);
        Task<Servico[]> GetAllServicosByDataAsync(string data, bool incluirProdutos = false);
        Task<Servico> GetServicoByIdAsync(int servicoId, bool incluirProdutos = false);
    }
}