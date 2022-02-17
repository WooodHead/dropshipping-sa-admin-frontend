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
  maxImportProducts: {
    translation: "عدد المنتجات التي يمكن ان يستوردها",
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
  canSeeProducts: {
    translation: "هل يستطيع المستخدم مشاهدة المنتجات",
    type: "boolean",
  },
  canSellProducts: {
    translation: "هل يستطيع المستخدم بيع المنتجات",
    type: "boolean",
  },
  emailSupport: {
    translation: "الدعم عبر البريد",
    type: "boolean",
  },
  chatSupport: {
    translation: "الدعم عبر الشات",
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
