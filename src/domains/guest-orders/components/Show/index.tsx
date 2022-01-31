import * as React from "react"
import {
  Show,
  SimpleShowLayout,
  TextField,
  DateField,
  RichTextField,
  EditButton,
  TopToolbar,
} from "react-admin"

const PostShowActions = ({ basePath, data }) => (
  <TopToolbar>
    <EditButton basePath={basePath} record={data} />
  </TopToolbar>
)

export const GuestOrderShow = (props) => (
  <Show {...props} actions={<PostShowActions {...props} />}>
    <SimpleShowLayout>
      <TextField source="id" />
      <TextField source="receiverName" />
      <TextField source="phoneNumber" />
      <TextField source="phoneNumber2" />
      <TextField source="province" />
      <RichTextField source="streetName" />
      <TextField source="totalCost" />
      <TextField source="quantity" />
      <TextField source="product.productName" label="Product" />
      <TextField source="status" />
      <TextField source="spamScore" />
      <TextField source="uuid" />
      <RichTextField source="notes" />
      <DateField source="createdAt" />
    </SimpleShowLayout>
  </Show>
)
