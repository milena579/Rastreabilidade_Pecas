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

    [HttpGet("{idPeca}")]
    public async Task<ActionResult<IEnumerable<MovimentacaoDto>>> GetMovimentacaoPeca(int idPeca)
    {
        try
        {
            var movimentacoes = await banco.Movimentacoes
                .Include(m => m.Origem)
                .Include(m => m.Destino)
                .Include(m => m.Peca)
                .Where(m => m.PecaId == idPeca)
                .OrderBy(m => m.Data)
                .ToListAsync();

            var dtoList = movimentacoes.Select(m => m.ToDto()).ToList();

            return Ok(new { dados = dtoList });
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Erro ao buscar movimentações da peça {idPeca}: {ex.Message}");
            return StatusCode(500, "Erro interno ao buscar movimentações.");
        }
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<MovimentacaoDto>>> GetMovimentacoes()
    {
        if (banco.Movimentacoes == null)
        {
            return NotFound();
        }

        var movimentacaos = await banco.Movimentacoes
            .Include(m => m.Peca)
            .Include(m => m.Origem)
            .Include(m => m.Destino)
            .ToListAsync();


        var dtoList = movimentacaos.Select(m => m.ToDto()).ToList();

        return Ok(new { dados = dtoList });
    }


    [HttpGet("buscar/{codigo}")]
    public async Task<ActionResult<IEnumerable<MovimentacaoDto>>> BuscarPorPeca(string codigo)
    {
        try {
            var movimentacoes = await banco.Movimentacoes
                .Include(m => m.Origem)
                .Include(m => m.Destino)
                .Include(m => m.Peca)
                .Where(m => m.Peca.Codigo == codigo)
                .OrderBy(m => m.Data)
                .ToListAsync();

            var dtoList = movimentacoes.Select(m => m.ToDto()).ToList();

            return Ok(new { dados = dtoList });
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Erro ao buscar movimentações da peça {codigo}: {ex.Message}");
            return StatusCode(500, "Erro interno ao buscar movimentações.");
        }

    }

    [HttpPost]
    public async Task<IActionResult> Post([FromBody] MovimentacaoCreateDto dto)
    {
        var peca = await banco.Pecas.FirstOrDefaultAsync(p => p.Id == dto.PecaId);
        if (peca == null)
            return NotFound("Peça não encontrada.");
        var estacaoAtual = await banco.Movimentacoes
            .Where(m => m.PecaId == peca.Id)
            .OrderByDescending(m => m.Data)
            .Select(m => m.Destino)
            .FirstOrDefaultAsync();
            
        var destino = await banco.Estacoes.FirstOrDefaultAsync(e => e.Id == dto.DestinoId);
        if (destino == null)
            return NotFound("Estação de destino não encontrada.");

        if (estacaoAtual == null)
        {
            if (destino.Ordem != 1)
                return BadRequest("Movimentação inicial só pode ir para a primeira estação.");
        }
        else
        {
            if (destino.Ordem != estacaoAtual.Ordem + 1)
                return BadRequest("Movimentação inválida: é preciso seguir a ordem correta.");
        }

        peca.Status = destino.Ordem == 3 ? "Finalizada" : destino.Nome;

        var novaMovimentacao = new Movimentacao
        {
            PecaId = dto.PecaId,
            OrigemId = estacaoAtual?.Id,
            DestinoId = dto.DestinoId,
            Data = dto.Data,
            Responsavel = dto.Responsavel,
            Origem = estacaoAtual,
            Destino = destino
        };

        banco.Movimentacoes.Add(novaMovimentacao);
        banco.Pecas.Update(peca);
        await banco.SaveChangesAsync();

        return Ok(novaMovimentacao.ToDto());
    }

}
