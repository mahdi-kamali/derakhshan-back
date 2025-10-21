import { AppRouter } from "@src/base/AppRouter";
import { IGetSiteSettings, IUpdateSiteSettings } from "./site_settings.types";
import SiteSettingsModel, {
  ISiteSettings,
} from "@src/models/site_settings/SiteSettings.model";

const SiteSettingsRouter = new AppRouter();

const CreateInitialSetting = async () => {
  const siteSettings: ISiteSettings = {
    siteName: "derakhshan",
    EN: {
      socials: [
        { label: "Telegram", icon: "telegram", url: "#" },
        { label: "Instagram", icon: "instagram", url: "#" },
        { label: "LinkedIn", icon: "linkedin", url: "#" },
        { label: "Twitter", icon: "twitter", url: "#" },
      ],
      links: [
        { label: "Home", icon: "home", href: "/en/home" },
        { label: "About Us", icon: "info", href: "/en/about" },
        { label: "Services", icon: "services", href: "/en/services" },
        { label: "Contact Us", icon: "contact", href: "/en/contact" },
        { label: "FAQ", icon: "faq", href: "/en/faq" },
        { label: "Terms of Use", icon: "terms", href: "/en/terms" },
        { label: "Support Center", icon: "support", href: "/en/support" },
      ],
      phone: "+98 ...",
      email: "info@derakhshan.com",
      address: "Tehran, Iran",
      work_time: "Saturday - Thursday",
    },
    FA: {
      socials: [
        { label: "تلگرام", icon: "telegram", url: "#" },
        { label: "اینستاگرام", icon: "instagram", url: "#" },
        { label: "لینکدین", icon: "linkedin", url: "#" },
        { label: "توییتر", icon: "twitter", url: "#" },
      ],
      links: [
        { label: "خانه", icon: "home", href: "/fa/home" },
        { label: "درباره ما", icon: "info", href: "/fa/about" },
        { label: "خدمات", icon: "services", href: "/fa/services" },
        { label: "تماس با ما", icon: "contact", href: "/fa/contact" },
        { label: "سؤالات متداول", icon: "faq", href: "/fa/faq" },
        { label: "شرایط استفاده", icon: "terms", href: "/fa/terms" },
        { label: "مرکز پشتیبانی", icon: "support", href: "/fa/support" },
      ],
      phone: "+98 ...",
      email: "info@derakhshan.com",
      address: "تهران، ایران",
      work_time: "شنبه تا پنج‌شنبه",
    },
  };

  const newSettings = new SiteSettingsModel(siteSettings);

  return await newSettings.save();
};

SiteSettingsRouter.GET<
  IGetSiteSettings["REQUEST"],
  IGetSiteSettings["RESPONSE"]
>({
  path: "/",
  async onStart(data, callBacks, utils) {},
  async onProccess(data, callBacks, utils) {
    const siteSetting = await SiteSettingsModel.findOne({
      siteName: "derakhshan",
    });

    if (siteSetting === null) {
      return await CreateInitialSetting();
    }
    return siteSetting!!;
  },
  async onFinish(request, data, callBacks, utils) {
    return {
      data,
      message: "",
      status: "OK",
    };
  },
});

SiteSettingsRouter.PUT<
  IUpdateSiteSettings["REQUEST"],
  IUpdateSiteSettings["RESPONSE"]
>({
  path: "/",
  async onStart(data, callBacks, utils) {},
  async onProccess(data, callBacks, utils) {
    const siteSetting = await SiteSettingsModel.findOne({
      siteName: "derakhshan",
    });

    if (siteSetting === null) {
      await CreateInitialSetting();
    }

    const updatedSettings = await SiteSettingsModel.findOneAndUpdate(
      {
        siteName: "derakhshan",
      },
      data,
      { new: true },
    );

    return await updatedSettings!!;
  },
  async onFinish(request, data, callBacks, utils) {
    return {
      data,
      message: "تنظیمات سایت با موفقیت ویرایش شد.",
      status: "OK",
    };
  },
});

export default SiteSettingsRouter.getRouter();
