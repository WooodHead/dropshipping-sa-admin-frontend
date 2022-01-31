import * as React from "react"
import {
  Show,
  SimpleShowLayout,
  TextField,
  EditButton,
  TopToolbar,
} from "react-admin"

const PostShowActions = ({ basePath, data }) => (
  <TopToolbar>
    <EditButton basePath={basePath} record={data} />
  </TopToolbar>
)

export const VariantShow = (props) => (
  <Show {...props} actions={<PostShowActions {...props} />}>
    <SimpleShowLayout>
      <TextField source="id" />
      <TextField source="name" />
      <TextField source="variant.name" />
      <TextField source="product.productName" />
    </SimpleShowLayout>
  </Show>
)
