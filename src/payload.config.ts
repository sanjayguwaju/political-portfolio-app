// storage-adapter-import-placeholder
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { uploadthingStorage } from '@payloadcms/storage-uploadthing'
import { s3Storage } from '@payloadcms/storage-s3'
import { nodemailerAdapter } from '@payloadcms/email-nodemailer'
import { resendAdapter } from '@payloadcms/email-resend'

import sharp from 'sharp' // sharp-import
import path from 'path'
import { buildConfig, PayloadRequest } from 'payload'
import { fileURLToPath } from 'url'

import { Categories } from './collections/Categories'
import { ContactForms } from './collections/ContactForms'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
import { Posts } from './collections/Posts'
import { Users } from './collections/Users'
import { Footer } from './Footer/config'
import { Header } from './Header/config'
import { plugins } from './plugins'
import { defaultLexical } from '@/fields/defaultLexical'
import { getServerSideURL } from './utilities/getURL'
import brevoAdapter from './utilities/brevoAdapter'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    meta: {
      titleSuffix: '- Chanda Chaudhary',
      description: 'Chanda Chaudhary | Political Portfolio',
      icons: [
        {
          rel: 'icon',
          type: 'image/png',
          url: '/favicon.png',
        },
      ],
    },
    components: {
      // The `BeforeLogin` component renders a message that you see while logging into your admin panel.

      beforeLogin: ['@/components/BeforeLogin'],

      graphics: {
        Logo: '@/components/Logo/Logo',
      },

      beforeDashboard: ['@/components/BeforeDashboard'],
      // graphics: {
      //   Icon: '@/components/Logo/Logo',
      //   Logo: '@/components/Logo/Logo',
      // },
      // header: ['@/components/AdminHeader/AdminHeader'],
      views: {
        dashboard: {
          Component: '@/components/Dashboard/Dashboard',
        },
      },
    },
    importMap: {
      baseDir: path.resolve(dirname),
    },
    user: Users.slug,
    livePreview: {
      breakpoints: [
        {
          label: 'Mobile',
          name: 'mobile',
          width: 375,
          height: 667,
        },
        {
          label: 'Tablet',
          name: 'tablet',
          width: 768,
          height: 1024,
        },
        {
          label: 'Desktop',
          name: 'desktop',
          width: 1440,
          height: 900,
        },
      ],
    },
  },
  // This config helps us configure global or default features that the other editors can inherit
  editor: defaultLexical,
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || '',
  }),
  collections: [Pages, Posts, Media, Categories, Users, ContactForms],
  cors: [getServerSideURL()].filter(Boolean),
  globals: [Header, Footer],
  plugins: [
    ...plugins,
    uploadthingStorage({
      collections: {
        media: true,
      },
      options: {
        token: process.env.UPLOADTHING_TOKEN,
        acl: 'public-read',
      },
    }),
    // s3Storage({
    //   collections: {
    //     media: true,
    //   },
    //   bucket: process.env.MINIO_BUCKET || '', // MinIO Bucket name
    //   config: {
    //     credentials: {
    //       accessKeyId: process.env.MINIO_ACCESS_KEY_ID || '', // MinIO Access Key
    //       secretAccessKey: process.env.MINIO_SECRET_ACCESS_KEY || '', // MinIO Secret Key
    //     },
    //     region: process.env.MINIO_REGION || '', // MinIO Region (optional)
    //     endpoint: process.env.MINIO_ENDPOINT || '', // MinIO endpoint URL (e.g., http://localhost:9000)
    //     forcePathStyle: true, // MinIO typically uses path-style addressing
    //   },
    // }),
    // storage-adapter-placeholder
  ],
  secret: process.env.PAYLOAD_SECRET,
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  jobs: {
    access: {
      run: ({ req }: { req: PayloadRequest }): boolean => {
        // Allow logged in users to execute this endpoint (default)
        if (req.user) return true

        // If there is no logged in user, then check
        // for the Vercel Cron secret to be present as an
        // Authorization header:
        const authHeader = req.headers.get('authorization')
        return authHeader === `Bearer ${process.env.CRON_SECRET}`
      },
    },
    tasks: [],
  },
  localization: {
    locales: ['en', 'ne'],
    defaultLocale: 'en',
    fallback: true,
  },
  // email: nodemailerAdapter({
  //   defaultFromAddress: 'noreply@sanjayguwaju.com.np',
  //   defaultFromName: 'Sanjay Guwaju',
  //   transportOptions: {
  //     host: process.env.SMTP_HOST,
  //     port: parseInt(process.env.SMTP_PORT || '587', 10),
  //     secure: false,
  //     auth: {
  //       user: process.env.SMTP_USER,
  //       pass: process.env.SMTP_PASS,
  //     },
  //   },
  // }),
  // email: brevoAdapter(),
  email: resendAdapter({
    defaultFromAddress: 'noreply@sanjayguwaju.com.np',
    defaultFromName: 'Sanjay Guwaju',
    apiKey: process.env.RESEND_API_KEY || '',
  }),
})
