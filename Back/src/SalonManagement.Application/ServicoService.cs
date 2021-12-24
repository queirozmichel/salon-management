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
    public class ServicoService : IServicoService
    {
        private readonly ISalonManagementPersist _salonManagementPersist;
        private readonly IMapper _mapper;
        public ServicoService(ISalonManagementPersist salonManagementPersist, IMapper mapper)
        {
            _mapper = mapper;
            _salonManagementPersist = salonManagementPersist;

        }
        public async Task<ServicoDto> AddServico(ServicoDto model)
        {
            try
            {
                var servico = _mapper.Map<Servico>(model);
                _salonManagementPersist.Add<Servico>(servico);

                if (await _salonManagementPersist.SaveChangesAsync())
                {
                    var servicoRetorno = await _salonManagementPersist.GetServicoByIdAsync(servico.Id, false);
                    return _mapper.Map<ServicoDto>(servicoRetorno);
                }
                return null;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<ServicoDto> UpdateServico(int servicoId, ServicoDto model)
        {
            try
            {
                var servico = await _salonManagementPersist.GetServicoByIdAsync(servicoId, false);
                if (servico == null)
                {
                    return null;
                }

                model.Id = servico.Id;

                _mapper.Map(model, servico);


                _salonManagementPersist.Update<Servico>(servico);

                if (await _salonManagementPersist.SaveChangesAsync())
                {
                    var servicoRetorno = await _salonManagementPersist.GetServicoByIdAsync(servico.Id, false);
                    return _mapper.Map<ServicoDto>(servicoRetorno);
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

        public async Task<ServicoDto[]> GetAllServicosAsync(bool incluirProdutos = false)
        {
            try
            {
                var servicos = await _salonManagementPersist.GetAllServicosAsync(incluirProdutos);
                if (servicos == null)
                {
                    return null;
                }

                var resultado = _mapper.Map<ServicoDto[]>(servicos);
                return resultado;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<ServicoDto[]> GetAllServicosByDataAsync(string data, bool incluirProdutos = false)
        {
            try
            {
                var servicos = await _salonManagementPersist.GetAllServicosByDataAsync(data, incluirProdutos);
                if (servicos == null)
                {
                    return null;
                }
                var resultado = _mapper.Map<ServicoDto[]>(servicos);
                return resultado;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<ServicoDto> GetServicoByIdAsync(int servicoId, bool incluirProdutos = false)
        {
            try
            {
                var servico = await _salonManagementPersist.GetServicoByIdAsync(servicoId, incluirProdutos);
                if (servico == null)
                {
                    return null;
                }
                var resultado = _mapper.Map<ServicoDto>(servico);
                return resultado;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}