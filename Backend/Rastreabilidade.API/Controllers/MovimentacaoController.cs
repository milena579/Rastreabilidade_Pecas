using Microsoft.AspNetCore.Mvc;
using Rastreabilidade.API.Data;
using Microsoft.EntityFrameworkCore;

namespace Rastreabilidade.API.Controllers;

[ApiController]
[Route("api/[controller]")]

public class MovimentacaoController : Controller
{
    public readonly AppDbContext banco;

    public MovimentacaoController(AppDbContext context)
    {
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


    [HttpGet]
    public async Task<ActionResult<IEnumerable<Movimentacao>>> GetMovimentacao()
    {
        return await banco.Movimentacoes.ToListAsync();
    }

    [HttpPost]
    public async Task<ActionResult<Movimentacao>> MoverPeca(Movimentacao novaMov)
    {
        var peca = await banco.Pecas
            .Include(p => p.Movimentacoes)
            .ThenInclude(m => m.Destino)
            .FirstOrDefaultAsync(p => p.Id == novaMov.PecaId);

        if (peca == null)
            return NotFound("Peça não encontrada");

        var ultimaMov = peca.Movimentacoes
            .OrderByDescending(m => m.Data)
            .FirstOrDefault();

        // Se for a primeira movimentação
        if (ultimaMov == null)
        {
            var estacaoInicial = await banco.Estacoes.OrderBy(e => e.Ordem).FirstOrDefaultAsync();
            if (novaMov.OrigemId != estacaoInicial!.Id)
                return BadRequest("A primeira movimentação deve começar pela primeira estação.");
        }
        else
        {
            // Garante que a movimentação segue a ordem correta
            if (novaMov.OrigemId != ultimaMov.DestinoId)
                return BadRequest("A origem da nova movimentação deve ser igual ao destino da última movimentação.");

            var estacaoOrigem = await banco.Estacoes.FindAsync(novaMov.OrigemId);
            var estacaoDestino = await banco.Estacoes.FindAsync(novaMov.DestinoId);

            if (estacaoDestino!.Ordem <= estacaoOrigem!.Ordem)
                return BadRequest("Não é permitido voltar para uma estação anterior.");
        }

        novaMov.Data = DateTime.Now;
        banco.Movimentacoes.Add(novaMov);
        await banco.SaveChangesAsync();

        return CreatedAtAction(nameof(MoverPeca), new { id = novaMov.Id }, novaMov);
    }

 
}

