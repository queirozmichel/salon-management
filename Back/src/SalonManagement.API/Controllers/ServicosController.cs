using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using SalonManagement.Persistence;
using SalonManagement.Domain;

namespace SalonManagement.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ServicosController : ControllerBase
    {
        private readonly SalonManagementContexto _contexto;
        public ServicosController(SalonManagementContexto contexto)
        {
            _contexto = contexto;
        }

        [HttpGet("{id}")]
        public Servico GetById(int id)
        {
            return _contexto.Servico.FirstOrDefault(servico => servico.Id == id);
        }

        [HttpGet]
        public IEnumerable<Servico> Get()
        {
            return _contexto.Servico;
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
