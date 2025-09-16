import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  // Função padrão para rota GET /
  getHello(): string {
    return 'Hello World!';
  }

  // Aqui podemos adicionar outras funções de utilidade do app
  // Exemplo: função de teste de status
  getStatus(): { status: string } {
    return { status: 'ok' };
  }
}
