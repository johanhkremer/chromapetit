/*
  Warnings:

  - You are about to drop the `Session` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `VerificationToken` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Session` DROP FOREIGN KEY `Session_userId_fkey`;

-- AlterTable
ALTER TABLE `User` ADD COLUMN `password` VARCHAR(191) NULL;

-- DropTable
DROP TABLE `Session`;

-- DropTable
DROP TABLE `VerificationToken`;
