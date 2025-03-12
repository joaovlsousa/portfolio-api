import { z } from 'zod'

export const envSchema = z.object({
  PORT: z.coerce.number().optional().default(3333),
  DATABASE_URL: z.string().url(),
  JWT_SECRET: z.string(),

  GITHUB_OAUTH_CLIENT_ID: z.string(),
  GITHUB_OAUTH_CLIENT_SECRET: z.string(),
  GITHUB_OAUTH_CLIENT_REDIRECT_URI: z.string().url(),

  CMS_PUBLIC_URL: z.string().url(),
  PORTFOLIO_PUBLIC_URL: z.string().url(),
  
  CMS_LOCAL_PUBLIC_URL: z.string().url(),
  PORTFOLIO_LOCAL_PUBLIC_URL: z.string().url(),

  GITHUB_USER_ID: z.coerce.number().int(),
  GITHUB_USERNAME: z.string(),

  UPLOADTHING_TOKEN: z.string(),
})

export type Env = z.infer<typeof envSchema>
