import { AppRouter } from "@src/base/AppRouter";

const IconsRouter = new AppRouter();

interface IResponse {
  icons: string[];
}

IconsRouter.GET<{ slug: string }, any>({
  path: "/:slug",
  async onStart(data, callBacks, utils) {},
  async onProccess(data, callBacks, utils) {
    const { slug } = data;

    const res = (await fetch(
      `https://api.iconify.design/search?query=${slug}&limit=999`,
    ).then((res) => res.json())) as IResponse;

    return res.icons;
  },
  async onFinish(request, data, callBacks, utils) {
    return {
      data: data,
      message: "لیست آیکون ها با موفقیت دریافت شد.",
      status: "OK",
    };
  },
});

export default IconsRouter.getRouter();
