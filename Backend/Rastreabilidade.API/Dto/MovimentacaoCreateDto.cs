public class MovimentacaoCreateDto
{
    public int PecaId { get; set; }
    public int? OrigemId { get; set; }
    public int DestinoId { get; set; }
    public DateTime Data { get; set; } = DateTime.UtcNow;
    public string? Responsavel { get; set; }
}
