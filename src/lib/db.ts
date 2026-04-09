import { Pool } from 'pg'
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '@/generated/prisma/client'

const prismaClientSingleton = () => {
  // 1. Tạo connection pool từ thư viện 'pg'
  // Cấu hình này giúp kiểm soát số lượng kết nối ở mức độ thấp (low-level)
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  })

  // 2. Khởi tạo adapter
  const adapter = new PrismaPg(pool)

  // 3. Truyền adapter vào PrismaClient
  return new PrismaClient({ adapter })
}

declare global {
  var prismaGlobal:
    | undefined
    | ReturnType<typeof prismaClientSingleton>
}

// Singleton logic
const prisma = globalThis.prismaGlobal ?? prismaClientSingleton()

export default prisma

if (process.env.NODE_ENV !== 'production') {
  globalThis.prismaGlobal = prisma
}
