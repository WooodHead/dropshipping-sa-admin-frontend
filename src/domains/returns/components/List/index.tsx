import React, { cloneElement, FC } from "react"
import {
  Datagrid,
  List,
  TextField,
  Pagination,
  Filter,
  TextInput,
  DateField,
  ChipField,
  FunctionField,
  SimpleForm,
} from "react-admin"
import { makeStyles } from "@material-ui/core/styles"
import Chip from "@material-ui/core/Chip"

const PostPagination = (props) => (
  <Pagination rowsPerPageOptions={[25, 50, 100]} {...props} />
)

const BlacklistFilter = (props) => (
  <Filter {...props}>
    <TextInput label="Product ID" source="productId" alwaysOn />
    <TextInput label="Guest Order ID" source="guestOrderId" alwaysOn />
    <TextInput
      label="Customer Phone"
      source="guestOrder.phoneNumber"
      alwaysOn
    />
    <TextInput
      label="Customer Name"
      source="guestOrder.receiverName"
      alwaysOn
    />
  </Filter>
)

export const ReturnsList: FC = (props) => {
  return (
    <List
      {...props}
      sort={{ field: "createdAt", order: "DESC" }}
      pagination={<PostPagination />}
      filters={<BlacklistFilter />}
      hasCreate
      perPage={25}
    >
      <Datagrid rowClick="edit">
        <TextField source="id" />
        <TextField source="product.productName" label="Product" />
        <TextField source="guestOrder.receiverName" label="Receiver" />
        <FunctionField
          label="Status"
          source="status"
          render={(record) =>
            record.status === "PENDING" ? (
              <Chip
                label={record.status}
                style={{ backgroundColor: "#eab000" }}
              />
            ) : (
              <Chip label={record.status} />
            )
          }
        />
        <ChipField source="type" />
        <TextField source="guestOrder.totalCost" label="Cost" />
        <DateField source="createdAt" />
      </Datagrid>
    </List>
  )
}
