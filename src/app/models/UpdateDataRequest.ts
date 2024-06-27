
export class UpdateDataRequest{
  firstName !:string ;
  lastName!:string;
  address!:string;
  phoneNumber!:string;


  constructor(firstName: string, lastName: string, address: string, phoneNumber: string) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.address = address;
    this.phoneNumber = phoneNumber;
  }
}
