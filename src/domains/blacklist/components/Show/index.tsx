import * as React from "react"
import {
  Show,
  SimpleShowLayout,
  TextField,
  EditButton,
  TopToolbar,
  TextInput,
} from "react-admin"

const PostShowActions = ({ basePath, data }) => (
  <TopToolbar>
    <EditButton basePath={basePath} record={data} />
  </TopToolbar>
)

export const BlacklistShow = (props) => (
  <Show {...props} actions={<PostShowActions {...props} />}>
    <SimpleShowLayout>
      <TextField source="id" />
      <TextField source="keyword" />
    </SimpleShowLayout>
  </Show>
)
