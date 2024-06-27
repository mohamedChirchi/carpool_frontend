export class VerifyRequest {
  email?:string;
  otp?:string;

  constructor(email:any,otp:any){
    this.email=email;
    this.otp=otp;
  }
}
