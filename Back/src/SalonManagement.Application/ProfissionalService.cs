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
    public class ProfissionalService : IProfissionalService
    {
        private readonly ISalonManagementPersist _salonManagementPersist;
        private readonly IMapper _mapper;
        public ProfissionalService(ISalonManagementPersist salonManagementPersist, IMapper mapper)
        {
            _mapper = mapper;
            _salonManagementPersist = salonManagementPersist;

        }
        public async Task<ProfissionalDto> AddProfissional(ProfissionalDto model)
        {
            try
            {
                var profissional = _mapper.Map<Profissional>(model);
                _salonManagementPersist.Add<Profissional>(profissional);

                if (await _salonManagementPersist.SaveChangesAsync())
                {
                    var profissionalRetorno = await _salonManagementPersist.GetProfissionalByIdAsync(profissional.Id);
                    return _mapper.Map<ProfissionalDto>(profissionalRetorno);
                }
                return null;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<ProfissionalDto> UpdateProfissional(int profissionalId, ProfissionalDto model)
        {
            try
            {
                var profissional = await _salonManagementPersist.GetProfissionalByIdAsync(profissionalId);
                if (profissional == null)
                {
                    return null;
                }

                model.Id = profissional.Id;

                _mapper.Map(model, profissional);


                _salonManagementPersist.Update<Profissional>(profissional);

                if (await _salonManagementPersist.SaveChangesAsync())
                {
                    var profissionalRetorno = await _salonManagementPersist.GetProfissionalByIdAsync(profissional.Id);
                    return _mapper.Map<ProfissionalDto>(profissionalRetorno);
                }
                return null;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<bool> DeleteProfissional(int profissionalId)
        {
            try
            {
                var profissional = await _salonManagementPersist.GetProfissionalByIdAsync(profissionalId);
                if (profissional == null)
                {
                    throw new Exception("Profissional para delete não encontrado.");
                }

                _salonManagementPersist.Delete<Profissional>(profissional);

                return await _salonManagementPersist.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<ProfissionalDto[]> GetAllProfissionaisAsync()
        {
            try
            {
                var profissionais = await _salonManagementPersist.GetAllProfissionaisAsync();
                if (profissionais == null)
                {
                    return null;
                }

                var resultado = _mapper.Map<ProfissionalDto[]>(profissionais);
                return resultado;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<ProfissionalDto[]> GetAllProfissionaisByNameAsync(string nome)
        {
            try
            {
                var profissionais = await _salonManagementPersist.GetAllProfissionaisByNameAsync(nome);
                if (profissionais == null)
                {
                    return null;
                }
                var resultado = _mapper.Map<ProfissionalDto[]>(profissionais);
                return resultado;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<ProfissionalDto> GetProfissionalByIdAsync(int profissionalId)
        {
            try
            {
                var profissional = await _salonManagementPersist.GetProfissionalByIdAsync(profissionalId);
                if (profissional == null)
                {
                    return null;
                }
                var resultado = _mapper.Map<ProfissionalDto>(profissional);
                return resultado;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}