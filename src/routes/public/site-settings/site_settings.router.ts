import { AppRouter } from "@src/base/AppRouter";
import SiteSettingsModel, {
  ISiteSettings,
} from "@src/models/site_settings/SiteSettings.model";

const SiteSettingsRouter = new AppRouter();

SiteSettingsRouter.GET<any, ISiteSettings>({
  path: "/",
  async onStart(data, callBacks, utils) {},
  async onProccess(data, callBacks, utils) {
    const siteSettings = await SiteSettingsModel.findOne({
      siteName: "derakhshan",
    });

    return siteSettings!!;
  },
  async onFinish(request, data, callBacks, utils) {
    return {
      data: data,
      message: "تنظیمات سایت با موفقیت دریافت شد.",
      status: "OK",
    };
  },
});

export default SiteSettingsRouter.getRouter();
