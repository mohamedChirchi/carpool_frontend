export class RegisterRequest {
  private firstName: string;
  private lastName: string;
  email: string;
  private password: string;
  private address: string;
  private phoneNumber: string;
  private roles: string[] = [];

  constructor(firstName: string, lastName: string, email: string, password: string, address: string, phoneNumber: string, roles: string[]) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
    this.phoneNumber = phoneNumber;
    this.address = address;
    this.roles = roles;
  }
}
