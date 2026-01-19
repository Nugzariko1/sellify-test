export interface LogInRequest {
  email: string;
  password: string;
}
export interface LogInResponse {
  accessToken: string;
  refreshToken: string;
  tempToken?: string;
}

export interface SignUpRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  acceptedTerms: boolean;
}

export interface SignUpResponse {
  userId: string;
  email: string;
  firstName: string;
  lastName: string;
  status: string;
  verificationEmailSent: boolean;
  createdAt: string;
}
