using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using SalonManagement.API.Data;
using SalonManagement.API.Models;

namespace SalonManagement.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ServicoController : ControllerBase
    {
        private readonly ContextoDeDados _contexto;
        public ServicoController(ContextoDeDados contexto)
        {
            _contexto = contexto;
        }

        [HttpGet("{id}")]
        public Servico GetById(int id)
        {
            return _contexto.Servicos.FirstOrDefault(servico => servico.ServicoId == id);
        }

        [HttpGet]
        public IEnumerable<Servico> Get()
        {
            return _contexto.Servicos;
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
