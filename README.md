# 📦 Projeto Primeira Entrega Escola de TI - RPG
## 🚀 Tecnologias Utilizadas

#### NestJS
#### Prisma ORM
#### SQLite
#### Swagger

## ⚙️ Configuração Inicial

1. **Instale as dependências**

```bash
npm install
```

2. **Configure as variáveis de ambiente**

Crie um arquivo `.env` na raiz do projeto com o seguinte conteúdo:

```env
DATABASE_URL="file:./dev.dbc"
```

3. **Configure o banco de dados**

```bash
npx prisma generate
npx prisma migrate dev --name init
npx prisma studio
```

## ▶️ Inicie o servidor

```bash
npm run start:dev
```

O servidor estará disponível por padrão em: [http://localhost:3000](http://localhost:3000)

---

## 📚 Documentação da API

[http://localhost:3000/api](http://localhost:3000/api)

---
## ✅ Requisitos

- Node.js 18+
- npm 9+
