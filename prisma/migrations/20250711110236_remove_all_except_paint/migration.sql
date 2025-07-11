/*
  Warnings:

  - You are about to drop the column `finish` on the `Paint` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Paint` table. All the data in the column will be lost.
  - You are about to drop the `Account` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Authenticator` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PaintOnProject` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Project` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ProjectImage` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserPaint` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `WishlistPaint` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[name,brand]` on the table `Paint` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `category` to the `Paint` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Account" DROP CONSTRAINT "Account_userId_fkey";

-- DropForeignKey
ALTER TABLE "Authenticator" DROP CONSTRAINT "Authenticator_userId_fkey";

-- DropForeignKey
ALTER TABLE "PaintOnProject" DROP CONSTRAINT "PaintOnProject_paintId_fkey";

-- DropForeignKey
ALTER TABLE "PaintOnProject" DROP CONSTRAINT "PaintOnProject_projectId_fkey";

-- DropForeignKey
ALTER TABLE "Project" DROP CONSTRAINT "Project_userId_fkey";

-- DropForeignKey
ALTER TABLE "ProjectImage" DROP CONSTRAINT "ProjectImage_projectId_fkey";

-- DropForeignKey
ALTER TABLE "UserPaint" DROP CONSTRAINT "UserPaint_paintId_fkey";

-- DropForeignKey
ALTER TABLE "UserPaint" DROP CONSTRAINT "UserPaint_userId_fkey";

-- DropForeignKey
ALTER TABLE "WishlistPaint" DROP CONSTRAINT "WishlistPaint_paintId_fkey";

-- DropForeignKey
ALTER TABLE "WishlistPaint" DROP CONSTRAINT "WishlistPaint_userId_fkey";

-- AlterTable
ALTER TABLE "Paint" DROP COLUMN "finish",
DROP COLUMN "type",
ADD COLUMN     "category" TEXT NOT NULL,
ADD COLUMN     "opacity" DOUBLE PRECISION,
ADD COLUMN     "tags" TEXT[];

-- DropTable
DROP TABLE "Account";

-- DropTable
DROP TABLE "Authenticator";

-- DropTable
DROP TABLE "PaintOnProject";

-- DropTable
DROP TABLE "Project";

-- DropTable
DROP TABLE "ProjectImage";

-- DropTable
DROP TABLE "User";

-- DropTable
DROP TABLE "UserPaint";

-- DropTable
DROP TABLE "WishlistPaint";

-- CreateIndex
CREATE INDEX "Paint_name_idx" ON "Paint"("name");

-- CreateIndex
CREATE INDEX "Paint_brand_idx" ON "Paint"("brand");

-- CreateIndex
CREATE UNIQUE INDEX "Paint_name_brand_key" ON "Paint"("name", "brand");
