export interface GetAuthorizationCodeResponse {
    access_token: string;
    token_type: string;
    expires_in: 21600;
    scope: 'offline_access read write';
    user_id: string;
    refresh_token: string;
}
