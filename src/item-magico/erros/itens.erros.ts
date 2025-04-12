import { BadRequestException, NotFoundException } from "@nestjs/common";

export class ItensInvalidosException extends BadRequestException {
  constructor(ids: number[]) {
    super(`IDs inválidos: ${ids.join(', ')}`);
  }
}

export class ItemMagicoNaoEncontradoException extends NotFoundException {
  constructor(id: number | string) {
    super(`Item Mágico com ID '${id}' não encontrado.`);
  }
}