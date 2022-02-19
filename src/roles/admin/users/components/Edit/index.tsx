import {
  BooleanInput,
  CheckboxGroupInput,
  Edit,
  NumberInput,
  RadioButtonGroupInput,
  required,
  SimpleForm,
  TextInput,
} from "react-admin"
import * as React from "react"
import { UserRoles } from "../../../../../types"
import { permissions } from "../../../../../config/permissions"

export const ModeratorEdit = (props) => {
  const transform = (data) => ({
    ...data,
    permissions: data.parsedRoles.map((id) => ({ id })),
  })

  return (
    <Edit {...props} transform={transform}>
      <SimpleForm redirect="list">
        <TextInput source="name" label="الاسم" validate={required()} />
        <TextInput source="phone" label="رقم الهاتف" validate={required()} />
        <TextInput source="password" label="الرقم السري" />
        <TextInput
          source="email"
          label="البريد الالكتروني"
          validate={required()}
        />
        <TextInput source="role" label="الدور" disabled />
        <NumberInput source="credits" label="الرصيد" defaultValue={0} />
      </SimpleForm>
    </Edit>
  )
}
