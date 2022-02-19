import React from "react"
import {
  Create,
  SimpleForm,
  TextInput,
  BooleanInput,
  NumberInput,
  required,
  CheckboxGroupInput,
} from "react-admin"
import { UserRoles } from "../../../../../types"
import { permissions } from "../../../../../config/permissions"

export const ModeratorCreate = (props) => {
  const transform = (data) => ({
    ...data,
    permissions: data.permissions.map((id) => ({ id })),
  })

  return (
    <Create {...props} transform={transform}>
      <SimpleForm redirect="list">
        <TextInput source="name" label="الاسم" validate={required()} />
        <TextInput source="phone" label="رقم الهاتف" validate={required()} />
        <TextInput
          source="password"
          label="الرقم السري"
          validate={required()}
        />
        <TextInput
          source="email"
          label="البريد الالكتروني"
          validate={required()}
        />
        <TextInput source="role" label="الدور" disabled hidden />
        <NumberInput source="credits" label="الرصيد" defaultValue={0} />
      </SimpleForm>
    </Create>
  )
}
