using Microsoft.EntityFrameworkCore;
using Rastreabilidade.API.Data;

public class MovimentacaoService : IMovimentacaoService
{
    private readonly AppDbContext banco;

    public MovimentacaoService(AppDbContext context)
    {
        banco = context;
    }

    // 🔍 Buscar por ID da peça
    public async Task<IEnumerable<MovimentacaoDto>> BuscarPorPecaAsync(int pecaId)
    {
        var movimentacoes = await banco.Movimentacoes
            .Include(m => m.Peca)
            .Include(m => m.Origem)
            .Include(m => m.Destino)
            .Where(m => m.PecaId == pecaId)
            .ToListAsync();

        return movimentacoes.Select(m => m.ToDto());
    }

    // 🔍 Buscar por código da peça
    public async Task<IEnumerable<MovimentacaoDto>> BuscarPorCodigoPecaAsync(string codigo)
    {
        var peca = await banco.Pecas.FirstOrDefaultAsync(p => p.Codigo == codigo);

        if (peca == null)
            return Enumerable.Empty<MovimentacaoDto>();

        var movimentacoes = await banco.Movimentacoes
            .Include(m => m.Peca)
            .Include(m => m.Origem)
            .Include(m => m.Destino)
            .Where(m => m.PecaId == peca.Id)
            .ToListAsync();

        return movimentacoes.Select(m => m.ToDto());
    }

    // ➕ Criar nova movimentação
    public async Task<MovimentacaoDto> CriarAsync(MovimentacaoCreateDto dto)
    {
        // Validação simples (poderia ser mais robusta)
        var pecaExiste = await banco.Pecas.AnyAsync(p => p.Id == dto.PecaId);
        if (!pecaExiste)
            throw new Exception("Peça não encontrada.");

        var movimentacao = new Movimentacao
        {
            PecaId = dto.PecaId,
            OrigemId = dto.OrigemId,
            DestinoId = dto.DestinoId,
            Data = dto.Data,
            Responsavel = dto.Responsavel
        };

        banco.Movimentacoes.Add(movimentacao);
        await banco.SaveChangesAsync();

        // Carregar dados relacionados para o DTO
        await banco.Entry(movimentacao).Reference(m => m.Peca).LoadAsync();
        await banco.Entry(movimentacao).Reference(m => m.Origem).LoadAsync();
        await banco.Entry(movimentacao).Reference(m => m.Destino).LoadAsync();

        return movimentacao.ToDto();
    }
}
