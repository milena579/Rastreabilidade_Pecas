
public class Movimentacao
{
    public int Id { get; set; }
    public DateTime Data { get; set; } = DateTime.Now;
    public string Responsavel { get; set; } = String.Empty;

    public int PecaId { get; set; }
    public Peca Peca { get; set; } = null!;

    public int? OrigemId { get; set; }
    public Estacao? Origem { get; set; }

    public int DestinoId { get; set; }
    public Estacao Destino { get; set; } = null!;

}