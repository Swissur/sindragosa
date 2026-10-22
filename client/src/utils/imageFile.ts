/** Côté le plus long d'une image importée : assez pour une carte, léger pour la base. */
const MAX_SIDE = 1600

/** Plus grand côté ramené à `max`, proportions gardées ; jamais agrandi. */
export function fitWithin(width: number, height: number, max = MAX_SIDE): { width: number; height: number } {
  const scale = Math.min(1, max / Math.max(width, height))
  return { width: Math.round(width * scale), height: Math.round(height * scale) }
}

/**
 * Une photo de téléphone pèse souvent plus que la limite de l'API (5 Mo en
 * JSON) : on la redessine en JPEG réduit avant l'envoi. Rend le base64 sans
 * le préfixe `data:`.
 */
export async function imageFileToJpeg(file: File): Promise<{ data: string; mimeType: string }> {
  const bitmap = await createImageBitmap(file)
  const { width, height } = fitWithin(bitmap.width, bitmap.height)
  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  canvas.getContext('2d')!.drawImage(bitmap, 0, 0, width, height)
  bitmap.close()
  const dataUrl = canvas.toDataURL('image/jpeg', 0.85)
  return { data: dataUrl.slice(dataUrl.indexOf(',') + 1), mimeType: 'image/jpeg' }
}
