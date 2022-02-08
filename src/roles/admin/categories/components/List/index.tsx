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
  // <NumberInput label="المعرف" source="id||eq" alwaysOn />,
  <TextInput source="name" label="الاسم" alwaysOn />,
]

export const CategoryList: FC<DatagridProps> = (props) => {
  const isXSmall = useMediaQuery<Theme>((theme) => theme.breakpoints.down("xs"))

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
        <TextField source="name" label="الاسم" />
        {/*<BooleanField source="primary" label="رئيسي" />*/}
        {/*<TextField source="slug" label="الرابط" />*/}
        {/*<TextField source="type" label="النوع" />*/}
        {/*<ArrayField source="terms" label="العناصر">*/}
        {/*  <SingleFieldList>*/}
        {/*    <ChipField source="value" />*/}
        {/*  </SingleFieldList>*/}
        {/*</ArrayField>*/}
      </Datagrid>
    </List>
  )
}
