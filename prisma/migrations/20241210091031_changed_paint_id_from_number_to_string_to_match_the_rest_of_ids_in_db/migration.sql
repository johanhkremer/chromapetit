/*
  Warnings:

  - The primary key for the `Paint` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Made the column `updatedAt` on table `Paint` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updatedAt` on table `Project` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updatedAt` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `PaintOnProject` DROP FOREIGN KEY `PaintOnProject_paintId_fkey`;

-- DropForeignKey
ALTER TABLE `UserPaint` DROP FOREIGN KEY `UserPaint_paintId_fkey`;

-- DropForeignKey
ALTER TABLE `WishlistPaint` DROP FOREIGN KEY `WishlistPaint_paintId_fkey`;

-- AlterTable
ALTER TABLE `Paint` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    MODIFY `updatedAt` DATETIME(3) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `PaintOnProject` MODIFY `paintId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Project` MODIFY `updatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `User` MODIFY `updatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `UserPaint` MODIFY `paintId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `WishlistPaint` MODIFY `paintId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `PaintOnProject` ADD CONSTRAINT `PaintOnProject_paintId_fkey` FOREIGN KEY (`paintId`) REFERENCES `Paint`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserPaint` ADD CONSTRAINT `UserPaint_paintId_fkey` FOREIGN KEY (`paintId`) REFERENCES `Paint`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `WishlistPaint` ADD CONSTRAINT `WishlistPaint_paintId_fkey` FOREIGN KEY (`paintId`) REFERENCES `Paint`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
