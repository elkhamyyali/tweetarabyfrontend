export interface PlatformUser {
  password: string;
  last_login: string | null;
  groups: any[];
  user_permissions: any[];
  first_name: string;
  last_name: string;
  email: string;
  date_joined: string;
  name: string;
  username: string;
  user_type: string;
  is_active: boolean;
  is_staff: boolean;
  is_superuser: boolean;
  is_director: boolean;
  pk: number;
  view_on_site: string;
  list_url: string;
  history_url: string;
  delete_url: string;
  change_url: string;
}