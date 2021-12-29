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
    public class ClientesController : ControllerBase
    {
        private readonly IClienteService _clienteService;
        public ClientesController(IClienteService clienteService)
        {
            _clienteService = clienteService;

        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                var clientes = await _clienteService.GetAllClientesAsync();
                if (clientes == null)
                {
                    return NoContent();
                }

                return Ok(clientes);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                 $"Erro ao tentar recuperar clientes. Erro: {ex.Message}");
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            try
            {
                var cliente = await _clienteService.GetClienteByIdAsync(id);
                if (cliente == null)
                {
                    return NoContent();
                }
                return Ok(cliente);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                 $"Erro ao tentar recuperar cliente. Erro: {ex.Message}");
            }
        }

        [HttpGet("nome/{nome}")]
        public async Task<IActionResult> GetByNome(string nome)
        {
            try
            {
                var cliente = await _clienteService.GetAllClientesByNameAsync(nome);
                if (cliente == null)
                {
                    return NoContent();
                }
                return Ok(cliente);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                 $"Erro ao tentar recuperar clientes. Erro: {ex.Message}");
            }
        }


        [HttpPost]
        public async Task<IActionResult> Post(ClienteDto model)
        {
            try
            {
                var cliente = await _clienteService.AddCliente(model);
                if (cliente == null)
                {
                    return NoContent();
                }
                return Ok(cliente);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                 $"Erro ao tentar adicionar o cliente. Erro: {ex.Message}");
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, ClienteDto model)
        {
            try
            {
                var cliente = await _clienteService.UpdateCliente(id, model);
                if (cliente == null)
                {
                    return NoContent();
                }
                return Ok(cliente);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                 $"Erro ao tentar atualizar o cliente. Erro: {ex.Message}");
            }
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                var cliente = await _clienteService.GetClienteByIdAsync(id);
                if (cliente == null)
                {
                    return NoContent();
                }


                if (await _clienteService.DeleteCliente(id))
                {
                    return Ok(new { mensagem = "Deletado" });
                }
                else
                {
                    throw new Exception("Ocorreu um problema ao tentar deletar o cliente.");
                }
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                 $"Erro ao tentar deletar o cliente. Erro: {ex.Message}");
            }
        }
    }
}
