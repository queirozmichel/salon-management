using System.Threading.Tasks;
using SalonManagement.Application.Dtos;

namespace SalonManagement.Application.Contratos
{
    public interface IProfissionalService
    {
        Task<ProfissionalDto> AddProfissional(ProfissionalDto model);
        Task<ProfissionalDto> UpdateProfissional(int profissionalId, ProfissionalDto model);
        Task<bool> DeleteProfissional(int profissionalId);
        Task<ProfissionalDto[]> GetAllProfissionaisAsync();
        Task<ProfissionalDto[]> GetAllProfissionaisByNameAsync(string nome);
        Task<ProfissionalDto> GetProfissionalByIdAsync(int profissionalId);
    }
}