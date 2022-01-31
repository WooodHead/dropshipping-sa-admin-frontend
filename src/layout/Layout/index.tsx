import * as React from "react"
import { Layout } from "react-admin"
import MyAppBar from "../AppBar"

const MyLayout = (props) => (
  <Layout
    dir="rtl"
    style={{ textAlign: "right" }}
    {...props}
    appBar={MyAppBar}
  />
)

export default MyLayout
