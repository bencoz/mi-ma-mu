import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { User, UserDocument } from '../users/user.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async validateUser(email: string, sub?: string): Promise<UserDocument | null> {
    const user = await this.userModel.findOne({ email });
    if (!user) {
      return null;
    }
    // For JWT validation, we only need to check if user exists
    // Password validation is handled during login
    return user;
  }

  async login(user: UserDocument) {
    const payload = { email: user.email, sub: user._id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(email: string, password: string): Promise<UserDocument> {
    const existingUser = await this.userModel.findOne({ email });
    if (existingUser) {
      throw new UnauthorizedException('Email already exists');
    }
    const createdUser = new this.userModel({ email, password });
    return createdUser.save();
  }
}
