import {
  BooleanInput,
  Edit,
  NumberInput,
  RadioButtonGroupInput,
  required,
  SimpleForm,
  TextInput,
} from "react-admin"
import * as React from "react"

export const CategoryEdit = (props) => {
  return (
    <Edit {...props}>
      <SimpleForm redirect="list">
        <TextInput source="name" label="الاسم" validate={required()} />
        <NumberInput source="price" label="سعر الباقة" validate={required()} />
        <BooleanInput
          source="canSeeProducts"
          label="هل يستطيع المستخدم مشاهدة المنتجات"
          defaultValue={false}
        />
        <BooleanInput
          source="canSellProducts"
          label="هل يستطيع المستخدم بيع المنتجات"
        />
        <BooleanInput source="emailSupport" label="الدعم عبر البريد" />
        <BooleanInput source="chatSupport" label="الدعم عبر الشات" />
        <NumberInput
          source="maxImportProducts"
          label="عدد المنتجات التي يمكن ان يستوردها"
          validate={required()}
        />
      </SimpleForm>
    </Edit>
  )
}
