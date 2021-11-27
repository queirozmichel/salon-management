using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using SalonManagement.API.Models;

namespace SalonManagement.API.Data
{
    public class ContextoDeDados : DbContext
    {
        public ContextoDeDados(DbContextOptions<ContextoDeDados> opcoes) : base(opcoes) { }
        public DbSet<Servico> Servicos { get; set; }
    }
}