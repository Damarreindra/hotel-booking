export interface IBooking {
  userId: string;
  roomId: string;
  checkIn: Date;
  checkOut: Date;
  guestNumber: number;
}

export interface RoomType {
  id: string;
  room_img: string;
  room_type: string;
}
