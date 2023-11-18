/*
  Warnings:

  - A unique constraint covering the columns `[providerId]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `providerId` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `providerName` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "users" ADD COLUMN     "providerId" TEXT NOT NULL,
ADD COLUMN     "providerName" TEXT NOT NULL,
ALTER COLUMN "password" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "users_providerId_key" ON "users"("providerId");
