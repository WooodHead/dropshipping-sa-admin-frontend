import React, { cloneElement, FC } from "react"
import {
  Datagrid,
  List,
  TextField,
  Pagination,
  Filter,
  TextInput,
  NumberInput,
} from "react-admin"
import { makeStyles } from "@material-ui/core/styles"

const PostPagination = (props) => (
  <Pagination rowsPerPageOptions={[25, 50, 100]} {...props} />
)

const useListStyles = makeStyles({
  headerRow: {
    borderLeftColor: "transparent",
    borderLeftWidth: 5,
    borderLeftStyle: "solid",
  },
  comment: {
    maxWidth: "10em",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  thumb: {
    height: 50,
    width: 50,
    borderRadius: 25,
  },
})

const BlacklistFilter = (props) => (
  <Filter {...props}>
    <NumberInput label="ID" source="id||eq" alwaysOn />
    <TextInput source="variant.name" alwaysOn label="Variant" />
    <TextInput source="product.productName" alwaysOn label="Product" />
  </Filter>
)

export const ProductVariantList: FC = (props) => {
  return (
    <List
      {...props}
      pagination={<PostPagination />}
      filters={<BlacklistFilter />}
      hasCreate
      perPage={25}
    >
      <Datagrid rowClick="edit">
        <TextField source="id" />
        <TextField source="name" />
        <TextField source="product.productName" label="Product" />
        <TextField source="variant.name" label="Variant" />
      </Datagrid>
    </List>
  )
}
