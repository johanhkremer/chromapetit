-- DropForeignKey
ALTER TABLE `PaintOnProject` DROP FOREIGN KEY `PaintOnProject_projectId_fkey`;

-- DropForeignKey
ALTER TABLE `ProjectImage` DROP FOREIGN KEY `ProjectImage_projectId_fkey`;

-- AddForeignKey
ALTER TABLE `PaintOnProject` ADD CONSTRAINT `PaintOnProject_projectId_fkey` FOREIGN KEY (`projectId`) REFERENCES `Project`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProjectImage` ADD CONSTRAINT `ProjectImage_projectId_fkey` FOREIGN KEY (`projectId`) REFERENCES `Project`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
