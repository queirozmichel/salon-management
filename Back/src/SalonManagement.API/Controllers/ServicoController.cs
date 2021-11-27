using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using SalonManagement.API.Models;

namespace SalonManagement.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ServicoController : ControllerBase
    {
        public IEnumerable<Servico> _servico = new Servico[]
            {
                new Servico()
                {
                    ServicoId = 1,
                    DataServico = "25/11/2021",
                    Cliente = "Amanda",
                    DescricaoServico = "Arrumou o cabelo",
                    ProdutoUtilizadoServico = "Shampoo",
                    ValorServico = 25.49
                },
                new Servico()
                {
                    ServicoId = 2,
                    DataServico = "25/11/2021",
                    Cliente = "Jean",
                    DescricaoServico = "Arrumou o cabelo",
                    ProdutoUtilizadoServico = "Shampoo",
                    ValorServico = 25.49
                }
            };
        public ServicoController()
        {

        }

        [HttpGet("{id}")]
        public IEnumerable<Servico> GetById(int id)
        {
            return _servico.Where(servico => servico.ServicoId == id);
        }

        [HttpGet]
        public IEnumerable<Servico> Get()
        {
            return _servico;
        }

        [HttpPost]
        public string Post()
        {
            return "post";
        }

        [HttpPut("{id}")]
        public string Put(int id, string nome)
        {
            return $"put {id} e {nome}";
        }
    }
}
