public interface IMovimentacaoService
{
    Task<IEnumerable<MovimentacaoDto>> BuscarPorPecaAsync(int pecaId);
    Task<IEnumerable<MovimentacaoDto>> BuscarPorCodigoPecaAsync(string codigo);
    Task<MovimentacaoDto> CriarAsync(MovimentacaoCreateDto dto);
}
