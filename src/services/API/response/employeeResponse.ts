export interface EmployeeResponse {
  personID: number;
  username: string;
  email: string;
  password?: string;
  firstName: string;
  lastName: string;
  empPoints: number;
  yearsInPratice: number;
  createdDate?: string;
  fK_EmployeeRankID?: number;
  fK_PingPongRankID?: number;
  imageURL?: string;
  isAdmin?: boolean;
  pongVictories: number;
}
