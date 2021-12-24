using System.Threading.Tasks;
using SalonManagement.Application.Dtos;

namespace SalonManagement.Application.Contratos
{
    public interface IServicoService
    {
        Task<ServicoDto> AddServico(ServicoDto model);
        Task<ServicoDto> UpdateServico(int servicoId, ServicoDto model);
        Task<bool> DeleteServico(int servicoId);
        Task<ServicoDto[]> GetAllServicosAsync(bool incluirProdutos = false);
        Task<ServicoDto[]> GetAllServicosByDataAsync(string data, bool incluirProdutos = false);
        Task<ServicoDto> GetServicoByIdAsync(int servicoId, bool incluirProdutos = false);
    }
}