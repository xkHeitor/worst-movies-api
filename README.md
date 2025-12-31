# Worst Movies API

API para consultar intervalos de prêmios consecutivos de produtores.

## Como Rodar

### Com Docker (Recomendado)
```bash
docker-compose up
```
Acesse: http://localhost:3000

### Local (requer Node.js 20+)
```bash
npm install
npm run build
npm start
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