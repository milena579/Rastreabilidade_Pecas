public static class MovimentacaoExtensions
{
    public static MovimentacaoDto ToDto(this Movimentacao m) =>
        new(
            m.Id,
            m.Data,
            m.Responsavel,
            m.Peca.ToDto(),
            m.Origem?.ToDto(),
            m.Destino.ToDto()
        );
}
