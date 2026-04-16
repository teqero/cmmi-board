# Exemplo de Configuração com Links para Premium Cards (v1.0.0.5)

## Estrutura de IBulletConfig

Cada bullet nos premium cards agora suporta links individuais:

```typescript
interface IBulletConfig {
  text: string;
  linkUrl?: string;
  enableLink?: boolean;
}
```

## Exemplo Completo JSON para Premium Cards

Copie e cole este JSON no Property Pane em **premiumCardsJson**:

```json
[
  {
    "icon": "Q",
    "title": "Qualidade",
    "hint": "PPQA · Auditoria e conformidade",
    "bullets": [
      {
        "text": "Aderencia ao processo",
        "linkUrl": "https://seu-site.com/qualidade/aderencia",
        "enableLink": true
      },
      {
        "text": "Evidencias e auditorias",
        "linkUrl": "https://seu-site.com/qualidade/evidencias",
        "enableLink": true
      },
      {
        "text": "Relatorios de conformidade",
        "linkUrl": "https://seu-site.com/qualidade/relatorios",
        "enableLink": true
      }
    ],
    "style": "gradient",
    "color": "blue"
  },
  {
    "icon": "C",
    "title": "Configuracao",
    "hint": "CM · Controle de versoes e baseline",
    "bullets": [
      {
        "text": "Versionamento de artefatos",
        "linkUrl": "https://seu-site.com/config/versionamento",
        "enableLink": true
      },
      {
        "text": "Baselines e rastreabilidade",
        "linkUrl": "https://seu-site.com/config/baselines",
        "enableLink": true
      },
      {
        "text": "Aprovacao de mudancas",
        "linkUrl": "https://seu-site.com/config/aprovacao",
        "enableLink": true
      }
    ],
    "style": "gradient",
    "color": "purple"
  },
  {
    "icon": "D",
    "title": "Decisao",
    "hint": "DAR · Escolha estruturada",
    "bullets": [
      {
        "text": "Criterios e pesos claros",
        "linkUrl": "https://seu-site.com/decisao/criterios",
        "enableLink": true
      },
      {
        "text": "Comparacao de alternativas",
        "linkUrl": "https://seu-site.com/decisao/alternativas",
        "enableLink": true
      },
      {
        "text": "Registro do racional tecnico",
        "linkUrl": "https://seu-site.com/decisao/registro",
        "enableLink": true
      }
    ],
    "style": "gradient",
    "color": "amber"
  },
  {
    "icon": "R",
    "title": "Causa Raiz",
    "hint": "CAR · Prevencao de recorrencia",
    "bullets": [
      {
        "text": "Investigacao de falhas",
        "linkUrl": "https://seu-site.com/causa-raiz/investigacao",
        "enableLink": true
      },
      {
        "text": "Identificacao da origem real",
        "linkUrl": "https://seu-site.com/causa-raiz/origem",
        "enableLink": true
      },
      {
        "text": "Plano de acao preventivo",
        "linkUrl": "https://seu-site.com/causa-raiz/acao",
        "enableLink": true
      }
    ],
    "style": "gradient",
    "color": "red"
  }
]
```

## Exemplo com Alguns Links Desabilitados

```json
[
  {
    "icon": "Q",
    "title": "Qualidade",
    "hint": "PPQA · Auditoria e conformidade",
    "bullets": [
      {
        "text": "Aderencia ao processo",
        "linkUrl": "https://seu-site.com/qualidade/aderencia",
        "enableLink": true
      },
      {
        "text": "Evidencias e auditorias",
        "enableLink": false
      },
      {
        "text": "Relatorios de conformidade",
        "linkUrl": "https://seu-site.com/qualidade/relatorios",
        "enableLink": true
      }
    ],
    "style": "gradient",
    "color": "blue"
  }
]
```

## Como Usar

1. **Editar no Property Pane**: No SharePoint Editor, vá até Property Pane → **premiumCardsJson**
2. **Copiar o JSON**: Cole o JSON acima (substituindo os URLs pelo seu ambiente)
3. **Salvar**: Clique em Salvar
4. **Resultado**: Todos os bullets com `enableLink: true` e um `linkUrl` válido aparecerão como links sublinhados

## Campos de Referência

| Campo | Tipo | Obrigatório | Descrição |
|-------|------|-------------|-----------|
| `text` | string | ✅ Sim | Texto do bullet point |
| `linkUrl` | string | ❌ Não | URL do link (se não definido, será texto simples) |
| `enableLink` | boolean | ❌ Não | Se false, o link é ignorado mesmo que `linkUrl` exista |

## Estilos do Link

- Links aparecem com **cor herdada** do card
- Ao passar o mouse, a opacidade muda (0.8)
- Links abrem em **nova aba** (_blank)

## Compatibilidade com o Toggle Global

⚠️ **Importante**: O toggle **allowLinks** na Property Pane controla TODOS os links:
- Se `allowLinks = OFF` → Nenhum link funciona (card + bullets)
- Se `allowLinks = ON` → Links funcionam conforme configurado em cada objeto (`enableLink`)

Portanto, verifique o toggle **Allow Links** no Property Pane se os links não estiverem funcionando!
