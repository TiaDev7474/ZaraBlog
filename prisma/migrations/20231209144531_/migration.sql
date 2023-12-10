/*
  Warnings:

  - The primary key for the `CategoriesOnPosts` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `categoryId` on the `CategoriesOnPosts` table. All the data in the column will be lost.
  - You are about to drop the column `postId` on the `CategoriesOnPosts` table. All the data in the column will be lost.
  - The primary key for the `ReactionsOnPosts` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `postId` on the `ReactionsOnPosts` table. All the data in the column will be lost.
  - You are about to drop the column `reactionId` on the `ReactionsOnPosts` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `ReactionsOnPosts` table. All the data in the column will be lost.
  - You are about to drop the column `authorId` on the `posts` table. All the data in the column will be lost.
  - You are about to drop the column `createdAT` on the `roles` table. All the data in the column will be lost.
  - You are about to drop the column `providerId` on the `users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[provider_id]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `category_id` to the `CategoriesOnPosts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `post_id` to the `CategoriesOnPosts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `post_id` to the `ReactionsOnPosts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `reaction_id` to the `ReactionsOnPosts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `ReactionsOnPosts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `author_id` to the `posts` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "CategoriesOnPosts" DROP CONSTRAINT "CategoriesOnPosts_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "CategoriesOnPosts" DROP CONSTRAINT "CategoriesOnPosts_postId_fkey";

-- DropForeignKey
ALTER TABLE "ReactionsOnPosts" DROP CONSTRAINT "ReactionsOnPosts_postId_fkey";

-- DropForeignKey
ALTER TABLE "ReactionsOnPosts" DROP CONSTRAINT "ReactionsOnPosts_reactionId_fkey";

-- DropForeignKey
ALTER TABLE "ReactionsOnPosts" DROP CONSTRAINT "ReactionsOnPosts_userId_fkey";

-- DropForeignKey
ALTER TABLE "posts" DROP CONSTRAINT "posts_authorId_fkey";

-- DropIndex
DROP INDEX "users_providerId_key";

-- AlterTable
ALTER TABLE "CategoriesOnPosts" DROP CONSTRAINT "CategoriesOnPosts_pkey",
DROP COLUMN "categoryId",
DROP COLUMN "postId",
ADD COLUMN     "category_id" INTEGER NOT NULL,
ADD COLUMN     "post_id" TEXT NOT NULL,
ADD CONSTRAINT "CategoriesOnPosts_pkey" PRIMARY KEY ("post_id", "category_id");

-- AlterTable
ALTER TABLE "ReactionsOnPosts" DROP CONSTRAINT "ReactionsOnPosts_pkey",
DROP COLUMN "postId",
DROP COLUMN "reactionId",
DROP COLUMN "userId",
ADD COLUMN     "post_id" TEXT NOT NULL,
ADD COLUMN     "reaction_id" INTEGER NOT NULL,
ADD COLUMN     "user_id" TEXT NOT NULL,
ADD CONSTRAINT "ReactionsOnPosts_pkey" PRIMARY KEY ("post_id", "reaction_id", "user_id");

-- AlterTable
ALTER TABLE "posts" DROP COLUMN "authorId",
ADD COLUMN     "author_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "roles" DROP COLUMN "createdAT",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "providerId",
ADD COLUMN     "provider_id" TEXT;

-- CreateTable
CREATE TABLE "Review" (
    "id" SERIAL NOT NULL,
    "weight" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "post_id" TEXT NOT NULL,
    "reviewer_id" TEXT NOT NULL,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_provider_id_key" ON "users"("provider_id");

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "posts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_reviewer_id_fkey" FOREIGN KEY ("reviewer_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "posts" ADD CONSTRAINT "posts_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReactionsOnPosts" ADD CONSTRAINT "ReactionsOnPosts_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "posts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReactionsOnPosts" ADD CONSTRAINT "ReactionsOnPosts_reaction_id_fkey" FOREIGN KEY ("reaction_id") REFERENCES "Reaction"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReactionsOnPosts" ADD CONSTRAINT "ReactionsOnPosts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CategoriesOnPosts" ADD CONSTRAINT "CategoriesOnPosts_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CategoriesOnPosts" ADD CONSTRAINT "CategoriesOnPosts_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "posts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
