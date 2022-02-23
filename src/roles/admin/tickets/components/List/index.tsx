import React, { FC } from "react"
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
  DatagridProps,
  NumberField,
} from "react-admin"
import { makeStyles } from "@material-ui/core/styles"
import { Theme, useMediaQuery } from "@material-ui/core"
import { MobileGrid } from "../MobileGrid"

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
    <TextInput source="name" alwaysOn label="الاسم" />
  </Filter>
)

const filters = [
  <NumberInput label="المعرف" source="id||eq" alwaysOn />,
  <TextInput source="subject" label="العنوان" alwaysOn />,
]

export const TicketList: FC<DatagridProps> = (props) => {
  const isXSmall = useMediaQuery<Theme>((theme) => theme.breakpoints.down("sm"))

  if (isXSmall) {
    return (
      <List
        {...props}
        pagination={<PostPagination />}
        filters={filters}
        hasCreate
        perPage={25}
      >
        <MobileGrid {...props} />
      </List>
    )
  }
  return (
    <List
      {...props}
      pagination={<PostPagination />}
      filters={filters}
      hasCreate
      perPage={25}
    >
      <Datagrid rowClick="edit" optimized>
        <TextField source="id" label="المعرف" />
        <TextField source="subject" label="العنوان" />
        <TextField source="user.name" label="اسم المستخدم" />
        <BooleanField source="isOpen" label="هل تم حل التذكرة" />
      </Datagrid>
    </List>
  )
}
