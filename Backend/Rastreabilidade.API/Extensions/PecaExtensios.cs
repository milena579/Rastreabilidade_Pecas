public static class PecaExtensions
{
    public static PecaDto ToDto(this Peca p) =>
        new(p.Id, p.Codigo, p.Status);
}
