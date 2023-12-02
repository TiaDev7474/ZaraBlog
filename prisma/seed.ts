import { PrismaClient } from '@prisma/client';
import * as process from 'process';
import * as argon2 from 'argon2';
const prisma = new PrismaClient();
import { v4 as uuidv4 } from 'uuid';
async function main() {
  const hashedPassword = await argon2.hash('admin-password');
  const adminUser = await prisma.user.upsert({
    where: { email: 'untitledteam.pro@gmail.com' },
    update: {},
    create: {
      id: uuidv4(),
      email: 'untitledteam.pro@gmail.com',
      firstname: 'Riry',
      lastname: 'Nomenjanahary',
      password: hashedPassword,
      birthdate: new Date().toISOString(),
      role: 'ADMIN',
    },
  });
  const adminPostId = uuidv4();
  const adminPost = await prisma.post.create({
    data: {
      id: adminPostId,
      title: 'GraphQL Basics',
      content: 'Understanding the fundamentals of GraphQL...',
      read_time: 10,
      cover_photo: '',
      category: {
        create: [
          {
            category: {
              connectOrCreate: {
                where: { id: 1 },
                create: {
                  id: 1,
                  name: 'Technologies',
                },
              },
            },
          },
        ],
      },
      tag: {
        create: [
          {
            tag: {
              connectOrCreate: {
                where: { id: 1 },
                create: {
                  id: 1,
                  designation: 'graphql',
                },
              },
            },
          },
          {
            tag: {
              connectOrCreate: {
                where: { id: 2 },
                create: {
                  id: 2,
                  designation: 'api',
                },
              },
            },
          },
        ],
      },
      author: {
        connect: {
          id: adminUser.id,
        },
      },
      reaction: {
        create: [
          {
            reaction: {
              create: {
                id: 1,
                type: 'love',
              },
            },
            user: {
              connect: {
                id: adminUser.id, // Connect the user who reacted to the post
              },
            },
          },
        ],
      },
    },
    include: {
      tag: true,
      category: {
        include: {
          category: true,
        },
      },
      reaction: {
        include: {
          reaction: true,
          user: {
            select: {
              email: true,
            },
          },
        },
      },
    },
  });

  console.log(adminUser, adminPost.reaction);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);

    await prisma.$disconnect();
    process.exit(1);
  });
