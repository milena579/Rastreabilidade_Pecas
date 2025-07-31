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
        if (banco.Pecas == null)
        {
            return NotFound();
        }

        var pecas = await banco.Pecas.ToListAsync();
        return Ok(new { dados = pecas });
    }


   [HttpGet("{id}")]
    public ActionResult<PecaDto> GetPeca(int id)
    {
        var peca = banco.Pecas
            .Include(p => p.Movimentacoes)
            .FirstOrDefault(p => p.Id == id);

        if (peca == null) return NotFound();

        var dto = new PecaDto(peca.Id, peca.Codigo, peca.Status);

        return Ok(dto);
    }


    [HttpPost]
    public async Task<IActionResult> Post([FromBody] PecaDto dto)
    {
       
        var novaPeca = new Peca
        {
            Codigo = dto.Codigo,
            Status =  "-",
            Movimentacoes = new List<Movimentacao>()
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