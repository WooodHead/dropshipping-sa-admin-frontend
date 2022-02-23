import React from "react"
import {
  Create,
  SimpleForm,
  TextInput,
  BooleanInput,
  NumberInput,
  required,
} from "react-admin"
// {
//   "id": 0,
//   "canSeeProducts": true,
//   "name": "string",
//   "maxImportProducts": 0,
//   "canSellProducts": true,
//   "emailSupport": true,
//   "chatSupport": true,
//   "price": true
// }
export const CategoryCreate = (props) => {
  return (
    <Create {...props}>
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
          defaultValue={false}
        />
        <BooleanInput
          source="emailSupport"
          label="الدعم عبر البريد"
          defaultValue={false}
        />
        <BooleanInput
          source="chatSupport"
          label="الدعم عبر الشات"
          defaultValue={false}
        />
        <NumberInput
          source="maxImportProducts"
          label="عدد المنتجات التي يمكن ان يستوردها"
          validate={required()}
        />
      </SimpleForm>
    </Create>
  )
}
