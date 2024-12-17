/*
  Warnings:

  - Made the column `finish` on table `Paint` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Paint` MODIFY `finish` VARCHAR(191) NOT NULL;
