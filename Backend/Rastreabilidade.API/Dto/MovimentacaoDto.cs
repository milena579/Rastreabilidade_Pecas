public class MovimentacaoDto
{
    public int Id { get; set; }

    public int PecaId { get; set; }

    public int? OrigemId { get; set; }

    public int DestinoId { get; set; }

    public DateTime Data { get; set; } = DateTime.Now;

    public string Responsavel { get; set; } = String.Empty;



}