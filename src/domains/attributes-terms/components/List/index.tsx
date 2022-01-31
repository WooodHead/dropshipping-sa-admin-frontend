import React, { cloneElement, FC } from "react"
import {
  Datagrid,
  List,
  TextField,
  Pagination,
  Filter,
  TextInput,
  SingleFieldList,
  NumberInput,
  ChipField,
  BooleanField,
  ArrayField,
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
    <NumberInput label="المعرف" source="id||eq" alwaysOn />
    <TextInput source="value" alwaysOn label="القيمة" />
    <TextInput source="attribute.name" alwaysOn label="اسم السمة" />
  </Filter>
)

export const ProductVariantsList: FC = (props) => {
  return (
    <List
      {...props}
      pagination={<PostPagination />}
      filters={<BlacklistFilter />}
      hasCreate
      perPage={25}
    >
      <Datagrid rowClick="edit">
        <TextField source="id" label="المعرف" />
        <TextField source="value" label="القيمة" />
        <TextField source="slug" label="الرابط" />
        <TextField source="attribute.name" label="السمة" />
      </Datagrid>
    </List>
  )
}
