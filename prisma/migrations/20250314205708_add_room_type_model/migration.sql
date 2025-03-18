/*
  Warnings:

  - You are about to drop the column `room_img` on the `roomtype` table. All the data in the column will be lost.
  - You are about to drop the column `room_type` on the `roomtype` table. All the data in the column will be lost.
  - Added the required column `roomImg` to the `RoomType` table without a default value. This is not possible if the table is not empty.
  - Added the required column `roomType` to the `RoomType` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Booking_roomId_fkey` ON `booking`;

-- DropIndex
DROP INDEX `Booking_userId_fkey` ON `booking`;

-- DropIndex
DROP INDEX `Room_roomTypeId_fkey` ON `room`;

-- AlterTable
ALTER TABLE `roomtype` DROP COLUMN `room_img`,
    DROP COLUMN `room_type`,
    ADD COLUMN `roomImg` VARCHAR(191) NOT NULL,
    ADD COLUMN `roomType` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Room` ADD CONSTRAINT `Room_roomTypeId_fkey` FOREIGN KEY (`roomTypeId`) REFERENCES `RoomType`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Booking` ADD CONSTRAINT `Booking_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Booking` ADD CONSTRAINT `Booking_roomId_fkey` FOREIGN KEY (`roomId`) REFERENCES `Room`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
