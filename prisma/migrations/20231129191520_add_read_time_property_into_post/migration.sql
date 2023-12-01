/*
  Warnings:

  - The primary key for the `CategoriesOnPosts` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `ReactionsOnPosts` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `TagsOnPosts` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `posts` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `published` on the `posts` table. All the data in the column will be lost.
  - Added the required column `read_time` to the `posts` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "CategoriesOnPosts" DROP CONSTRAINT "CategoriesOnPosts_postId_fkey";

-- DropForeignKey
ALTER TABLE "ReactionsOnPosts" DROP CONSTRAINT "ReactionsOnPosts_postId_fkey";

-- DropForeignKey
ALTER TABLE "TagsOnPosts" DROP CONSTRAINT "TagsOnPosts_postId_fkey";

-- AlterTable
ALTER TABLE "CategoriesOnPosts" DROP CONSTRAINT "CategoriesOnPosts_pkey",
ALTER COLUMN "postId" SET DATA TYPE TEXT,
ADD CONSTRAINT "CategoriesOnPosts_pkey" PRIMARY KEY ("postId", "categoryId");

-- AlterTable
ALTER TABLE "ReactionsOnPosts" DROP CONSTRAINT "ReactionsOnPosts_pkey",
ALTER COLUMN "postId" SET DATA TYPE TEXT,
ADD CONSTRAINT "ReactionsOnPosts_pkey" PRIMARY KEY ("postId", "reactionId");

-- AlterTable
ALTER TABLE "TagsOnPosts" DROP CONSTRAINT "TagsOnPosts_pkey",
ALTER COLUMN "postId" SET DATA TYPE TEXT,
ADD CONSTRAINT "TagsOnPosts_pkey" PRIMARY KEY ("postId", "tagId");

-- AlterTable
ALTER TABLE "posts" DROP CONSTRAINT "posts_pkey",
DROP COLUMN "published",
ADD COLUMN     "read_time" INTEGER NOT NULL,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "posts_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "ReactionsOnPosts" ADD CONSTRAINT "ReactionsOnPosts_postId_fkey" FOREIGN KEY ("postId") REFERENCES "posts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TagsOnPosts" ADD CONSTRAINT "TagsOnPosts_postId_fkey" FOREIGN KEY ("postId") REFERENCES "posts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CategoriesOnPosts" ADD CONSTRAINT "CategoriesOnPosts_postId_fkey" FOREIGN KEY ("postId") REFERENCES "posts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
