import { Edit, SimpleForm, TextInput } from "react-admin"
import * as React from "react"

export const BlacklistEdit = (props) => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput source="keyword" />
    </SimpleForm>
  </Edit>
)
