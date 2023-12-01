import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-github2';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy, 'github') {
  constructor(config: ConfigService) {
    super({
      clientID: config.get<string>('GITHUB_CLIENT_ID'),
      clientSecret: config.get<string>('GITHUB_CLIENT_SECRET'),
      callbackURL: config.get<string>('GITHUB_CALLBACK_URL'),
      scope: ['profile', 'email'],
    });
  }

  async validate(_accestoken: string, _refreshtoken: string, profile: Profile) {
    const { id, emails, photos, name, displayName } = profile;
    const user = {
      providerName: 'github',
      providerId: id,
      email: emails[0].value,
      firstname: name?.givenName ? name.givenName : displayName,
      lastname: `${name?.middleName ?? ''} ${name?.familyName ?? ''}`,
      avatar: photos[0].value,
    };
    return user.email || user.providerId ? user : null;
  }
}
