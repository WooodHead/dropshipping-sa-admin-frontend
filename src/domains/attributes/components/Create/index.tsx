import React from "react"
import {
  Create,
  SimpleForm,
  TextInput,
  BooleanInput,
  RadioButtonGroupInput,
  ArrayInput,
  SimpleFormIterator,
} from "react-admin"
import { AttributeType } from "../../../../types"

export const VariantCreate = (props) => {
  return (
    <Create {...props}>
      <SimpleForm redirect="list">
        <TextInput source="name" label="الاسم" />
        <TextInput source="slug" label="الرابط" />
        <BooleanInput source="primary" label="رئيسي" />
        <RadioButtonGroupInput
          source="type"
          choices={[
            {
              id: AttributeType.BUTTON,
              name: "زر",
            },
            {
              id: AttributeType.COLOR,
              name: "لون",
            },
          ]}
        />
      </SimpleForm>
    </Create>
  )
}
