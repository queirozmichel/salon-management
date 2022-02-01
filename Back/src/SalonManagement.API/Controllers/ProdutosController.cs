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
    public class ProdutosController : ControllerBase
    {
        private readonly IProdutoService _produtoService;
        public ProdutosController(IProdutoService produtoService)
        {
            _produtoService = produtoService;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                var produtos = await _produtoService.GetAllProdutosAsync();
                if (produtos == null)
                {
                    return NoContent();
                }

                return Ok(produtos);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                 $"Erro ao tentar recuperar produtos. Erro: {ex.Message}");
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            try
            {
                var produto = await _produtoService.GetProdutoByIdAsync(id);
                if (produto == null)
                {
                    return NoContent();
                }
                return Ok(produto);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                 $"Erro ao tentar recuperar produto. Erro: {ex.Message}");
            }
        }

        [HttpGet("tipo/{tipo}")]
        public async Task<IActionResult> GetByTipo(string tipo)
        {
            try
            {
                var produto = await _produtoService.GetAllProdutosByTipoAsync(tipo);
                if (produto == null)
                {
                    return NoContent();
                }
                return Ok(produto);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                 $"Erro ao tentar recuperar produtos. Erro: {ex.Message}");
            }
        }

        [HttpGet("marca/{marca}")]
        public async Task<IActionResult> GetByMarca(string marca)
        {
            try
            {
                var produto = await _produtoService.GetAllProdutosByMarcaAsync(marca);
                if (produto == null)
                {
                    return NoContent();
                }
                return Ok(produto);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                 $"Erro ao tentar recuperar produtos. Erro: {ex.Message}");
            }
        }

        [HttpPost]
        public async Task<IActionResult> Post(ProdutoDto model)
        {
            try
            {
                var produto = await _produtoService.AddProduto(model);
                if (produto == null)
                {
                    return NoContent();
                }
                return Ok(produto);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                 $"Erro ao tentar adicionar o produto. Erro: {ex.Message}");
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, ProdutoDto model)
        {
            try
            {
                var produto = await _produtoService.UpdateProduto(id, model);
                if (produto == null)
                {
                    return NoContent();
                }
                return Ok(produto);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                 $"Erro ao tentar atualizar o produto. Erro: {ex.Message}");
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                var produto = await _produtoService.GetProdutoByIdAsync(id);
                if (produto == null)
                {
                    return NoContent();
                }


                if (await _produtoService.DeleteProduto(id))
                {
                    return Ok(new { mensagem = "Deletado" });
                }
                else
                {
                    throw new Exception("Ocorreu um problema ao tentar deletar o produto.");
                }
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                 $"Erro ao tentar deletar o produto. Erro: {ex.Message}");
            }
        }
    }
}
