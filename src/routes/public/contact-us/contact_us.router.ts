import { AppRouter } from "@src/base/AppRouter";
import { ICreateContactUs } from "./contact_us.types";
import ContactUsModel from "@src/models/contact-us/ContactUs.model";

const ContactUsRouter = new AppRouter();

ContactUsRouter.POST<ICreateContactUs["REQUEST"], ICreateContactUs["RESPONSE"]>(
  {
    path: "/",
    async onStart(data, callBacks, utils) {},
    async onProccess(data, callBacks, utils) {
      const contactUs = new ContactUsModel(data);
      return await contactUs.save();
    },
    async onFinish(request, data, callBacks, utils) {
      return {
        data: data,
        message: "ممنون از پیام شما , در اسرع وقت پاسخگویی خواهد شد.",
        status: "CREATED",
      };
    },
  },
);

export default ContactUsRouter.getRouter();
