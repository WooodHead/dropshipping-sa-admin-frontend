import React from "react"
import { Create, SimpleForm, TextInput } from "react-admin"

export const KeywordCreate = (props) => {
  return (
    <Create {...props}>
      <SimpleForm redirect="list">
        <TextInput source="keyword" />
      </SimpleForm>
    </Create>
  )
}
