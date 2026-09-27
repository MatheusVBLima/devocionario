// Captura as telas do site (viewport mobile) e as coordenadas dos toques
// usados no vídeo. Uso: SITE_URL=http://localhost:3000 npm run capture
import { chromium } from "playwright"
import { mkdir, writeFile } from "node:fs/promises"
import path from "node:path"
import { fileURLToPath } from "node:url"

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)))
const outDir = path.join(root, "public", "shots")
const siteUrl = process.env.SITE_URL ?? "http://localhost:3000"
const imageOrigin = process.env.IMAGE_ORIGIN ?? "https://www.devocionario.app"

const VIEWPORT = { width: 400, height: 860 }
const SCALE = 3

const browser = await chromium.launch({
  executablePath: process.env.CHROMIUM_PATH || undefined,
})
const context = await browser.newContext({
  viewport: VIEWPORT,
  deviceScaleFactor: SCALE,
  isMobile: true,
  hasTouch: true,
  locale: "pt-BR",
  timezoneId: "America/Sao_Paulo",
  colorScheme: "light",
})
await context.route(/\/_next\/image\?/, async (route) => {
  const url = new URL(route.request().url())
  try {
    const response = await fetch(imageOrigin + url.pathname + url.search)
    if (!response.ok) throw new Error(`HTTP ${response.status}`)
    await route.fulfill({
      status: 200,
      contentType: response.headers.get("content-type") ?? "image/jpeg",
      body: Buffer.from(await response.arrayBuffer()),
    })
  } catch {
    await route.continue()
  }
})
const page = await context.newPage()
const manifest = { viewport: VIEWPORT, scale: SCALE, shots: {}, points: {} }

await mkdir(outDir, { recursive: true })

async function go(pathname) {
  for (let attempt = 0; attempt < 5; attempt++) {
    try {
      await page.goto(siteUrl + pathname, { waitUntil: "load", timeout: 90_000 })
      break
    } catch (error) {
      if (attempt === 4) throw error
      await page.waitForTimeout(2000 * (attempt + 1))
    }
  }
  // O cabeçalho fixo é sobreposto no vídeo, então aqui ele fica no fluxo da página.
  await page.addStyleTag({
    content: `
      nextjs-portal { display: none !important; }
      header.sticky { position: relative !important; }
      * { caret-color: transparent !important; }
    `,
  })
  await page.evaluate(() => document.fonts.ready)
  // Força o carregamento das imagens lazy antes das capturas de página inteira.
  await page.evaluate(async () => {
    for (let y = 0; y < document.documentElement.scrollHeight; y += 500) {
      window.scrollTo(0, y)
      await new Promise((resolve) => setTimeout(resolve, 120))
    }
    window.scrollTo(0, 0)
  })
  await page.waitForLoadState("networkidle").catch(() => {})
  await page.waitForTimeout(800)
}

async function snap(name, maxHeight = 2400) {
  const fullHeight = await page.evaluate(() => document.documentElement.scrollHeight)
  const height = Math.min(maxHeight, fullHeight)
  const file = `${name}.jpg`
  await page.screenshot({
    path: path.join(outDir, file),
    type: "jpeg",
    quality: 90,
    fullPage: true,
    clip: { x: 0, y: 0, width: VIEWPORT.width, height },
    animations: "disabled",
  })
  manifest.shots[name] = { src: `shots/${file}`, height }
  console.log("snap", name, height)
}

async function blur() {
  await page.evaluate(() => (document.activeElement instanceof HTMLElement) && document.activeElement.blur())
}

/** Guarda o centro do elemento em coordenadas da página (px CSS). */
async function point(name, locator) {
  await locator.scrollIntoViewIfNeeded()
  const box = await locator.boundingBox()
  const scrollY = await page.evaluate(() => window.scrollY)
  const value = {
    x: Math.round(box.x + box.width / 2),
    y: Math.round(box.y + scrollY + box.height / 2),
    top: Math.round(box.y + scrollY),
  }
  manifest.points[name] = value
  await page.evaluate(() => window.scrollTo(0, 0))
  return value
}

async function tap(locator) {
  await locator.click()
  await page.waitForTimeout(900)
  await blur()
  await page.evaluate(() => window.scrollTo(0, 0))
}

// 1. Home + Santo Rosário
await go("/")
manifest.points.header = { height: await page.locator("header").evaluate((el) => el.getBoundingClientRect().height) }
await snap("home", 3400)
const dolorosos = page.getByRole("button", { name: "Dolorosos", exact: true })
await point("rosarioTitle", page.getByRole("heading", { name: /Mistérios/ }).first())
await point("dolorosos", dolorosos)
await tap(dolorosos)
await snap("home-dolorosos", 3400)
const coroacao = page.getByRole("button", { name: /Coroação de Espinhos/ })
await point("coroacao", coroacao)
await tap(coroacao)
await snap("home-coroacao", 3400)

// 2. Liturgia diária
await go("/liturgia")
await snap("liturgia", 1600)
const evangelho = page.getByRole("tab", { name: "Evangelho" })
await point("evangelho", evangelho)
await tap(evangelho)
await snap("liturgia-evangelho", 1600)

// 3. Orações com busca
await go("/oracoes")
await snap("oracoes", 2200)
const busca = page.getByRole("searchbox")
await point("busca", busca)
await busca.click()
const query = process.env.SEARCH_QUERY ?? "Miguel"
manifest.query = query
for (let i = 1; i <= query.length; i++) {
  await page.keyboard.type(query[i - 1])
  await page.waitForTimeout(60)
  if (i < query.length) await snap(`oracoes-busca-${i}`, 1400)
}
await page.waitForURL(/q=/, { timeout: 15_000 }).catch(() => {})
await page.waitForTimeout(2500)
await page.evaluate(() => window.scrollTo(0, 0))
await snap(`oracoes-busca-${query.length}`, 2200)

// 4. Rotina católica
await go("/rotina")
await snap("rotina-0", 3400)
const tips = page.getByRole("button", { pressed: false })
const tipNames = ["Oração da manhã", "Leitura espiritual"]
await point("dicas", page.getByRole("heading", { name: /Dicas para sua rotina/ }))
for (const [index, name] of tipNames.entries()) {
  const tip = tips.filter({ hasText: name }).first()
  await point(`tip${index + 1}`, tip.locator("[aria-hidden]").first())
  await tap(tip)
  await snap(`rotina-${index + 1}`, 3400)
}

// 5. Tema: modo escuro e cores do tempo litúrgico
await go("/")
const trigger = page.getByRole("button", { name: /^Tema:/ })
await point("tema", trigger)
await trigger.click()
await page.waitForTimeout(600)
await snap("tema-menu", 1200)
const escuro = page.getByRole("menuitemradio", { name: "Escuro" })
await point("escuro", escuro)
await escuro.click()
await page.waitForTimeout(1200)
await blur()
await snap("home-escuro", 1200)
await trigger.click()
await page.waitForTimeout(600)
await snap("tema-menu-escuro", 1200)
const advento = page.getByRole("menuitemcheckbox", { name: /Advento e Quaresma/ })
await point("advento", advento)
await advento.click()
await page.waitForTimeout(1200)
await blur()
await snap("home-advento", 1200)

await writeFile(path.join(root, "src", "shots.json"), JSON.stringify(manifest, null, 2) + "\n")
await browser.close()
console.log("ok")
