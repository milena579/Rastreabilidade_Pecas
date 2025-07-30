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
    public async Task<ActionResult> GetPecas()
    {
        var lista = await banco.Pecas.ToListAsync();
        return Ok(new { dados = lista });
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
    public async Task<ActionResult<Peca>> PostPeca(Peca Peca)
    {
        banco.Pecas.Add(Peca);
        await banco.SaveChangesAsync();

        return CreatedAtAction(nameof(GetPecas), new { id = Peca.Id }, Peca);
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