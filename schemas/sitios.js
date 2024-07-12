import z from 'zod'

const sitioSchema = z.object({

  nombre: z.string().default('sitio arqueo'),
  notas: z.string().default(''),
  lat: z.number().default(0).nullable(),
  lon: z.number().default(0).nullable(),
  wikiURL: z.string().default('').nullable(),
  imgURL: z.string(),
  tituloWiki: z.string(),
  idWiki: z.number(),
  extracto: z.string(),
  icono: z.string()
})

export function validateSitio (input) {
  return sitioSchema.safeParse(input)
}

export function validatePartialSitio (input) {
  return sitioSchema.partial().safeParse(input)
}