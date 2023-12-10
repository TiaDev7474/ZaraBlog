/*
  Warnings:

  - You are about to drop the column `create` on the `Permission` table. All the data in the column will be lost.
  - You are about to drop the column `delete` on the `Permission` table. All the data in the column will be lost.
  - You are about to drop the column `read` on the `Permission` table. All the data in the column will be lost.
  - You are about to drop the column `update` on the `Permission` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Permission" DROP COLUMN "create",
DROP COLUMN "delete",
DROP COLUMN "read",
DROP COLUMN "update";

-- CreateTable
CREATE TABLE "Privilege" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "permissionId" INTEGER,

    CONSTRAINT "Privilege_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PrivilegesOnPermission" (
    "privilege_id" INTEGER NOT NULL,
    "permission_id" INTEGER NOT NULL,

    CONSTRAINT "PrivilegesOnPermission_pkey" PRIMARY KEY ("privilege_id","permission_id")
);

-- AddForeignKey
ALTER TABLE "Privilege" ADD CONSTRAINT "Privilege_permissionId_fkey" FOREIGN KEY ("permissionId") REFERENCES "Permission"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PrivilegesOnPermission" ADD CONSTRAINT "PrivilegesOnPermission_privilege_id_fkey" FOREIGN KEY ("privilege_id") REFERENCES "Privilege"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PrivilegesOnPermission" ADD CONSTRAINT "PrivilegesOnPermission_permission_id_fkey" FOREIGN KEY ("permission_id") REFERENCES "Permission"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
