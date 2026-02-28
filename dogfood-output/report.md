# Dogfood Report: Devocionario

| Field | Value |
|-------|-------|
| **Date** | 2026-02-27 |
| **App URL** | http://127.0.0.1:3000 |
| **Session** | devocionario-local |
| **Scope** | Navegação principal, páginas públicas, filtros, responsividade básica e sinais de erro em runtime |

## Summary

| Severity | Count |
|----------|-------|
| Critical | 0 |
| High | 0 |
| Medium | 0 |
| Low | 2 |
| **Total** | **2** |

## Issues

### 1. Low: Header logo dispara warning recorrente de aspect ratio no `next/image`

- Taxonomy: Performance / Frontend warning
- URL: `http://127.0.0.1:3000/` e demais paginas publicas
- Evidence:
  - Screenshot: `C:\Web Workspace\devocionario\dogfood-output\screenshots\home.png`
  - Console: `C:\Web Workspace\devocionario\dogfood-output\console-warnings.txt`
- Repro steps:
  1. Abrir qualquer rota publica.
  2. Observar o console do navegador em dev.
  3. O Next.js emite warning para `logo.svg` informando alteracao de apenas uma dimensao.
- Expected:
  - O logo renderiza sem warning de aspect ratio.
- Actual:
  - Warning exibido: `Image with src "http://127.0.0.1:3000/logo.svg" has either width or height modified, but not the other`.
- Notes:
  - Nao quebra a UI, mas indica ajuste incorreto de `width`/`height` no logo do header.

### 2. Low: Primeira imagem da listagem de oracoes vira LCP sem `loading="eager"` em mobile

- Taxonomy: Performance / Image optimization
- URL: `http://127.0.0.1:3000/oracoes`
- Evidence:
  - Screenshot: `C:\Web Workspace\devocionario\dogfood-output\screenshots\oracoes-lista.png`
  - Screenshot: `C:\Web Workspace\devocionario\dogfood-output\screenshots\oracoes-lista-card-texto.png`
  - Console: `C:\Web Workspace\devocionario\dogfood-output\console-warnings.txt`
- Repro steps:
  1. Abrir `/oracoes` em viewport mobile.
  2. Observar o console do navegador em dev.
  3. O Next.js detecta a imagem do primeiro card como LCP e recomenda `loading="eager"`.
- Expected:
  - O item above-the-fold principal nao gera warning de LCP.
- Actual:
  - Warning exibido: a imagem `https://prd-imagens.s3.sa-east-1.amazonaws.com/...jpg` foi detectada como LCP e deveria usar carregamento eager se continuar acima da dobra.
- Notes:
  - Nao impede uso da pagina, mas sinaliza oportunidade real de ajuste de performance.

## Coverage

- Navegacao validada:
  - `/`
  - `/blog`
  - `/blog/1`
  - `/liturgia`
  - `/oracoes`
  - `/rosario`
  - `/rotina`
  - `/santos`
- Interacoes validadas:
  - Accordion do FAQ na home
  - Busca com `searchParams` em `/oracoes`
  - Menu mobile do header
- Endpoints tecnicos validados:
  - `/robots.txt`
  - `/sitemap.xml`
  - `/manifest.webmanifest`

