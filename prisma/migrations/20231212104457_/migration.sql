/*
  Warnings:

  - Added the required column `review_average` to the `posts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "posts" ADD COLUMN     "review_average" INTEGER NOT NULL;
