/*
  Warnings:

  - A unique constraint covering the columns `[orderId]` on the table `Booking` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[orderId]` on the table `Payment` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `orderId` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `orderId` to the `Payment` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Booking_roomId_fkey` ON `booking`;

-- DropIndex
DROP INDEX `Booking_userId_fkey` ON `booking`;

-- DropIndex
DROP INDEX `Payment_bookingId_fkey` ON `payment`;

-- DropIndex
DROP INDEX `Room_roomTypeId_fkey` ON `room`;

-- DropIndex
DROP INDEX `RoomFacility_facilityId_fkey` ON `roomfacility`;

-- AlterTable
ALTER TABLE `booking` ADD COLUMN `orderId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `payment` ADD COLUMN `orderId` INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Booking_orderId_key` ON `Booking`(`orderId`);

-- CreateIndex
CREATE UNIQUE INDEX `Payment_orderId_key` ON `Payment`(`orderId`);

-- AddForeignKey
ALTER TABLE `Room` ADD CONSTRAINT `Room_roomTypeId_fkey` FOREIGN KEY (`roomTypeId`) REFERENCES `RoomType`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Booking` ADD CONSTRAINT `Booking_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Booking` ADD CONSTRAINT `Booking_roomId_fkey` FOREIGN KEY (`roomId`) REFERENCES `Room`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RoomFacility` ADD CONSTRAINT `RoomFacility_roomTypeId_fkey` FOREIGN KEY (`roomTypeId`) REFERENCES `RoomType`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RoomFacility` ADD CONSTRAINT `RoomFacility_facilityId_fkey` FOREIGN KEY (`facilityId`) REFERENCES `Facility`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Payment` ADD CONSTRAINT `Payment_bookingId_fkey` FOREIGN KEY (`bookingId`) REFERENCES `Booking`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
