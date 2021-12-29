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
    public class ClienteService : IClienteService
    {
        private readonly ISalonManagementPersist _salonManagementPersist;
        private readonly IMapper _mapper;
        public ClienteService(ISalonManagementPersist salonManagementPersist, IMapper mapper)
        {
            _mapper = mapper;
            _salonManagementPersist = salonManagementPersist;

        }
        public async Task<ClienteDto> AddCliente(ClienteDto model)
        {
            try
            {
                var cliente = _mapper.Map<Cliente>(model);
                _salonManagementPersist.Add<Cliente>(cliente);

                if (await _salonManagementPersist.SaveChangesAsync())
                {
                    var clienteRetorno = await _salonManagementPersist.GetClienteByIdAsync(cliente.Id);
                    return _mapper.Map<ClienteDto>(clienteRetorno);
                }
                return null;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<ClienteDto> UpdateCliente(int clienteId, ClienteDto model)
        {
            try
            {
                var cliente = await _salonManagementPersist.GetClienteByIdAsync(clienteId);
                if (cliente == null)
                {
                    return null;
                }

                model.Id = cliente.Id;

                _mapper.Map(model, cliente);


                _salonManagementPersist.Update<Cliente>(cliente);

                if (await _salonManagementPersist.SaveChangesAsync())
                {
                    var clienteRetorno = await _salonManagementPersist.GetClienteByIdAsync(cliente.Id);
                    return _mapper.Map<ClienteDto>(clienteRetorno);
                }
                return null;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<bool> DeleteCliente(int clienteId)
        {
            try
            {
                var cliente = await _salonManagementPersist.GetClienteByIdAsync(clienteId);
                if (cliente == null)
                {
                    throw new Exception("Cliente para delete não encontrado.");
                }

                _salonManagementPersist.Delete<Cliente>(cliente);

                return await _salonManagementPersist.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<ClienteDto[]> GetAllClientesAsync()
        {
            try
            {
                var clientes = await _salonManagementPersist.GetAllClientesAsync();
                if (clientes == null)
                {
                    return null;
                }

                var resultado = _mapper.Map<ClienteDto[]>(clientes);
                return resultado;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<ClienteDto[]> GetAllClientesByNameAsync(string nome)
        {
            try
            {
                var clientes = await _salonManagementPersist.GetAllClientesByNameAsync(nome);
                if (clientes == null)
                {
                    return null;
                }
                var resultado = _mapper.Map<ClienteDto[]>(clientes);
                return resultado;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<ClienteDto> GetClienteByIdAsync(int clienteId)
        {
            try
            {
                var cliente = await _salonManagementPersist.GetClienteByIdAsync(clienteId);
                if (cliente == null)
                {
                    return null;
                }
                var resultado = _mapper.Map<ClienteDto>(cliente);
                return resultado;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}