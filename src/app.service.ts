import { Injectable } from '@nestjs/common';
import jwtDecode, { JwtPayload } from 'jwt-decode';
@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
  getByToken(auth: any): any {
    let cleanToken = auth.replace('Bearer', '').trim();
    const decodedToken: any = jwtDecode<JwtPayload>(cleanToken);
    return decodedToken;
  }
}
