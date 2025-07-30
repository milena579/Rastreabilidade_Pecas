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
    public MovimentacaoController(AppDbContext context)
    {
        banco = context;
    }

    [HttpGet("{idPeca}")]
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
    public async Task<ActionResult<IEnumerable<Movimentacao>>> GetMovimentacoes()
    {
        if (banco.Movimentacoes == null)
        {
            return NotFound();
        }
        var movimentacaos = await banco.Movimentacoes.ToListAsync();
        return Ok(new { dados = movimentacaos });
    }
    
    [HttpPost]
    public async Task<IActionResult> Registrar(Movimentacao movimentacao) {
        var peca = await banco.Pecas.FirstOrDefaultAsync(p => p.Id == movimentacao.PecaId);
        var estacoes = await banco.Estacoes.ToListAsync();

        var origem = estacoes.FirstOrDefault(e => e.Nome.Equals(movimentacao.Origem));
        var destino = estacoes.FirstOrDefault(e => e.Nome.Equals(movimentacao.Destino));

        if (destino.Ordem != origem.Ordem + 1)
            return BadRequest("Movimentação inválida: a ordem não está correta.");


        if (movimentacao.Destino.Ordem == 3)
        {
            peca.Status = "Finalizada";
        }
        
        peca.Status = destino.Nome;

        banco.Movimentacoes.Add(movimentacao);
        await banco.SaveChangesAsync();

        return Ok(movimentacao);
    }

 
}

