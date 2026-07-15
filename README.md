# Bytebank Statement MFE

Microfrontend responsavel por exibir o extrato de transacoes no shell do Bytebank.

## Visao geral

- Package: `@bytebank/statement`
- Porta local (webpack): `9005`
- Porta container (docker): `8084`
- Artefato servido: `bytebank-statement.js`

## Pre-requisitos

1. Node.js 18+
2. npm 9+
3. Docker Desktop (opcional, para execucao via container)

## Instalacao

```bash
npm install
```

## Executando em desenvolvimento (npm)

1. Inicie o servidor de desenvolvimento:

```bash
npm start
```

2. O MFE sera servido em `http://localhost:9005/bytebank-statement.js`.

3. Para rodar isolado (sem orchestrator), use:

```bash
npm run start:standalone
```

## Executando em desenvolvimento (Docker)

1. Suba o container:

```bash
npm run start:docker
```

2. O MFE sera servido em `http://localhost:8084/bytebank-statement.js`.

Para parar os containers:

```bash
npm run stop:docker
```

## Integracao com o orchestrator

- Modo local do orchestrator (`isLocal`): consome `http://localhost:9005/bytebank-statement.js`

## Responsividade

- Layout do extrato ajustado para telas pequenas, tablets e desktop.
- Breakpoints validados: 320px, 768px e 1024px.
- Ajustes principais: container com espacamento responsivo, itens de transacao com melhor adaptacao horizontal e tipografia escalavel.

## Scripts uteis

- `npm start`: sobe webpack dev server na porta 9005
- `npm run start:standalone`: executa standalone
- `npm run start:docker`: sobe container Docker com build
- `npm run stop:docker`: derruba containers do Docker Compose
- `npm run build`: build de producao
- `npm test`: executa testes
- `npm run coverage`: executa testes com cobertura
- `npm run lint`: lint
- `npm run type-check`: verificacao de tipos
- `npm run format`: formatacao com Prettier

## Testes

```bash
npm test
```

Para cobertura:

```bash
npm run coverage
```

## Troubleshooting

1. Se a porta `9005` estiver ocupada, finalize o processo em conflito e rode `npm start` novamente.
2. Se o extrato nao aparecer no shell, valide o perfil de portas do orchestrator e o endpoint do MFE.
3. Se transacoes nao carregarem, verifique conectividade com a API local e logs de rede no navegador.
