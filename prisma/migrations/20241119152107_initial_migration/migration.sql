-- CreateTable
CREATE TABLE `Paint` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `brand` VARCHAR(191) NOT NULL,
    `color` VARCHAR(191) NOT NULL,
    `hexCode` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `discontinued` BOOLEAN NOT NULL DEFAULT false,
    `finish` VARCHAR(191) NULL,
    `description` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
