import React from "react"
import { Create, SimpleForm, TextInput } from "react-admin"

export const VariantCreate = (props) => {
  return (
    <Create {...props}>
      <SimpleForm redirect="list">
        <TextInput source="name" />
        <TextInput source="variant" />
      </SimpleForm>
    </Create>
  )
}
