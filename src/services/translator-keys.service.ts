export const translatorKeysService: TranslatorKeysService = {
  name: {
    translation: "الاسم",
    type: "string",
  },
  price: {
    translation: "السعر",
    type: "number",
  },
  vendorPrice: {
    translation: "سعر المورد",
    type: "number",
  },
  vat: {
    translation: "القيمة المضافة",
    type: "number",
  },
  description: {
    translation: "الوصف",
    type: "number",
  },
  sku: {
    translation: "رمز sku",
    type: "string",
  },

  thumbnail: {
    translation: "الصورة المصغرة",
    type: "image",
  },
  stockCount: {
    translation: "عدد القطع في المخزون",
    type: "string",
  },
  isDeleted: {
    translation: "ممسوح",
    type: "boolean",
  },
  isActive: {
    translation: "نشط",
    type: "boolean",
  },
  category: {
    translation: "القسم",
    type: "object",
    nameField: "name",
  },
  brand: {
    translation: "البراند",
    type: "object",
    nameField: "name",
  },
  vendor: {
    translation: "المورد",
    type: "object",
    nameField: "name",
  },
  createdAt: {
    translation: "تاريخ الإنشاء",
    type: "date",
  },
}

interface TranslatorKeysService {
  [key: string]: TranslatableField
}

export interface TranslatableField {
  translation: string
  type: "string" | "number" | "object" | "date" | "boolean" | "image"
  nameField?: string
}
