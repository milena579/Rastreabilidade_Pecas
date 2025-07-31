public record MovimentacaoDto(
    int Id,
    DateTime Data,
    string Responsavel,
    PecaDto Peca,
    EstacaoDto? Origem,
    EstacaoDto Destino
);
