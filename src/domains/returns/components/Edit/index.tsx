import {
  Edit,
  SimpleForm,
  FileField,
  SelectInput,
  TextField,
  FunctionField,
  TextInput,
} from "react-admin"
import * as React from "react"

export const ReturnEdit = (props) => (
  <Edit {...props}>
    <SimpleForm>
      <TextField source="product.productName" label="Product" />
      <TextField source="guestOrder.receiverName" label="User" />
      <TextField source="guestOrder.totalCost" label="Cost" />
      <FunctionField
        label="ID"
        render={(record) => `52687/${record.guestOrder.externalId}`}
      />
      <TextField source="guestOrder.phoneNumber" label="Customer Phone" />
      <TextField source="phone" label="Refund Phone" />
      <FileField source="policy" title="Policy" download />
      <FileField source="video" title="Video" download />
      <TextField source="explain" />
      <SelectInput
        source="status"
        choices={[
          { id: "PENDING", name: "Pending" },
          { id: "REFUSED", name: "Refused" },
          { id: "ACCEPTED", name: "Accepted" },
        ]}
      />
      <SelectInput
        source="type"
        choices={[
          { id: "RETURN", name: "Refund" },
          { id: "REPLACEMENT", name: "Replacement" },
        ]}
      />
      <TextInput source="rejectReason" />
    </SimpleForm>
  </Edit>
)
