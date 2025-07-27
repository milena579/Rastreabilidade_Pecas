using Microsoft.AspNetCore.Mvc;
using Rastreabilidade.API.Data;
using Microsoft.EntityFrameworkCore;

namespace Rastreabilidade.API.Controllers;

[ApiController]
[Route("api/[controller]")]

public class MovimentacaoController : Controller
{
    public readonly AppDbContext banco;

    public MovimentacaoController(AppDbContext context) {
        banco = context;
    }

    [HttpGet("peca/{idPeca}")]
    public async Task<ActionResult<IEnumerable<Movimentacao>>> GetMovimentacaoPeca(int idPeca)
    {
        var movimentacoes = await banco.Movimentacoes
            .Include(m => m.Origem)
            .Include(m => m.Destino)
            .Include(m => m.Peca)
            .Where(m => m.PecaId == idPeca)
            .OrderBy(m => m.Data)
            .ToListAsync();

        if (!movimentacoes.Any())
            return Ok("Nenhuma movimentação encontrada para essa peça");

        return Ok(movimentacoes);
    }
 
}

