using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using SalonManagement.Persistence;
using SalonManagement.Domain;
using SalonManagement.Persistence.Contextos;
using SalonManagement.Application.Contratos;
using Microsoft.AspNetCore.Http;
using SalonManagement.Application.Dtos;

namespace SalonManagement.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProfissionaisController : ControllerBase
    {
        private readonly IProfissionalService _profissionalService;
        public ProfissionaisController(IProfissionalService profissionalService)
        {
            _profissionalService = profissionalService;

        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                var profissionais = await _profissionalService.GetAllProfissionaisAsync();
                if (profissionais == null)
                {
                    return NoContent();
                }

                return Ok(profissionais);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                 $"Erro ao tentar recuperar profissionais. Erro: {ex.Message}");
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            try
            {
                var profissional = await _profissionalService.GetProfissionalByIdAsync(id);
                if (profissional == null)
                {
                    return NoContent();
                }
                return Ok(profissional);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                 $"Erro ao tentar recuperar profissional. Erro: {ex.Message}");
            }
        }

        [HttpGet("nome/{nome}")]
        public async Task<IActionResult> GetByNome(string nome)
        {
            try
            {
                var profissionais = await _profissionalService.GetAllProfissionaisByNameAsync(nome);
                if (profissionais == null)
                {
                    return NoContent();
                }
                return Ok(profissionais);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                 $"Erro ao tentar recuperar profissionais. Erro: {ex.Message}");
            }
        }


        [HttpPost]
        public async Task<IActionResult> Post(ProfissionalDto model)
        {
            try
            {
                var profissional = await _profissionalService.AddProfissional(model);
                if (profissional == null)
                {
                    return NoContent();
                }
                return Ok(profissional);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                 $"Erro ao tentar adicionar o profissional. Erro: {ex.Message}");
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, ProfissionalDto model)
        {
            try
            {
                var profissional = await _profissionalService.UpdateProfissional(id, model);
                if (profissional == null)
                {
                    return NoContent();
                }
                return Ok(profissional);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                 $"Erro ao tentar atualizar o profissional. Erro: {ex.Message}");
            }
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                var profissional = await _profissionalService.GetProfissionalByIdAsync(id);
                if (profissional == null)
                {
                    return NoContent();
                }


                if (await _profissionalService.DeleteProfissional(id))
                {
                    return Ok(new { mensagem = "Deletado" });
                }
                else
                {
                    throw new Exception("Ocorreu um problema ao tentar deletar o profissional.");
                }
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                 $"Erro ao tentar deletar o profissional. Erro: {ex.Message}");
            }
        }
    }
}
