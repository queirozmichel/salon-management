using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using SalonManagement.Application.Contratos;
using SalonManagement.Domain;
using SalonManagement.Persistence.Contratos;

namespace SalonManagement.Application
{
    public class ServicoService : IServicoService
    {
        private readonly ISalonManagementPersist _salonManagementPersist;
        public ServicoService(ISalonManagementPersist salonManagementPersist)
        {
            _salonManagementPersist = salonManagementPersist;

        }
        public async Task<Servico> AddServico(Servico model)
        {
            try
            {
                _salonManagementPersist.Add<Servico>(model);
                if (await _salonManagementPersist.SaveChangesAsync())
                {
                    return await _salonManagementPersist.GetServicoByIdAsync(model.Id, false);
                }
                return null;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<Servico> UpdateServico(int servicoId, Servico model)
        {
            try
            {
                var servico = await _salonManagementPersist.GetServicoByIdAsync(servicoId, false);
                if (servico == null)
                {
                    return null;
                }

                model.Id = servico.Id;

                _salonManagementPersist.Update(model);

                if (await _salonManagementPersist.SaveChangesAsync())
                {
                    return await _salonManagementPersist.GetServicoByIdAsync(model.Id, false);
                }
                return null;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<bool> DeleteServico(int servicoId)
        {
            try
            {
                var servico = await _salonManagementPersist.GetServicoByIdAsync(servicoId, false);
                if (servico == null)
                {
                    throw new Exception("Serviço para delete não encontrado.");
                }

                _salonManagementPersist.Delete<Servico>(servico);

                return await _salonManagementPersist.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<Servico[]> GetAllServicosAsync(bool incluirProdutos = false)
        {
            try
            {
                var servicos = await _salonManagementPersist.GetAllServicosAsync(incluirProdutos);
                if (servicos == null)
                {
                    return null;
                }
                return servicos;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<Servico[]> GetAllServicosByDataAsync(string data, bool incluirProdutos = false)
        {
            try
            {
                var servicos = await _salonManagementPersist.GetAllServicosByDataAsync(data, incluirProdutos);
                if (servicos == null)
                {
                    return null;
                }
                return servicos;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<Servico> GetServicoByIdAsync(int servicoId, bool incluirProdutos = false)
        {
            try
            {
                var servicos = await _salonManagementPersist.GetServicoByIdAsync(servicoId, incluirProdutos);
                if (servicos == null)
                {
                    return null;
                }
                return servicos;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}