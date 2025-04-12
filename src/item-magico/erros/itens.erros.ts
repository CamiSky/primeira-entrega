import { BadRequestException } from "@nestjs/common";

export class ItensInvalidosException extends BadRequestException {
    constructor(ids: number[]) {
      super(`IDs inválidos: ${ids.join(', ')}`);
    }
  }