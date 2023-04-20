/*
  Warnings:

  - You are about to drop the column `resumeUserId` on the `Jobs` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Resume` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userName]` on the table `Resume` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `resumeUserName` to the `Jobs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userName` to the `Resume` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Jobs` DROP FOREIGN KEY `Jobs_resumeUserId_fkey`;

-- DropForeignKey
ALTER TABLE `Resume` DROP FOREIGN KEY `Resume_userId_fkey`;

-- AlterTable
ALTER TABLE `Jobs` DROP COLUMN `resumeUserId`,
    ADD COLUMN `resumeUserName` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Resume` DROP COLUMN `userId`,
    ADD COLUMN `userName` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Resume_userName_key` ON `Resume`(`userName`);

-- AddForeignKey
ALTER TABLE `Resume` ADD CONSTRAINT `Resume_userName_fkey` FOREIGN KEY (`userName`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Jobs` ADD CONSTRAINT `Jobs_resumeUserName_fkey` FOREIGN KEY (`resumeUserName`) REFERENCES `Resume`(`userName`) ON DELETE RESTRICT ON UPDATE CASCADE;
