/*
  Warnings:

  - You are about to drop the column `userId` on the `comment` table. All the data in the column will be lost.
  - Added the required column `userEmail` to the `Comment` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Comment` DROP FOREIGN KEY `Comment_userId_fkey`;

-- AlterTable
ALTER TABLE `Comment` DROP COLUMN `userId`,
    ADD COLUMN `userEmail` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Comment` ADD CONSTRAINT `Comment_userEmail_fkey` FOREIGN KEY (`userEmail`) REFERENCES `User`(`email`) ON DELETE CASCADE ON UPDATE CASCADE;
