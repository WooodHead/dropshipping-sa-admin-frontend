import { Edit, SimpleForm, TextInput } from "react-admin"
import * as React from "react"

export const VariantEdit = (props) => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput source="name" />
      <TextInput source="variant" />
    </SimpleForm>
  </Edit>
)
