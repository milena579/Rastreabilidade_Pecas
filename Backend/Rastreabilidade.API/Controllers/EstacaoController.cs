using Microsoft.AspNetCore.Mvc;
using Rastreabilidade.API.Data;
using Microsoft.EntityFrameworkCore;

namespace Rastreabilidade.API.Controllers;


[ApiController]
[Route("api/[controller]")]
public class EstacaoController : Controller
{
    public readonly AppDbContext banco;

    public EstacaoController(AppDbContext context)
    {
        banco = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Estacao>>> GetEstacoes()
    {
        return await banco.Estacoes.ToListAsync();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Estacao>> GetEstacao(int id)
    {
        var estacao = await banco.Estacoes.FindAsync(id);

        if (estacao == null)
        {
            return NotFound();
        }

        return estacao;
    }

    [HttpPost]
    public async Task<ActionResult<Estacao>> PostEstacao(Estacao estacao)
    {
        banco.Estacoes.Add(estacao);
        await banco.SaveChangesAsync();

        return CreatedAtAction(nameof(GetEstacoes), new { id = estacao.Id }, estacao);
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult<Estacao>> DeleteEstacao(int id){
        var estacao = await banco.Estacoes.FindAsync(id);

        if (estacao == null)
        {
            return NotFound();
        }

        banco.Estacoes.Remove(estacao);
        await banco.SaveChangesAsync();

        return Ok(estacao);
    }

    [HttpPut("{id}")]
    public async Task<ActionResult<Estacao>> PutEstacao(int id, Estacao estacao){

        if (id != estacao.Id){
            return BadRequest("O ID da URL não bate com o ID do objeto.");

        }

        banco.Entry(estacao).State = EntityState.Modified;

        try{
            await banco.SaveChangesAsync();
        }

        catch (DbUpdateConcurrencyException){
            if (!banco.Estacoes.Any(e => e.Id == id))
            {
                return NotFound();
            }
            else
            {
                throw;
            }
        }

        return Ok(estacao);
    }
}