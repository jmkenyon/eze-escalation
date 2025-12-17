import prisma from '@/app/lib/prisma'
import bcrypt from "bcrypt"


async function main() {
    const password: string = process.env.PASSWORD!;
    const hashedPassword = await bcrypt.hash(password, 12);

  


  const user = await prisma.user.create({
    data: {
      email: 'escalation@ezeescalations.com',
      hashedPassword,
    },
  })
  console.log('Created user:', user)

  // Fetch all users with their posts
  const allUsers = await prisma.user.findMany()
  console.log('All users:', JSON.stringify(allUsers, null, 2))
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })