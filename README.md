# cmmi-board

Web Part SPFx para landing page CMMI no SharePoint Online.

## Visão geral

O projeto implementa uma Web Part chamada **CMMI Board** com cartões e configuração via Property Pane.

Destaques:
- Baseado em **SPFx 1.22.2**
- React 17
- Configuração de conteúdo via JSON
- Suporte a links em premium cards

## Pré-requisitos

- Node.js `>=22.0.0 <23.0.0`
- npm
- Gulp CLI (opcional)
- Tenant SharePoint Online para validação/publicação

## Instalação

```bash
npm install
```

## Comandos úteis

```bash
# Limpar artefatos
npm run clean

# Bundle de desenvolvimento
npm run build

# Testes
npm run test

# Workbench local do SPFx
npx gulp serve
```

## Build para produção e pacote SharePoint

```bash
# Gera bundle otimizado
npx gulp bundle --ship

# Gera pacote .sppkg
npx gulp package-solution --ship
```

Pacote gerado em:

- `sharepoint/solution/cmmi-board.sppkg`

## Publicação no SharePoint (resumo)

1. Acesse o App Catalog do tenant.
2. Faça upload do arquivo `.sppkg`.
3. Aprove/deploy da solução.
4. Adicione a Web Part na página e configure no Property Pane.

## Configuração de Premium Cards

Há um exemplo completo com JSON de links em:

- `EXEMPLO_LINKS_PREMIUM_CARDS.md`

## Estrutura principal

- `src/webparts/cmmiBoard/` código-fonte da Web Part
- `src/webparts/cmmiBoard/components/` componentes React
- `config/` configurações de build/solução SPFx
- `sharepoint/solution/` pacote de distribuição
- `lib/` artefatos transpilados
- `release/` artefatos de release

## Versão

- Projeto: `0.0.1`
- Solução SPFx: `1.0.0.6`

## Observações

- A solução está com `skipFeatureDeployment: true`.
- Se links não funcionarem, revise a configuração no Property Pane e o JSON dos cards.
