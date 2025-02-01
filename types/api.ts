export interface SiteContext {
  site_title: string
  site_header: string
  available_apps: {
    name: string
    app_label: string
    app_url: string
    has_module_perms: boolean
    models?: {
      name: string
      object_name: string
      perms?: string[]
    }[]
  }[]
}

