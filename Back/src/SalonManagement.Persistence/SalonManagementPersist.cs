using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using SalonManagement.Domain;
using SalonManagement.Persistence.Contextos;
using SalonManagement.Persistence.Contratos;

namespace SalonManagement.Persistence
{
    public class SalonManagementPersist : ISalonManagementPersist
    {
        private readonly SalonManagementContexto _contexto;
        public SalonManagementPersist(SalonManagementContexto contexto)
        {
            _contexto = contexto;
        }
        public void Add<T>(T entidade) where T : class
        {
            _contexto.Add(entidade);
        }

        public void Update<T>(T entidade) where T : class
        {
            _contexto.Update(entidade);
        }

        public void Delete<T>(T entidade) where T : class
        {
            _contexto.Remove(entidade);
        }

        public void DeleteRange<T>(T[] entidadeArray) where T : class
        {
            _contexto.RemoveRange(entidadeArray);
        }

        public async Task<bool> SaveChangesAsync()
        {
            return (await _contexto.SaveChangesAsync()) > 0;
        }

        public async Task<Servico[]> GetAllServicosAsync(bool incluirProdutos = false)
        {
            IQueryable<Servico> query = _contexto.Servico
            .Include(x => x.Profissional)
            .Include(x => x.Cliente);
            if (incluirProdutos)
            {
                query = query.Include(x => x.Produtos);
            }
            query = query.AsNoTracking().OrderBy(x => x.Id);

            return await query.ToArrayAsync();
        }

        public async Task<Servico[]> GetAllServicosByDataAsync(string data, bool incluirProdutos = false)
        {
            IQueryable<Servico> query = _contexto.Servico
            .Include(x => x.Profissional)
            .Include(x => x.Cliente);
            if (incluirProdutos)
            {
                query = query.Include(x => x.Produtos);
            }
            // if (incluirProdutos)
            // {
            //     query = query.Include(x => x.ProdutosServicos)
            //     .ThenInclude(x => x.Produto);
            // }
            query = query.AsNoTracking().OrderBy(x => x.Id)
            .Where(x => x.Data.ToLower().Contains(data.ToLower()));

            return await query.ToArrayAsync();
        }

        public async Task<Servico> GetServicoByIdAsync(int servicoId, bool incluirProdutos = false)
        {
            IQueryable<Servico> query = _contexto.Servico
            .Include(x => x.Profissional)
            .Include(x => x.Cliente);
            if (incluirProdutos)
            {
                query = query.Include(x => x.Produtos);
            }
            query = query.AsNoTracking().OrderBy(x => x.Id)
            .Where(x => x.Id == servicoId);

            return await query.FirstOrDefaultAsync();
        }

        public async Task<Produto[]> GetAllProdutosAsync()
        {
            IQueryable<Produto> query = _contexto.Produto;
            query = query.AsNoTracking().OrderBy(x => x.Id);
            return await query.ToArrayAsync();
        }

        public async Task<Produto[]> GetAllProdutosByTipoAsync(string tipo)
        {
            IQueryable<Produto> query = _contexto.Produto;
            query = query.AsNoTracking().OrderBy(x => x.Id)
            .Where(x => x.Tipo.ToLower().Contains(tipo.ToLower()));
            return await query.ToArrayAsync();
        }

        public async Task<Produto[]> GetAllProdutosByMarcaAsync(string marca)
        {
            IQueryable<Produto> query = _contexto.Produto;
            query = query.AsNoTracking().OrderBy(x => x.Id)
            .Where(x => x.Marca.ToLower().Contains(marca.ToLower()));
            return await query.ToArrayAsync();
        }

        public async Task<Produto> GetProdutoByIdAsync(int produtoId)
        {
            IQueryable<Produto> query = _contexto.Produto;
            query = query.AsNoTracking().OrderBy(x => x.Id)
            .Where(x => x.Id == produtoId);
            return await query.FirstOrDefaultAsync();
        }

        public async Task<Cliente[]> GetAllClientesByNameAsync(string nome)
        {
            IQueryable<Cliente> query = _contexto.Cliente;

            query = query.AsNoTracking().OrderBy(x => x.Id)
            .Where(x => x.Nome.ToLower().Contains(nome.ToLower()));

            return await query.ToArrayAsync();
        }

        public async Task<Cliente[]> GetAllClientesAsync()
        {
            IQueryable<Cliente> query = _contexto.Cliente;

            query = query.AsNoTracking().OrderBy(x => x.Id);

            return await query.ToArrayAsync();
        }

        public async Task<Cliente> GetClienteByIdAsync(int clienteId)
        {
            IQueryable<Cliente> query = _contexto.Cliente;

            query = query.AsNoTracking().OrderBy(x => x.Id)
            .Where(x => x.Id == clienteId);

            return await query.FirstOrDefaultAsync();
        }

        public async Task<Profissional[]> GetAllProfissionaisByNameAsync(string nome)
        {
            IQueryable<Profissional> query = _contexto.Profissional;

            query = query.AsNoTracking().OrderBy(x => x.Id)
            .Where(x => x.Nome.ToLower().Contains(nome.ToLower()));

            return await query.ToArrayAsync();
        }

        public async Task<Profissional[]> GetAllProfissionaisAsync()
        {
            IQueryable<Profissional> query = _contexto.Profissional;

            query = query.AsNoTracking().OrderBy(x => x.Id);

            return await query.ToArrayAsync();
        }

        public async Task<Profissional> GetProfissionalByIdAsync(int profissionalId)
        {
            IQueryable<Profissional> query = _contexto.Profissional;

            query = query.AsNoTracking().OrderBy(x => x.Id)
            .Where(x => x.Id == profissionalId);

            return await query.FirstOrDefaultAsync();
        }
    }
}