/* eslint-disable camelcase */
export enum BannerRef {
  category = "category",
  product = "product",
}

export interface TranslatableString {
  ar: string
  en: string
}

export interface Banner {
  id?: string
  image: string
  refType?: BannerRef
  refId?: any
}

export interface Category {
  id: number
  name: string
  externalId: string
  website: ProductWebSites
  products: Product[]
}

export interface Photo {
  id: number
  url: string
  productId: string
}

enum ProductWebSites {
  TAAGER = "taager.co",
  LOCAL = "local",
}

export interface Product {
  id: number
  featured: boolean
  inStock: boolean
  isExpired: boolean
  reserved: number
  confirmed: number
  orderCount: number
  externalId: string
  productName: string
  productPrice: number
  prodPurchasePrice: number
  productProfit: number
  productDescription: string
  prodID: string
  categoryId: string
  category: Category
  photos: Photo[]
  reviews: Review[]
  productPicture: string
  createdAt: Date
  updatedAt: Date
  website: ProductWebSites
  productQuantity: number
  isDeleted: boolean
  isAvailable: string
}

export interface CardProduct {
  _id: string
  title: TranslatableString
  details: TranslatableString
  category: Category
  price: number
  hasDiscount: boolean
  discountPrice: number
  discountEnd: Date
  reviews: Array<Review>
  image: string
  created_at: Date
  view: number
  brand: TranslatableString
  isOffer: boolean
  sold: number
  inStock: number
}

export interface User {
  id: number
  name: string
  email: string
  phone: string
  role: string
  createdAt: Date
  updatedAt: Date
}

export interface LoginResponse {
  user: User
  token: string
}

export interface Address {
  _id: string
  city: City
  street: string
  details: string
  user: User
  phone: string
}

export type IconType =
  | "AntDesign"
  | "Entypo"
  | "EvilIcons"
  | "Feather"
  | "FontAwesome"
  | "FontAwesome5"
  | "Foundation"
  | "Ionicons"
  | "MaterialCommunityIcons"
  | "MaterialIcons"
  | "Octicons"
  | "SimpleLineIcons"
  | "Zocial"
  | undefined

export interface Constant {
  key: string
  value: string
  _id: string
}

export interface OrderCartItem {
  id: number
  product: Product
  productId: number
  price: number
  userId: number
  user: User
  quantity: number
}

export interface Payment {
  nameAr: string
  nameEn: string
  cities: string[]
  type: number
  _id: string
}

export enum OrderStatus {
  order_created = "order_created",
  order_received = "order_received",
  pending_shipping_company = "pending_shipping_company",
  delivery_in_progress = "delivery_in_progress",
  delivery_suspended = "delivery_suspended",
  cancel = "cancel",
  confirmed = "confirmed",
  taager_cancelled = "taager_cancelled",
  delivered = "delivered",
  return_in_progress = "return_in_progress",
  return_verified = "return_verified",
  replacement_in_progress = "replacement_in_progress",
  replacement_verified = "replacement_verified",
}

export const orderStatusAr = {
  order_created: "تم ارسال طلبك",
  order_received: "طلبك قيد المراجعة",
  pending_shipping_company: "بانتظار شركة الشحن",
  delivery_in_progress: "المنتج في طريقه اليك",
  delivery_suspended: "تم ايقاف الشحن",
  cancel: "تم الالغاء",
  confirmed: "تم التاكيد",
  taager_cancelled: "التاجر لغى العملية",
  delivered: "تم التسليم",
  return_in_progress: "جاري الارجاع",
  return_verified: "تم الارجاع",
  replacement_in_progress: "يتم تجهيز البديل",
  replacement_verified: "تم استلام البديل",
}

export interface Order {
  id: number
  receiverName: string
  province: string
  streetName: string
  phoneNumber: string
  phoneNumber2: string
  notes: string
  productsCost: number
  deliveryCost: number
  totalCost: number
  items: OrderCartItem[]
  userId: number
  user: User
  status: OrderStatus
  externalId: string
  createdAt: Date
}

export enum ProductType {
  product = 1,
  card = 2,
}

export interface Review {
  id: number
  productId: string
  value: number
  review: string
}

export interface City {
  id: number
  isActive: boolean
  externalId: string
  location: string
  branch: string
  shippingRevenue: number
  shippingCost: number
  minETA: number
  maxETA: number
}

export interface GuestOrder {
  id: number
  receiverName: string
  province: string
  streetName: string
  phoneNumber: string
  phoneNumber2: string
  notes: string
  deliveryCost: number
  totalCost: number
  quantity: number
  productId: number
  status: string
  externalId?: any
  createdAt: Date
  spamScore: number
}

export type DescriptionItemType = "photo" | "paragraph"

export interface AttributeTerm {
  id: number

  value: string

  slug: string

  attributeId: number

  hex?: string

  attribute: Attribute
}

export enum AttributeType {
  COLOR = "color",
  BUTTON = "button",
}

export interface DescriptionItem {
  type: DescriptionItemType
  content: string
}

export interface Attribute {
  id: number

  name: string

  primary: boolean

  slug: string

  type: AttributeType

  terms: AttributeTerm[]
}
