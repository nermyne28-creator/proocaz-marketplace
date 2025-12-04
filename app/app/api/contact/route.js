import { NextResponse } from 'next/server'
import { z } from 'zod'

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  subject: z.string().min(2),
  message: z.string().min(10),
})

const buckets = new Map()
function limit(request, key, limit = 20, windowMs = 60_000) {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'
  const k = `${ip}:${key}`
  const now = Date.now()
  const e = buckets.get(k) || { c: 0, r: now + windowMs }
  if (now > e.r) { e.c = 0; e.r = now + windowMs }
  e.c += 1
  buckets.set(k, e)
  if (e.c > limit) throw new Error('Rate limit exceeded')
}

export async function POST(request) {
  try {
    limit(request, 'contact:post', 10, 60_000)
    const body = await request.json()
    const parsed = schema.safeParse(body)
    if (!parsed.success) return NextResponse.json({ error: 'Données invalides' }, { status: 400 })
    return NextResponse.json({ ok: true })
  } catch (e) {
    return NextResponse.json({ error: e.message || 'Erreur' }, { status: 429 })
  }
}

