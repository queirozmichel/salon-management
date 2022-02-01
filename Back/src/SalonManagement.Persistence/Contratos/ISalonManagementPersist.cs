using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using SalonManagement.Domain;

namespace SalonManagement.Persistence.Contratos
{
    public interface ISalonManagementPersist
    {
        //GERAL
        void Add<T>(T entidade) where T : class;
        void Update<T>(T entidade) where T : class;
        void Delete<T>(T entidade) where T : class;
        void DeleteRange<T>(T[] entidade) where T : class;
        Task<bool> SaveChangesAsync();

        //SERVIÇOS
        Task<Servico[]> GetAllServicosByDataAsync(string data, bool incluirProdutos = false);
        Task<Servico[]> GetAllServicosAsync(bool incluirProdutos = false);
        Task<Servico> GetServicoByIdAsync(int servicoId, bool incluirProdutos = false);

        //PRODUTOS
        Task<Produto[]> GetAllProdutosByTipoAsync(string tipo);
        Task<Produto[]> GetAllProdutosByMarcaAsync(string marca);
        Task<Produto[]> GetAllProdutosAsync();
        Task<Produto> GetProdutoByIdAsync(int produtoId);

        //CLIENTES

        Task<Cliente[]> GetAllClientesByNameAsync(string nome);
        Task<Cliente[]> GetAllClientesAsync();
        Task<Cliente> GetClienteByIdAsync(int clienteId);

        //PROFISSIONAIS

        Task<Profissional[]> GetAllProfissionaisByNameAsync(string nome);
        Task<Profissional[]> GetAllProfissionaisAsync();
        Task<Profissional> GetProfissionalByIdAsync(int profissionalId);

    }
}