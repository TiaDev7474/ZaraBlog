import { PrismaClient } from '@prisma/client';
import * as process from 'process';
import * as argon2 from 'argon2';
const prisma = new PrismaClient();
import { v4 as uuidv4 } from 'uuid';
import { blogCategories, blogTags, privileges } from './data';
async function main() {
  const hashedPassword = await argon2.hash('admin-password');
  const demoUserPassword = await argon2.hash('demo-password');
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
      roles: {
        create: [
          {
            role: {
              connectOrCreate: {
                where: {
                  id: 1,
                },
                create: {
                  id: 1,
                  title: 'Admin',
                },
              },
            },
          },
          {
            role: {
              connectOrCreate: {
                where: {
                  id: 2,
                },
                create: {
                  id: 2,
                  title: 'Moderator',
                },
              },
            },
          },
        ],
      },
    },
    include: {
      roles: {
        include: {
          role: true,
        },
      },
    },
  });
  const demoUser = await prisma.user.upsert({
    where: { email: 'demouser@gmail.com' },
    update: {},
    create: {
      id: uuidv4(),
      email: 'demouser@gmail.com',
      firstname: 'Demo',
      lastname: 'User',
      password: demoUserPassword,
      birthdate: new Date().toISOString(),
      roles: {
        create: [
          {
            role: {
              connectOrCreate: {
                where: {
                  id: 3,
                },
                create: {
                  id: 3,
                  title: 'end-user',
                },
              },
            },
          },
        ],
      },
    },
    include: {
      roles: {
        include: {
          role: true,
        },
      },
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
                  designation: 'Technologies',
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
      review: true,
    },
  });
  const category = await prisma.category.createMany({
    data: blogCategories.map((category) => ({
      designation: category.split(' ').join('-').toLowerCase(),
    })),
    skipDuplicates: true,
  });

  const normalizeTags = blogTags.map((tag) =>
    tag.replace(/\s/g, '').toLowerCase(),
  );

  const tags = await prisma.tag.createMany({
    data: normalizeTags.map((tag) => ({ designation: tag })),
    skipDuplicates: true,
  });
  const privilege = await prisma.privilege.createMany({
    data: privileges.map((privilege) => ({ title: privilege })),
    skipDuplicates: true,
  });
  const reviews = await prisma.review.create({
    data: {
      post_id: adminPost.id,
      reviewer_id: demoUser.id,
      weight: 3.5,
    },
    include: {
      reviewer: true,
      post: true,
    },
  });
  console.log(adminUser.roles, category, tags, privilege, reviews);
  console.log(
    '/*================Demo user ===============================*/\n',
    demoUser,
  );
  console.log(
    '/*================ Admin post  ===============================*/\n',
    adminPost,
  );
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
