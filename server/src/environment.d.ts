declare global {
  namespace NodeJS {
    interface ProcessEnv {
      MONGODB_URI: string
      NODE_ENV: 'development' | 'production'
      PORT: string
      TOKEN_SECRET: string
    }
  }
}

export {}
