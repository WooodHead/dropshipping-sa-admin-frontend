import { FC, ReactElement } from "react"
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
} from "react-admin"
import { makeStyles } from "@material-ui/core/styles"

const useListStyles = makeStyles((theme) => ({
  image: {
    width: "100px",
    height: "auto",
  },
}))

export const MobileFields: FC<{ fields: object; id: Identifier }> = ({
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
        <div>
          <h4>{field.translation}:</h4>
          {value ? (
            <img
              src={String(value)}
              alt={String(value)}
              style={{
                height: 100,
                width: 100,
                objectFit: "cover",
              }}
            />
          ) : (
            <p>لا يوجد صورة</p>
          )}
        </div>
      )
    case "string":
      return (
        <div>
          <h4>{field.translation}:</h4>
          <TextField source={k} record={{ [k]: value, id: id }} />
        </div>
      )
    case "number":
      return (
        <div>
          <h4>{field.translation}:</h4>
          <NumberField source={k} record={{ [k]: value, id: id }} />
        </div>
      )

    case "boolean":
      return (
        <div>
          <h4>{field.translation}:</h4>
          <BooleanField source={k} record={{ [k]: value, id: id }} />
        </div>
      )
    case "date":
      return (
        <div>
          <h4>{field.translation}:</h4>
          <DateField source={k} record={{ [k]: value, id: id }} />
        </div>
      )
    case "object":
      return (
        <div>
          <h4>{field.translation}:</h4>
          <TextField source={field.nameField} record={value as Record} />
        </div>
      )
    default:
      return <div />
  }
}
