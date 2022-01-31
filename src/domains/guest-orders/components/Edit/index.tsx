import {
  Edit,
  RichTextField,
  SelectInput,
  SimpleForm,
  TextField,
  TextInput,
} from "react-admin"
import * as React from "react"

export const GuestOrderEdit = (props) => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput source="id" />
      <TextInput source="receiverName" />
      <TextInput source="phoneNumber" />
      <TextInput source="phoneNumber2" />
      <TextInput source="province" />
      <TextInput multiline source="streetName" />
      <TextInput source="totalCost" />
      <TextInput source="quantity" />
      <TextInput multiline source="notes" />
      <TextInput source="uuid" />
      <TextInput source="spamScore" />
      <SelectInput
        source="status"
        choices={[
          { id: "order_created", name: "order_created" },
          { id: "order_received", name: "order_received" },
          { id: "pending_shipping_company", name: "pending_shipping_company" },
          { id: "delivery_in_progress", name: "delivery_in_progress" },
          { id: "delivery_suspended", name: "delivery_suspended" },
          { id: "cancel", name: "cancel" },
          { id: "confirmed", name: "confirmed" },
          { id: "taager_cancelled", name: "taager_cancelled" },
          { id: "delivered", name: "delivered" },
          { id: "return_in_progress", name: "return_in_progress" },
          { id: "return_verified", name: "return_verified" },
          { id: "replacement_in_progress", name: "replacement_in_progress" },
          { id: "replacement_verified", name: "replacement_verified" },
        ]}
      />
    </SimpleForm>
  </Edit>
)
