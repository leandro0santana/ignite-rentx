interface ICreateRentalDTO {
  car_id: string;
  user_id: string;
  expected_return_date: Date;
  id?: string;
  end_date?: Date;
  updated_at?: Date;
  total?: number;
}

export { ICreateRentalDTO };
