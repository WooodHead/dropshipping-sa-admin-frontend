import {
  BooleanInput,
  Edit,
  RadioButtonGroupInput,
  SimpleForm,
  TextInput,
} from "react-admin"
import * as React from "react"
import { AttributeType } from "../../../../types"

export const VariantEdit = (props) => {
  return (
    <Edit {...props}>
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
    </Edit>
  )
}
