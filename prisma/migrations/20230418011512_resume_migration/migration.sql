-- AlterTable
ALTER TABLE `User` ADD COLUMN `PhoneNumber` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE `Resume` (
    `userId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Resume_userId_key`(`userId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Jobs` (
    `id` VARCHAR(191) NOT NULL,
    `resumeUserId` VARCHAR(191) NOT NULL,
    `yearFrom` DATETIME(3) NOT NULL,
    `yearTo` DATETIME(3) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Resume` ADD CONSTRAINT `Resume_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Jobs` ADD CONSTRAINT `Jobs_resumeUserId_fkey` FOREIGN KEY (`resumeUserId`) REFERENCES `Resume`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;
