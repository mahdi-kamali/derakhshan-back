export const MongooseErrorMessages = {
  phone: {
    required: "شماره تلفن الزامی است.",
    match: "شماره تلفن معتبر نیست.",
    unique: "شماره تلفن قبلاً استفاده شده است.",
    minlength: "شماره تلفن باید حداقل {min} رقم باشد.",
    maxlength: "شماره تلفن نمی‌تواند بیش از {max} رقم باشد.",
  },
  name: {
    required: "نام شما الزامی است.",
    unique: "این نام قبلاً استفاده شده است.",
    minlength: "نام باید حداقل {min} کاراکتر باشد.",
    maxlength: "نام نمی‌تواند بیش از {max} کاراکتر باشد.",
  },
  password: {
    required: "رمز عبور الزامی است.",
    minlength: "رمز عبور باید حداقل {min} کاراکتر باشد.",
    maxlength: "رمز عبور نمی‌تواند بیش از {max} کاراکتر باشد.",
    match: "فرمت رمز عبور معتبر نیست.",
  },
  email: {
    required: "ایمیل الزامی است.",
    match: "فرمت ایمیل معتبر نیست.",
    unique: "این ایمیل قبلاً ثبت شده است.",
  },
  username: {
    required: "نام کاربری الزامی است.",
    unique: "این نام کاربری قبلاً استفاده شده است.",
    minlength: "نام کاربری باید حداقل {min} کاراکتر باشد.",
    maxlength: "نام کاربری نمی‌تواند بیش از {max} کاراکتر باشد.",
    match: "فرمت نام کاربری معتبر نیست.",
  },
  date: {
    required: "تاریخ الزامی است.",
    match: "فرمت تاریخ معتبر نیست.",
  },
  slug: {
    required: "اسلاگ الزامی است.",
    unique: "اسلاگ حتما باید خاص باشد..",
  },
  number: {
    required: "{field} الزامی است.",
    min: "{field} نمی‌تواند کمتر از {min} باشد.",
    max: "{field} نمی‌تواند بیشتر از {max} باشد.",
  },
  array: {
    required: "{field} الزامی است.",
    minlength: "{field} باید حداقل {min} آیتم داشته باشد.",
    maxlength: "{field} نمی‌تواند بیش از {max} آیتم داشته باشد.",
  },
  enum: {
    required: "{field} الزامی است.",
    match: "{field} مقدار معتبری ندارد.",
  },
  object: {
    _id: "{field} فرمت اشتباهی است.",
  },
  default: {
    required: "{field} الزامی است.",
    match: "فرمت {field} معتبر نیست.",
    unique: "{field} قبلاً استفاده شده است.",
  },
};
