using Microsoft.AspNetCore.Mvc;
using Rastreabilidade.API.Data;
using Microsoft.EntityFrameworkCore;

namespace Rastreabilidade.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PecaController : Controller
{
    public readonly AppDbContext banco;

    public PecaController(AppDbContext context)
    {
        banco = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Peca>>> GetPecas()
    {
        if (banco.Pecas == null)
        {
            return NotFound();
        }

        var pecas = await banco.Pecas.ToListAsync();
        return Ok(new { dados = pecas });
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Peca>> GetPeca(int id)
    {
        var Peca = await banco.Pecas.FindAsync(id);

        if (Peca == null)
        {
            return NotFound();
        }

        return Peca;
    }

    [HttpPost]
    public async Task<IActionResult> Post([FromBody] PecaDTO dto)
    {
        var estacaoInicial = await banco.Estacoes
            .FirstOrDefaultAsync(e => e.Ordem == 1);

        if (estacaoInicial == null)
        {
            return BadRequest("Não foi encontrada uma estação com ordem 1.");
        }

        var novaPeca = new Peca
        {
            Codigo = dto.Codigo,
            Status = estacaoInicial?.Nome ?? "Recebida",
            Movimentacoes = new List<Movimentacao>() // ainda pode receber movimentações depois
        };

        banco.Pecas.Add(novaPeca);
        await banco.SaveChangesAsync();

        return Ok(novaPeca);
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult<Peca>> DeletePeca(int id){
        var Peca = await banco.Pecas.FindAsync(id);

        if (Peca == null)
        {
            return NotFound();
        }

        banco.Pecas.Remove(Peca);
        await banco.SaveChangesAsync();

        return Ok(Peca);
    }

    [HttpPut("{id}")]
    public async Task<ActionResult<Peca>> PutPeca(int id, Peca Peca){

        if (id != Peca.Id){
            return BadRequest("O ID da URL não bate com o ID do objeto.");

        }

        banco.Entry(Peca).State = EntityState.Modified;

        try{
            await banco.SaveChangesAsync();
        }

        catch (DbUpdateConcurrencyException){
            if (!banco.Pecas.Any(e => e.Id == id))
            {
                return NotFound();
            }
            else
            {
                throw;
            }
        }

        return Ok(Peca);
    }
}