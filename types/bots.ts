export interface Bot {
  bot_ip: string;
  process_id: string;
  is_active: boolean;
  type: string;
  state: string;
  data_state: string;
  in_campaign: boolean;
  prepared_campaign: boolean;
  campaign: string | null;
  minutes_expiry: number | null;
  pk: number;
  detail_url: string;
}
