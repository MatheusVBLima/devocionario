# Vídeo de divulgação (Remotion)

Reel vertical para o Instagram (1080×1920, 9:16, 30 fps, H.264 + AAC, ~40 s)
mostrando o site em um celular, com zoom nos toques e trilha original.

O vídeo pronto fica em `out/devocionario-reel.mp4`.

## Estrutura

- `scripts/capture.mjs` — abre o site com Playwright em viewport mobile,
  executa as interações (abas do rosário, liturgia, busca, rotina, tema) e salva
  as capturas em `public/shots/` e as coordenadas dos toques em `src/shots.json`.
- `scripts/make-music.mjs` — sintetiza a trilha (`public/audio/trilha.wav`),
  um arranjo suave sobre a progressão do Cânone de Pachelbel (domínio público),
  e o som de toque. Por ser original, não há risco de bloqueio por direitos autorais.
- `src/timeline.ts` — roteiro: legendas, rolagem, toques e zooms de cada cena.

## Comandos

```bash
npm install
npm run studio   # pré-visualização no navegador
npm run render   # gera out/devocionario-reel.mp4
```

Para atualizar as telas, rode o site (`bun run dev` na raiz) e depois:

```bash
SITE_URL=http://localhost:3000 npm run capture
npm run music    # opcional: regenera a trilha
```

Se o Remotion não conseguir baixar o Chrome, aponte para um já instalado com
`REMOTION_BROWSER=/caminho/para/chrome-headless-shell npm run render`.
