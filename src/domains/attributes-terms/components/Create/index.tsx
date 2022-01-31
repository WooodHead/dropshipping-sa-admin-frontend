import React from "react"
import {
  Create,
  SimpleForm,
  TextInput,
  ReferenceInput,
  SelectInput,
} from "react-admin"

export const VariantCreate = (props) => {
  return (
    <Create {...props}>
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
    </Create>
  )
}
