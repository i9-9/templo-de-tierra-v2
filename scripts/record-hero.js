/*
  Records a 20s video of the homepage hero at 1600x1200 using Playwright.
  Usage:
    npm run dev  # in a separate terminal
    npm run record:hero
  Output:
    recordings/hero.webm (convert to MP4 with: npm run record:convert)
*/

const fs = require('fs')
const path = require('path')
const { chromium } = require('playwright')

async function ensureDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true })
  }
}

async function main() {
  const url = process.env.RECORD_URL || 'http://localhost:3000/'
  const totalMs = Number(process.env.RECORD_MS || 20000)
  const width = Number(process.env.RECORD_WIDTH || 1600)
  const height = Number(process.env.RECORD_HEIGHT || 1200)
  const outDir = path.resolve(process.cwd(), 'recordings')
  const outFilename = 'hero.webm'

  await ensureDir(outDir)

  const browser = await chromium.launch({ headless: false })
  const context = await browser.newContext({
    viewport: { width, height },
    recordVideo: { dir: outDir, size: { width, height } },
  })
  const page = await context.newPage()

  // Minimize UI noise
  await page.addStyleTag({ content: '* { cursor: none !important; }' })

  await page.goto(url, { waitUntil: 'networkidle' })

  // Wait a moment so we start right after a fade, reducing cut artifacts
  await page.waitForTimeout(1000)

  // Keep the page focused and avoid accidental scrollbars
  await page.keyboard.press('Escape').catch(() => {})

  await page.waitForTimeout(totalMs)

  const video = await page.video()
  await page.close()
  await context.close()
  await browser.close()

  // The video path is provided by Playwright after closing the page
  const videoPath = await video.path()
  const finalPath = path.join(outDir, outFilename)
  try {
    if (videoPath !== finalPath) {
      fs.copyFileSync(videoPath, finalPath)
    }
    // eslint-disable-next-line no-console
    console.log(`Saved: ${finalPath}`)
    // eslint-disable-next-line no-console
    console.log('Convert to MP4: npm run record:convert')
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error('Failed to finalize video:', e)
  }
}

main().catch((err) => {
  // eslint-disable-next-line no-console
  console.error(err)
  process.exit(1)
})


