export interface Cookies {
  att: string;
  ct0: string;
  kdt: string;
  auth_token: string;
  _twitter_sess: string;
}

export interface BurnerAccount {
  username: string;
  password: string;
  email: string;
  email_password: string;
  auth_token: string;
  ct0: string;
  twitter_id: string;
  twitter_str_id: string;
  phone_number: string | null;
  otp_secret_key: string;
  otp_recovery_key: string | null;
  cookies: Cookies;
  birthdate_day: number;
  birthdate_month: number;
  birthdate_year: number;
  birthdate_visibility: string;
  birthdate_year_visibility: string;
  name: string;
  description: string;
  location: string;
  followers: number;
  following: number;
  statuses_count: number;
  fast_followers_count: number;
  normal_followers_count: number;
  has_graduated_access: boolean;
  want_retweets: boolean;
  created_at: string;
  is_blue_verified: boolean;
  blocked_by: boolean;
  possibly_sensitive: boolean;
  withheld_in_countries: string;
  needs_phone_verification: boolean;
  in_group: boolean;
  group: any; // Adjust this type if you expect a specific structure instead of `any`
  campaign_state: string;
  is_active: boolean;
  working_in_campaign: boolean;
  state: string;
  account_type: string;
  category: string;
  data_state: any; // Adjust this type if needed
  login_with: any; // Adjust this type if needed
  pk: number;
  detail_url: string;
}
