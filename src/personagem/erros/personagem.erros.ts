import { BadRequestException, NotFoundException } from '@nestjs/common';

export class AmuletoDuplicadoException extends BadRequestException {
  constructor() {
    super('Você não pode ter mais de um Amuleto.');
  }
}

export class DefesaComArmaException extends BadRequestException {
  constructor() {
    super('Seu item é do tipo ARMA, sua defesa precisa ser 0.');
  }
}

export class ForcaComArmaduraException extends BadRequestException {
  constructor() {
    super('Seu item é do tipo ARMADURA, sua força precisa ser 0.');
  }
}

export class PersonagemNaoEncontradoException extends NotFoundException {
  constructor(id: number | string) {
    super(`Personagem com ID '${id}' não encontrado.`);
  }
}
