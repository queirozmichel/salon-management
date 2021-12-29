using System.Threading.Tasks;
using SalonManagement.Application.Dtos;

namespace SalonManagement.Application.Contratos
{
    public interface IClienteService
    {
        Task<ClienteDto> AddCliente(ClienteDto model);
        Task<ClienteDto> UpdateCliente(int clienteId, ClienteDto model);
        Task<bool> DeleteCliente(int clienteId);
        Task<ClienteDto[]> GetAllClientesAsync();
        Task<ClienteDto[]> GetAllClientesByNameAsync(string nome);
        Task<ClienteDto> GetClienteByIdAsync(int clienteId);
    }
}