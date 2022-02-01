using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using SalonManagement.Application.Contratos;
using SalonManagement.Application.Dtos;
using SalonManagement.Domain;
using SalonManagement.Persistence.Contratos;

namespace SalonManagement.Application
{
    public class ProdutoService : IProdutoService
    {
        private readonly ISalonManagementPersist _salonManagementPersist;
        private readonly IMapper _mapper;
        public ProdutoService(ISalonManagementPersist salonManagementPersist, IMapper mapper)
        {
            _mapper = mapper;
            _salonManagementPersist = salonManagementPersist;

        }
        public async Task<ProdutoDto> AddProduto(ProdutoDto model)
        {
            try
            {
                var produto = _mapper.Map<Produto>(model);
                _salonManagementPersist.Add<Produto>(produto);

                if (await _salonManagementPersist.SaveChangesAsync())
                {
                    var produtoRetorno = await _salonManagementPersist.GetProdutoByIdAsync(produto.Id);
                    return _mapper.Map<ProdutoDto>(produtoRetorno);
                }
                return null;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<ProdutoDto> UpdateProduto(int produtoId, ProdutoDto model)
        {
            try
            {
                var produto = await _salonManagementPersist.GetProdutoByIdAsync(produtoId);
                if (produto == null)
                {
                    return null;
                }

                model.Id = produto.Id;

                _mapper.Map(model, produto);


                _salonManagementPersist.Update<Produto>(produto);

                if (await _salonManagementPersist.SaveChangesAsync())
                {
                    var produtoRetorno = await _salonManagementPersist.GetClienteByIdAsync(produto.Id);
                    return _mapper.Map<ProdutoDto>(produtoRetorno);
                }
                return null;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<bool> DeleteProduto(int produtoId)
        {
            try
            {
                var produto = await _salonManagementPersist.GetProdutoByIdAsync(produtoId);
                if (produto == null)
                {
                    throw new Exception("Produto para delete não encontrado.");
                }

                _salonManagementPersist.Delete<Produto>(produto);

                return await _salonManagementPersist.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<ProdutoDto[]> GetAllProdutosAsync()
        {
            try
            {
                var produtos = await _salonManagementPersist.GetAllProdutosAsync();
                if (produtos == null)
                {
                    return null;
                }

                var resultado = _mapper.Map<ProdutoDto[]>(produtos);
                return resultado;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<ProdutoDto[]> GetAllProdutosByTipoAsync(string tipo)
        {
            try
            {
                var produtos = await _salonManagementPersist.GetAllProdutosByTipoAsync(tipo);
                if (produtos == null)
                {
                    return null;
                }
                var resultado = _mapper.Map<ProdutoDto[]>(produtos);
                return resultado;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<ProdutoDto[]> GetAllProdutosByMarcaAsync(string marca)
        {
            try
            {
                var produtos = await _salonManagementPersist.GetAllProdutosByMarcaAsync(marca);
                if (produtos == null)
                {
                    return null;
                }
                var resultado = _mapper.Map<ProdutoDto[]>(produtos);
                return resultado;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<ProdutoDto> GetProdutoByIdAsync(int produtoId)
        {
            try
            {
                var produto = await _salonManagementPersist.GetProdutoByIdAsync(produtoId);
                if (produto == null)
                {
                    return null;
                }
                var resultado = _mapper.Map<ProdutoDto>(produto);
                return resultado;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}