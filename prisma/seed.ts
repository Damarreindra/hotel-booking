import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // 1. Seed RoomTypes
  const deluxeRoom = await prisma.roomType.create({
    data: {
      roomType: "Deluxe",
      roomImg:
        "https://res.cloudinary.com/dttd52ltg/image/upload/v1741983145/double_kah74c.webp",
    },
  });

  const standardRoom = await prisma.roomType.create({
    data: {
      roomType: "Standard",
      roomImg:
        "https://res.cloudinary.com/dttd52ltg/image/upload/v1741983144/Single-bed-room-YWCA_Hotel_Vancouver_bqvasq.jpg",
    },
  });

  // 2. Seed Rooms
  await prisma.room.createMany({
    data: [
      {
        number: 101,
        roomTypeId: deluxeRoom.id,
        price: 150.0,
        status: "AVAILABLE",
      },
      {
        number: 102,
        roomTypeId: deluxeRoom.id,
        price: 150.0,
        status: "AVAILABLE",
      },
      {
        number: 201,
        roomTypeId: standardRoom.id,
        price: 100.0,
        status: "AVAILABLE",
      },
      {
        number: 202,
        roomTypeId: standardRoom.id,
        price: 100.0,
        status: "MAINTENANCE",
      },
    ],
  });

  console.log("✅ Seeding completed!");
}

main()
  .catch((error) => {
    console.error("❌ Error seeding database:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
