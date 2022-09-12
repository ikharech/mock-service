import { Injectable } from '@nestjs/common';
import CryptoJS from 'crypto-js';

@Injectable()
export class AuthService {
  hashPassword(password: string): string {
    return CryptoJS.SHA256(password).toString();
  }
}
