import {
  Edit,
  ReferenceInput,
  SelectInput,
  SimpleForm,
  TextInput,
} from "react-admin"
import * as React from "react"

export const VariantEdit = (props) => {
  return (
    <Edit {...props}>
      <SimpleForm redirect="list">
        <TextInput source="value" label="القيمة" />
        <TextInput source="slug" label="الرابط" />
        <TextInput source="hex" label="كود اللون ( اذا كانت السمة اللون فقط)" />

        <ReferenceInput
          label="السمة"
          source="attributeId"
          reference="attributes"
        >
          <SelectInput optionText="name" />
        </ReferenceInput>
      </SimpleForm>
    </Edit>
  )
}
