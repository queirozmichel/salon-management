using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using SalonManagement.Domain;

namespace SalonManagement.Persistence
{
    public interface ISalonManagementPersistence
    {
        //GERAL
        void Add<T>(T entidade) where T : class;
        void Update<T>(T entidade) where T : class;
        void Delete<T>(T entidade) where T : class;
        void DeleteRange<T>(T[] entidade) where T : class;
        Task<bool> SaveChangesAsync();

        //SERVIÇOS
        Task<Servico[]> GetAllServicosByClienteAsync(string cliente, bool incluirProdutos);
        Task<Servico[]> GetAllServicosAsync(bool incluirProdutos);
        Task<Servico> GetServicoByIdAsync(int servicoId, bool incluirProdutos);

        //PRODUTOS
        Task<Produto[]> GetAllProdutosByTipoAsync(string tipo, bool incluirServicos);
        Task<Produto[]> GetAllProdutosAsync(bool incluirServicos);
        Task<Produto> GetProdutoByIdAsync(int produtoId, bool incluirServicos);

    }
}