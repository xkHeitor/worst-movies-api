# Worst Movies API

API para consultar intervalos de prêmios consecutivos de produtores.

## Pré-requisitos

- Node.js 22+
- npm

## Como Rodar

### Desenvolvimento Local

1. Clone o repositório e acesse a pasta:
```bash
git clone <url-do-repositorio>
cd worst-movies-api
```

2. Copie o arquivo de exemplo de variáveis de ambiente (opcional):
```bash
cp .env.example .env
```
> **Nota:** O projeto funciona com valores padrão. O arquivo `.env` é opcional.

3. Instale as dependências e rode:
```bash
npm install
npm run dev
```

Acesse: http://localhost:3000

### Com Docker
```bash
docker-compose up
```
Acesse: http://localhost:3000

### Build de Produção Local
```bash
npm install
npm run build
npm start
```

## Testes

### Rodar testes localmente (Recomendado)
```bash
npm install
npm test
```

### Rodar testes no Docker
```bash
docker build -f Dockerfile.test -t worst-movies-api-test .
docker run --rm worst-movies-api-test
```

### Com cobertura
```bash
npm run test:coverage
# ou
npm run test:cov
```

## Endpoint

**GET** `/awards/intervals`

Retorna produtores com menor e maior intervalo entre prêmios consecutivos.

**Exemplo de resposta:**
```json
{
  "min": [
    {
      "producer": "Joel Silver",
      "interval": 1,
      "previousWin": 1990,
      "followingWin": 1991
    }
  ],
  "max": [
    {
      "producer": "Matthew Vaughn",
      "interval": 13,
      "previousWin": 2002,
      "followingWin": 2015
    }
  ]
}
```

## Configuração

Variáveis de ambiente (`.env`):
- `PORT` - Porta do servidor (padrão: 3000)
- `CSV_PATH` - Caminho do CSV ou diretório (padrão: backend/data)
- `NODE_ENV` - Ambiente (development/production)