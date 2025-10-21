import { ISiteSettings } from "@src/models/site_settings/SiteSettings.model";

export interface IUpdateSiteSettings {
  REQUEST: ISiteSettings;
  RESPONSE: ISiteSettings;
}


export interface IGetSiteSettings {
  REQUEST: any;
  RESPONSE: ISiteSettings;
}
