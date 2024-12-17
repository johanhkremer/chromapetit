/*
  Warnings:

  - Made the column `blue` on table `Paint` required. This step will fail if there are existing NULL values in that column.
  - Made the column `green` on table `Paint` required. This step will fail if there are existing NULL values in that column.
  - Made the column `red` on table `Paint` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Paint` MODIFY `blue` INTEGER NOT NULL,
    MODIFY `green` INTEGER NOT NULL,
    MODIFY `red` INTEGER NOT NULL;
