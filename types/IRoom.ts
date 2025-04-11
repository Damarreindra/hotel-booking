export interface IRoom {
  id: number;
  number: number;
  roomType: {
    id: number;
    roomType: string;
    roomImg: string;
    capacity: number;
    facilities: {
      id: number;
      name: string;
    }[];
  };
  roomTypeId: number;
  price: number;
  status: any;
}
