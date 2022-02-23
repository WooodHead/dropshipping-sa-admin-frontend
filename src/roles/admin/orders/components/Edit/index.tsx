import {
  BooleanInput,
  Edit,
  NumberInput,
  RadioButtonGroupInput,
  required,
  SimpleForm,
  TextField,
  TextInput,
  SelectInput,
} from "react-admin"
import * as React from "react"
import { orderStatusTranslator } from "../../../../../services/translator-keys.service"

// "receiverName": "string",
//   "cityId": 0,
//   "address": "string",
//   "phone": "string",
//   "phone2": "string",
//   "notes": "string",
//   "productsCost": 0,
//   "deliveryCost": 0,
//   "totalCost": 0,
//   "vendorPrice": 0,
//   "sitePrice": 0,
//   "discount": 0,
//   "couponId": 0,
//   "items": [
//   {
//     "id": 0,
//     "productId": 0,
//     "price": 0,
//     "inCart": true,
//     "userId": 0,
//     "adminId": 0,
//     "vendorId": 0,
//     "product": {}
//   }
// ],
//   "userId": 0,
//   "vendorId": 0,
//   "status": "string"

export const CategoryEdit = (props) => {
  return (
    <Edit {...props}>
      <SimpleForm redirect="list">
        <TextInput source="receiverName" label="اسم المستلم" />
        <TextInput source="address" label="العنوان" />
        <TextInput source="phone" label="رقم الهاتف" />
        <TextInput source="phone2" label="رقم هاتف بديل" />
        <TextInput multiline rows={5} source="notes" label="ملاحظات" />
        <NumberInput source="totalCost" label="اجمالي الطلب" />
        <NumberInput source="deliveryCost" label="تكلفة الشحن" />
        <NumberInput source="productsCost" label="تكلفة المنتجات بسعر المسوق" />
        <NumberInput source="vendorPrice" label="تكلفة المنتجات بسعر المورد" />
        <NumberInput source="sitePrice" label="تكلفة المنتجات بسعر الموقع" />
        <SelectInput
          label="حالة الطلب"
          source="status"
          choices={Object.entries(orderStatusTranslator).map((item) => ({
            id: item[0],
            name: item[1],
          }))}
        />
      </SimpleForm>
    </Edit>
  )
}
