public class Peca
{
    public int Id { get; set; }
    public string Codigo { get; set; } = null!;
    public string Status { get; set; } = "-";

    public List<Movimentacao> Movimentacoes { get; set; } = new();
}
