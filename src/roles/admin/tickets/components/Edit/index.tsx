import {
  ArrayField,
  BooleanInput,
  Edit,
  NumberInput,
  RadioButtonGroupInput,
  required,
  SimpleForm,
  TextField,
  SingleFieldList,
  Datagrid,
  UrlField,
  TextInput,
  FieldProps,
} from "react-admin"
import * as React from "react"
import { FC } from "react"
import { TicketTypes } from "../../../../../types"
import { ticketsTypeTranslator } from "../../../../../services/translator-keys.service"
import { fontFamily } from "../../../../../config/constants"

export const TicketEdit = (props) => {
  return (
    <Edit {...props}>
      <SimpleForm redirect="list">
        <TextField source="subject" label="العنوان" />
        <TextField source="description" label="الوصف" />
        <BooleanInput source="isOpen" label="هل التذكرة مفتوحة" />
        <ArrayField source="files" label="ملفات">
          <Datagrid>
            <UrlField source="url" target="_blank" label="الرابط" />
          </Datagrid>
        </ArrayField>
        <TicketTypeField source="type" />
      </SimpleForm>
    </Edit>
  )
}

export const TicketTypeField: FC<
  FieldProps<{ type: TicketTypes; id: number }> & { hideTitle?: boolean }
> = ({ record, hideTitle = false }) => {
  if (!record) {
    return <div />
  }

  return (
    <div style={{ fontFamily }}>
      {!hideTitle && <h3>نوع التذكرة:</h3>}
      <p>{ticketsTypeTranslator[record.type]}</p>
    </div>
  )
}
