export interface AppPermission {
  id: number
  name: string
  type: PermissionTypes
}

export enum PermissionTypes {
  accounts = "accounts",
  products = "products",
  categories = "categories",
  brands = "brands",
  tickets = "tickets",
  notifications = "notifications",
  plans = "plans",
  orders = "orders",
  topUp = "topUp",
}

export const permissions: AppPermission[] = [
  {
    id: 1,
    name: "الحسابات",
    type: PermissionTypes.accounts,
  },
  {
    id: 2,
    name: "المنتجات",
    type: PermissionTypes.products,
  },
  {
    id: 3,
    name: "الأقسام",
    type: PermissionTypes.categories,
  },
  {
    id: 4,
    name: "البراندات",
    type: PermissionTypes.brands,
  },
  {
    id: 5,
    name: "تذاكر الدعم",
    type: PermissionTypes.tickets,
  },
  {
    id: 6,
    name: "الإشعارات",
    type: PermissionTypes.notifications,
  },
  {
    id: 7,
    name: "الباقات",
    type: PermissionTypes.plans,
  },
  {
    id: 8,
    name: "الطلبات",
    type: PermissionTypes.orders,
  },
  {
    id: 9,
    name: "شحن الرصيد",
    type: PermissionTypes.topUp,
  },
]
