using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using SalonManagement.Application.Dtos;
using SalonManagement.Domain;

namespace SalonManagement.Application.Helpers
{
    public class SalonManagementProfile : Profile
    {
        public SalonManagementProfile()
        {
            CreateMap<Servico, ServicoDto>().ReverseMap(); // ReverseMap é CreateMap<ServicoDto, Servico>()
            CreateMap<Cliente, ClienteDto>().ReverseMap();
            CreateMap<Profissional, ProfissionalDto>().ReverseMap();
            CreateMap<Produto, ProdutoDto>().ReverseMap();
        }
    }
}