/*
  Warnings:

  - You are about to drop the column `ownerId` on the `Reaction` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Reaction" DROP CONSTRAINT "Reaction_ownerId_fkey";

-- AlterTable
ALTER TABLE "Reaction" DROP COLUMN "ownerId";

-- CreateTable
CREATE TABLE "ReactionOnUsers" (
    "reactionId" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "ReactionOnUsers_pkey" PRIMARY KEY ("userId","reactionId")
);

-- AddForeignKey
ALTER TABLE "ReactionOnUsers" ADD CONSTRAINT "ReactionOnUsers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReactionOnUsers" ADD CONSTRAINT "ReactionOnUsers_reactionId_fkey" FOREIGN KEY ("reactionId") REFERENCES "Reaction"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
