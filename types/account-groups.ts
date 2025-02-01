export interface AccountGroup {
  name: string
  in_campaign: boolean
  campaign: number
  group_main_type: string
  group_sub_type: string
  group_add: boolean
  pk: number
}

export interface AccountGroupsResponse {
  results: AccountGroup[]
}

