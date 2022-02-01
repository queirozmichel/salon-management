using System.Threading.Tasks;
using SalonManagement.Application.Dtos;

namespace SalonManagement.Application.Contratos
{
    public interface IProdutoService
    {
        Task<ProdutoDto> AddProduto(ProdutoDto model);
        Task<ProdutoDto> UpdateProduto(int produtoId, ProdutoDto model);
        Task<bool> DeleteProduto(int produtoId);
        Task<ProdutoDto[]> GetAllProdutosAsync();
        Task<ProdutoDto[]> GetAllProdutosByTipoAsync(string tipo);
        Task<ProdutoDto[]> GetAllProdutosByMarcaAsync(string marca);
        Task<ProdutoDto> GetProdutoByIdAsync(int produtoId);
    }
}