import React, { FC, ReactElement } from "react"
import {
  TranslatableField,
  translatorKeysService,
} from "../../services/translator-keys.service"
import {
  Identifier,
  NumberField,
  TextField,
  ImageField,
  BooleanField,
  DateField,
  Record,
  FunctionField,
} from "react-admin"
import { makeStyles } from "@material-ui/core/styles"
import Avatar from "@material-ui/core/Avatar"

const useListStyles = makeStyles((theme) => ({
  image: {
    width: "100px",
    height: "auto",
  },
}))

export const DesktopFields: FC<{ fields: object; id: Identifier }> = ({
  fields,
  id,
}) => {
  const iterateFields = () => {
    const elements: ReactElement[] = []
    for (const [key, v] of Object.entries(fields)) {
      if (key in translatorKeysService) {
        elements.push(
          <Field
            field={translatorKeysService[key]}
            k={key}
            value={v}
            key={key}
            id={id}
          />
        )
      }
    }
    return elements
  }
  return <>{iterateFields()}</>
}

interface FieldProps {
  field: TranslatableField
  value: string | boolean | number | Date | object
  k: string
  id: Identifier
}

const Field: FC<FieldProps> = ({ field, value, k, id }) => {
  const classes = useListStyles()
  switch (field.type) {
    case "image":
      return (
        <FunctionField
          label={field.translation}
          render={() => (
            <Avatar src={String(value)} style={{ width: 50, height: 50 }} />
          )}
        />
      )
    case "string":
      return (
        <TextField
          label={field.translation}
          source={k}
          record={{ [k]: value, id: id }}
        />
      )
    case "number":
      return (
        <NumberField
          label={field.translation}
          source={k}
          record={{ [k]: value, id: id }}
        />
      )

    case "boolean":
      return (
        <BooleanField
          label={field.translation}
          source={k}
          record={{ [k]: value, id: id }}
        />
      )
    case "date":
      return (
        <DateField
          label={field.translation}
          source={k}
          record={{ [k]: value, id: id }}
        />
      )
    case "object":
      return (
        <TextField
          label={field.translation}
          source={field.nameField}
          record={value as Record}
        />
      )
    default:
      return <div />
  }
}
