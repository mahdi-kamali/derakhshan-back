import mongoose from "mongoose";
import PageModel from "../page/Page.model";
import { IFile } from "../file/File.model";
import CareerModel, { ICareer } from "../career/Career.model";

export interface ISectionCU {
  type: string;
  isActive: boolean;
  name: string;
  page: string;
  components: any;
}

// 1) Sections from the homepage
export type SECTIONS_TYPES = {
  UNSET: {
    type: "UNSET";
    components: any;
  };

  HOME_HERO: {
    type: "HOME_HERO";
    components: {
      EN: {
        logo: IFile; // <img> src
        tagline: string; // "YOUR WISH IS OUR COMMAND"
        experience: string; // "With more than 80 years..."
      };
      FA: {
        logo: IFile;
        tagline: string;
        experience: string;
      };
    };
  };

  HOME_LEADERSHIP: {
    type: "HOME_LEADERSHIP";
    components: {
      EN: {
        founder: string;
        deputyCEO: string;
        ceo: string;
      };
      FA: {
        founder: string;
        deputyCEO: string;
        ceo: string;
      };
    };
  };

  HOME_ABOUT_US: {
    type: "HOME_ABOUT_US";
    components: {
      EN: {
        title: string; // "About Us"
        description: string; // whole paragraph text
        agents: {
          name: string;
          role: string;
          image: IFile;
        }[];
      };
      FA: {
        title: string; // "About Us"
        description: string; // whole paragraph text
        agents: {
          name: string;
          role: string;
          image: IFile;
        }[];
      };
    };
  };

  HOME_ADVANCED_PACKAGING: {
    type: "HOME_ADVANCED_PACKAGING";
    components: {
      EN: {
        title: string; // "Advanced Packaging Solutions"
        description: string; // the text block under it
        image: IFile;
      };
      FA: {
        title: string;
        description: string;
        image: IFile;
      };
    };
  };

  HOME_EXCLUSIVE_GIFT_BOXES: {
    type: "HOME_EXCLUSIVE_GIFT_BOXES";
    components: {
      EN: {
        title: string; // "Exclusive Gift Boxes"
        description: string; // text under this section
        images: IFile[];
      };
      FA: {
        title: string;
        description: string;
        images: IFile[];
      };
    };
  };

  HOME_CONTACT_FOOTER: {
    type: "HOME_CONTACT_FOOTER";
    components: {
      EN: {
        phone: string;
        email: string;
        address: string;
        workingHours: string;
        quickLinks: string[]; // Home, About Us, Services, Contact
        supportLinks: string[]; // FAQ, Terms of Use, Support Center
        socialLinks: string[]; // Telegram, Instagram, LinkedIn, Twitter
      };
      FA: {
        phone: string;
        email: string;
        address: string;
        workingHours: string;
        quickLinks: string[];
        supportLinks: string[];
        socialLinks: string[];
      };
    };
  };

  ABOUT_US_MAIN: {
    type: "ABOUT_US_MAIN";
    components: {
      EN: {
        background: IFile; // <img> src
        agents: {
          name: string;
          role: string;
          image: IFile;
        }[];
        generations: {
          title: string;
          description: string;
          image: IFile;
        }[];
      };
      FA: {
        background: IFile;
        agents: {
          name: string;
          role: string;
          image: IFile;
        }[];
        generations: {
          title: string;
          description: string;
          image: IFile;
        }[];
      };
    };
  };

  CAREERS_HERO: {
    type: "CAREERS_HERO";
    components: {
      EN: {
        background: IFile;
        title: {
          marked: string;
          text: string;
        };
        description: string;
      };
      FA: {
        background: IFile;
        title: {
          marked: string;
          text: string;
        };
        description: string;
      };
    };
  };

  CAREERS_JOBS: {
    type: "CAREERS_JOBS";
    components: {
      EN: {
        jobs: ICareer[];
      };
      FA: {
        jobs: ICareer[];
      };
    };
  };
};

export const SECTIONS_TYPES_EXAMPLES: SECTIONS_TYPES = {
  UNSET: {
    type: "UNSET",
    components: null,
  },

  HOME_HERO: {
    type: "HOME_HERO",
    components: {
      EN: {
        logo: undefined as any,
        tagline: "YOUR WISH IS OUR COMMAND",
        experience: "With more than 80 years of experience...",
      },
      FA: {
        logo: undefined as any,
        tagline: "آرزوهای شما، فرمان ماست",
        experience: "با بیش از ۸۰ سال تجربه...",
      },
    },
  },

  HOME_LEADERSHIP: {
    type: "HOME_LEADERSHIP",
    components: {
      EN: { founder: "Founder EN", deputyCEO: "Deputy CEO EN", ceo: "CEO EN" },
      FA: { founder: "موسس", deputyCEO: "معاون مدیرعامل", ceo: "مدیرعامل" },
    },
  },

  HOME_ABOUT_US: {
    type: "HOME_ABOUT_US",
    components: {
      EN: {
        title: "About Us",
        description:
          "This is a placeholder description for About Us section in English.",
        agents: [
          { name: "Agent EN", role: "Role EN", image: undefined as any },
          { name: "Agent EN", role: "Role EN", image: undefined as any },
          { name: "Agent EN", role: "Role EN", image: undefined as any },
        ],
      },
      FA: {
        title: "درباره ما",
        description: "این یک متن نمونه برای بخش درباره ما به زبان فارسی است.",
        agents: [
          { name: "نماینده FA", role: "نقش FA", image: undefined as any },
          { name: "نماینده FA", role: "نقش FA", image: undefined as any },
          { name: "نماینده FA", role: "نقش FA", image: undefined as any },
        ],
      },
    },
  },

  HOME_ADVANCED_PACKAGING: {
    type: "HOME_ADVANCED_PACKAGING",
    components: {
      EN: {
        title: "Advanced Packaging Solutions",
        description: "Placeholder description for advanced packaging EN.",
        image: undefined as any,
      },
      FA: {
        title: "راه‌حل‌های بسته‌بندی پیشرفته",
        description: "متن نمونه برای بسته‌بندی پیشرفته به فارسی.",
        image: undefined as any,
      },
    },
  },

  HOME_EXCLUSIVE_GIFT_BOXES: {
    type: "HOME_EXCLUSIVE_GIFT_BOXES",
    components: {
      EN: {
        title: "Exclusive Gift Boxes",
        description: "Placeholder description for exclusive gift boxes EN.",
        images: [undefined as any, undefined as any, undefined as any],
      },
      FA: {
        title: "جعبه‌های هدیه انحصاری",
        description: "متن نمونه برای جعبه‌های هدیه انحصاری به فارسی.",
        images: [undefined as any, undefined as any, undefined as any],
      },
    },
  },

  HOME_CONTACT_FOOTER: {
    type: "HOME_CONTACT_FOOTER",
    components: {
      EN: {
        phone: "123-456-7890",
        email: "email@en.com",
        address: "123 Main Street, City EN",
        workingHours: "Mon-Fri 9:00-17:00",
        quickLinks: ["Home", "About Us", "Services", "Contact"],
        supportLinks: ["FAQ", "Terms of Use", "Support Center"],
        socialLinks: ["Telegram", "Instagram", "LinkedIn", "Twitter"],
      },
      FA: {
        phone: "۰۱۲۳۴۵۶۷۸۹۰",
        email: "email@fa.com",
        address: "خیابان اصلی ۱۲۳، شهر",
        workingHours: "دوشنبه تا جمعه ۹:۰۰-۱۷:۰۰",
        quickLinks: ["خانه", "درباره ما", "خدمات", "تماس"],
        supportLinks: ["سوالات متداول", "شرایط استفاده", "مرکز پشتیبانی"],
        socialLinks: ["تلگرام", "اینستاگرام", "لینکدین", "توییتر"],
      },
    },
  },

  ABOUT_US_MAIN: {
    type: "ABOUT_US_MAIN",
    components: {
      EN: {
        background: undefined as any,
        agents: [
          { name: "Agent EN", role: "Role EN", image: undefined as any },
          { name: "Agent EN", role: "Role EN", image: undefined as any },
          { name: "Agent EN", role: "Role EN", image: undefined as any },
        ],
        generations: [
          {
            title: "Generation 1",
            description: "Placeholder description for generation 1 EN.",
            image: undefined as any,
          },
          {
            title: "Generation 2",
            description: "Placeholder description for generation 2 EN.",
            image: undefined as any,
          },
          {
            title: "Generation 3",
            description: "Placeholder description for generation 2 EN.",
            image: undefined as any,
          },
        ],
      },
      FA: {
        background: undefined as any,
        agents: [
          { name: "نماینده FA", role: "نقش FA", image: undefined as any },
          { name: "نماینده FA", role: "نقش FA", image: undefined as any },
          { name: "نماینده FA", role: "نقش FA", image: undefined as any },
        ],
        generations: [
          {
            title: "نسل اول",
            description: "توضیح نمونه برای نسل اول به فارسی.",
            image: undefined as any,
          },
          {
            title: "نسل دوم",
            description: "توضیح نمونه برای نسل دوم به فارسی.",
            image: undefined as any,
          },
          {
            title: "نسل سوم",
            description: "توضیح نمونه برای نسل دوم به فارسی.",
            image: undefined as any,
          },
        ],
      },
    },
  },

  CAREERS_HERO: {
    type: "CAREERS_HERO",
    components: {
      EN: {
        background: undefined as any,
        title: {
          marked: "marked title",
          text: "this is text with marked title",
        },
        description: "this is description.",
      },
      FA: {
        background: undefined as any,
        title: {
          marked: "متن مارک شده",
          text: "این یک متن است که مارک شده است",
        },
        description: "این یک توضیحات است.",
      },
    },
  },

  CAREERS_JOBS: {
    type: "CAREERS_JOBS",
    components: {
      EN: {
        jobs: [],
      },
      FA: {
        jobs: [],
      },
    },
  },
};

// 2) Shared base fields
type BaseFields = {
  name: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  _id: string;
};

// 3) Final type
export type ISection = BaseFields & SECTIONS_TYPES[keyof SECTIONS_TYPES];

export interface ISectionCU {
  _id: string;
  type: string;
  isActive: boolean;
  name: string;
  page: string;
  components: any;
}

export const SectionsSchema = new mongoose.Schema<ISection>(
  {
    name: {
      type: String,
      required: [true, "اسم سکشن الزامی است."],
    },
    type: {
      type: String,
      required: [true, "نوع سکشن الزامی است."],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    components: {
      type: Object,
      default: [],
    },
  },
  {
    timestamps: true,
  },
);

SectionsSchema.pre("findOneAndDelete", async function (next) {
  const sectionId = this.getQuery()._id;

  await PageModel.updateMany(
    {
      sections: sectionId,
    },
    {
      $pull: { sections: sectionId },
    },
  );

  next();
});

SectionsSchema.post("find", async function (docs: ISection[]) {
  await Promise.all(
    docs.map(async (career) => {
      const { type, components } = career;

      if (type === "CAREERS_JOBS") {
        const EN = components.EN;
        const FA = components.FA;

        const enJobs = await Promise.all(
          EN.jobs.map(async (job: any) => {
            const validatedJob = await CareerModel.findById(
              job._id || job,
            ).lean();
            return validatedJob || null;
          }),
        );
        career.components.EN.jobs = enJobs.filter(Boolean) as any;

        const faJobs = await Promise.all(
          FA.jobs.map(async (job: any) => {
            const validatedJob = await CareerModel.findById(
              job._id || job,
            ).lean();
            return validatedJob || null;
          }),
        );
        career.components.FA.jobs = faJobs.filter(Boolean) as any;
      }
    }),
  );
});

export default mongoose.model("Sections", SectionsSchema);
