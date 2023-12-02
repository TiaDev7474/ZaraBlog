/*
  Warnings:

  - The primary key for the `ReactionsOnPosts` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the `ReactionOnUsers` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `userId` to the `ReactionsOnPosts` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ReactionOnUsers" DROP CONSTRAINT "ReactionOnUsers_reactionId_fkey";

-- DropForeignKey
ALTER TABLE "ReactionOnUsers" DROP CONSTRAINT "ReactionOnUsers_userId_fkey";

-- AlterTable
ALTER TABLE "ReactionsOnPosts" DROP CONSTRAINT "ReactionsOnPosts_pkey",
ADD COLUMN     "userId" TEXT NOT NULL,
ADD CONSTRAINT "ReactionsOnPosts_pkey" PRIMARY KEY ("postId", "reactionId", "userId");

-- DropTable
DROP TABLE "ReactionOnUsers";

-- AddForeignKey
ALTER TABLE "ReactionsOnPosts" ADD CONSTRAINT "ReactionsOnPosts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
