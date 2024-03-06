export interface EmployeeRequest {
  personID?: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  yearsInPratice: number;
  imageURL?: string;
  password?: string;
}
