import { AppRouter } from "@src/base/AppRouter";
import ContactUsModel from "@src/models/contact-us/ContactUs.model";
import { IGetContactUs, IPutContactUs } from "./contact_us.types";

const ContactUsRouter = new AppRouter();

ContactUsRouter.GET<IGetContactUs["REQUEST"], IGetContactUs["RESPONSE"]>({
  path: "/",
  async onStart(data, callBacks, utils) {},
  async onProccess(data, callBacks, utils) {
    const list = await ContactUsModel.find();
    return await list;
  },
  async onFinish(request, data, callBacks, utils) {
    return {
      data: data,
      message: "لیست درباره ما دریافت شد.",
      status: "CREATED",
    };
  },
});

ContactUsRouter.PUT<IPutContactUs["REQUEST"], IPutContactUs["RESPONSE"]>({
  path: "/:_id",
  async onStart(data, { onError }, utils) {
    const contactUs = await ContactUsModel.findById(data._id);
    if (contactUs === null) {
      onError({
        data: "تماس با ما پیدا نشد",
        status: "NOT_FOUND",
      });
    }
  },
  async onProccess(data, callBacks, utils) {
    const contactUs = await ContactUsModel.findByIdAndUpdate(data._id, data, {
      new: true,
    });

    return contactUs!;
  },
  async onFinish(request, data, callBacks, utils) {
    return {
      data: data,
      message: " تماس ما ویرایش  شد.",
      status: "CREATED",
    };
  },
});

export default ContactUsRouter.getRouter();
