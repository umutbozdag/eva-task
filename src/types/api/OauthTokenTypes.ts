export interface OAUTHTokenResponse {
  ApiStatus: boolean;
  ApiStatusCode: string;
  ApiStatusMessage: string;
  Data: OAUTHTokenData;
}

export interface OAUTHTokenData {
  AccessToken: string;
  RefreshToken: string;
  TokenType: string;
  ExpiresAt: string;
}

export interface OAUTHTokenRequestBody {
  Email: string;
  Password: string;
  GrantType: string;
  Scope: string;
  ClientId: string;
  ClientSecret: string;
  RedirectUri: string;
}
