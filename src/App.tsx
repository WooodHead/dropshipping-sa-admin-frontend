import React from "react"
import { Admin, Resource, fetchUtils } from "react-admin"
// import crudProvider from "@fusionworks/ra-data-nest-crud"
import polyglotI18nProvider from "ra-i18n-polyglot"
import MyLayout from "./layout/Layout"
import { authProvider } from "./config/auth.provider"
import { API_URL } from "./config/constants"
import arabicMessages from "./config/ar"
import {
  Bookmarks,
  LocalMall,
  Style,
  VerifiedUser,
  Assignment,
  SupervisedUserCircle,
  People,
  Help,
  ShoppingCart,
} from "@material-ui/icons"
import { theme } from "./layout/theme"
import { RTL } from "./layout/RTL"
import "./App.css"
import { categoriesResources } from "./roles/admin/categories/resource"
import { productResources } from "./roles/admin/products/resource"
import { packagesResource } from "./roles/admin/packages/resource"
import { apiProvider } from "./config/api.provider"
import { moderatorsResources } from "./roles/admin/moderators/resource"
import { usersResources } from "./roles/admin/users/resource"
import { ticketsResource } from "./roles/admin/tickets/resource"
import { ordersResource } from "./roles/admin/orders/resource"
// import { create } from "jss";
// import rtl from "jss-rtl";
// import { jssPreset, StylesProvider } from "@material-ui/core/styles";

// const jss = create({
//   plugins: [...jssPreset().plugins, rtl()],
// });

const i18nProvider = polyglotI18nProvider(() => arabicMessages, "ar")

const httpClient = (url, options: any = {}) => {
  if (!options.headers) {
    options.headers = new Headers({ Accept: "application/json" })
  }
  const token = localStorage.getItem("token")
  options.headers.set("Authorization", `Bearer ${token}`)
  return fetchUtils.fetchJson(url, options)
}

const dataProvider = apiProvider(API_URL, httpClient)

const App = function () {
  return (
    <RTL>
      <Admin
        locale="ar"
        theme={theme}
        dataProvider={dataProvider}
        authProvider={authProvider}
        layout={MyLayout}
        i18nProvider={i18nProvider}
      >
        <Resource
          icon={Style}
          name="categories"
          options={{ label: "الأقسام" }}
          {...categoriesResources}
        />
        <Resource
          icon={Bookmarks}
          name="brands"
          options={{ label: "البراندات" }}
          {...categoriesResources}
        />
        <Resource
          icon={LocalMall}
          name="products"
          options={{ label: "المنتجات" }}
          {...productResources}
        />

        <Resource
          icon={Assignment}
          name="packages"
          options={{ label: "الباقات" }}
          {...packagesResource}
        />
        <Resource
          icon={SupervisedUserCircle}
          name="moderators"
          options={{ label: "المديرين" }}
          {...moderatorsResources}
        />
        <Resource
          icon={People}
          name="users"
          options={{ label: "المستخدمين" }}
          {...usersResources}
        />
        <Resource
          icon={Help}
          name="tickets"
          options={{ label: "تذاكر الدعم" }}
          {...ticketsResource}
        />
        <Resource
          icon={ShoppingCart}
          name="orders"
          options={{ label: "الطلبات" }}
          {...ordersResource}
        />
      </Admin>
    </RTL>
  )
}

export default App
