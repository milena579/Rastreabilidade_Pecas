public static class EstacaoExtensions
{
    public static EstacaoDto ToDto(this Estacao e) =>
        new(e.Id, e.Nome, e.Ordem);
}
