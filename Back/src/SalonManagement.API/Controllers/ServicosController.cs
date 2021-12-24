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
    public class ServicosController : ControllerBase
    {
        private readonly IServicoService _servicoService;
        public ServicosController(IServicoService servicoService)
        {
            _servicoService = servicoService;

        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                var servicos = await _servicoService.GetAllServicosAsync(true);
                if (servicos == null)
                {
                    return NoContent();
                }

                return Ok(servicos);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                 $"Erro ao tentar recuperar serviços. Erro: {ex.Message}");
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            try
            {
                var servico = await _servicoService.GetServicoByIdAsync(id, true);
                if (servico == null)
                {
                    return NoContent();
                }
                return Ok(servico);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                 $"Erro ao tentar recuperar serviços. Erro: {ex.Message}");
            }
        }

        [HttpGet("data/{data}")]
        public async Task<IActionResult> GetByData(string data)
        {
            try
            {
                var servico = await _servicoService.GetAllServicosByDataAsync(data, true);
                if (servico == null)
                {
                    return NoContent();
                }
                return Ok(servico);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                 $"Erro ao tentar recuperar serviços. Erro: {ex.Message}");
            }
        }


        [HttpPost]
        public async Task<IActionResult> Post(ServicoDto model)
        {
            try
            {
                var servico = await _servicoService.AddServico(model);
                if (servico == null)
                {
                    return NoContent();
                }
                return Ok(servico);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                 $"Erro ao tentar adicionar o serviço. Erro: {ex.Message}");
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, ServicoDto model)
        {
            try
            {
                var servico = await _servicoService.UpdateServico(id, model);
                if (servico == null)
                {
                    return NoContent();
                }
                return Ok(servico);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                 $"Erro ao tentar atualizar o serviço. Erro: {ex.Message}");
            }
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                var servico = await _servicoService.GetServicoByIdAsync(id, true);
                if (servico == null)
                {
                    return NoContent();
                }


                if (await _servicoService.DeleteServico(id))
                {
                    return Ok("Deletado.");
                }
                else
                {
                    throw new Exception("Ocorreu um problema ao tentar deletar o serviço.");
                }
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                 $"Erro ao tentar deletar o serviço. Erro: {ex.Message}");
            }
        }
    }
}
