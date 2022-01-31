import React from "react"
import { Admin, Resource, fetchUtils } from "react-admin"
import crudProvider from "@fusionworks/ra-data-nest-crud"
import polyglotI18nProvider from "ra-i18n-polyglot"
import { createTheme } from "@material-ui/core/styles"
import red from "@material-ui/core/colors/red"
import grey from "@material-ui/core/colors/grey"
import LayersIcon from "@material-ui/icons/Layers"
import Style from "@material-ui/icons/Style"
import MyLayout from "./layout/Layout"
import { authProvider } from "./config/auth.provider"
import { API_URL } from "./config/constants"
import { attributeResource } from "./domains/attributes/resource"
import arabicMessages from "./config/ar"
import { attributeTermsResource } from "./domains/attributes-terms/resource"
import { guestOrderResources } from "./domains/guest-orders/resource"
import { MonetizationOn, Money } from "@material-ui/icons"
import { theme } from "./layout/theme"
import { RTL } from "./layout/RTL"
import "./App.css"
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

const dataProvider = crudProvider(API_URL, httpClient)

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
        // i18nProvider={}
      >
        <Resource
          icon={Style}
          name="attributes"
          options={{ label: "السمات" }}
          {...attributeResource}
        />
      </Admin>
    </RTL>
  )
}

export default App
