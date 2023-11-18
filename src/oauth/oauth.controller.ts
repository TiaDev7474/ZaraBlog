import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { OauthService } from './oauth.service';
import { SkipAuth } from '../lib/decorator/auth.decorator';

@Controller('api/oauth')
export class OauthController {
  constructor(private oauthService: OauthService) {}

  @SkipAuth()
  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleOauth() {}

  @SkipAuth()
  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthCallback(@Req() req) {
    return this.oauthService.signIn(req.user);
  }

  @SkipAuth()
  @Get('github')
  @UseGuards(AuthGuard('github'))
  async githubOauth() {}

  @SkipAuth()
  @Get('github/callback')
  @UseGuards(AuthGuard('github'))
  async githubAuthCallback(@Req() req) {
    return this.oauthService.signIn(req.user);
  }
}
