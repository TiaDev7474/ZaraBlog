/*
  Warnings:

  - You are about to drop the column `permissionId` on the `Privilege` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[designation]` on the table `Tag` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Privilege" DROP CONSTRAINT "Privilege_permissionId_fkey";

-- AlterTable
ALTER TABLE "Privilege" DROP COLUMN "permissionId";

-- CreateIndex
CREATE UNIQUE INDEX "Tag_designation_key" ON "Tag"("designation");
