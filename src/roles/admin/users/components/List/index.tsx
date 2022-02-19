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
  <TextInput source="name" label="الاسم" alwaysOn />,
]

export const CategoryList: FC<DatagridProps> = (props) => {
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
        <TextField source="name" label="الاسم" />
        <TextField source="credits" label="الرصيد" />
        <TextField source="email" label="البريد" />
        {/*<NumberField source="price" label="السعر" />*/}
        {/*<NumberField*/}
        {/*  source="maxImportProducts"*/}
        {/*  label="عدد المنتجات التي يمكن ان يستوردها"*/}
        {/*/>*/}
        {/*<BooleanField source="chatSupport" label="الدعم عبر الشات" />*/}
        {/*<BooleanField source="emailSupport" label="الدعم عبر الشات" />*/}
        {/*<BooleanField source="chatSupport" label="الدعم عبر البريد" />*/}
        {/*<BooleanField*/}
        {/*  source="canSeeProducts"*/}
        {/*  label="هل يستطيع المستخدم مشاهدة المنتجات"*/}
        {/*/>*/}
        {/*<BooleanField*/}
        {/*  source="canSellProducts"*/}
        {/*  label="هل يستطيع المستخدم بيع المنتجات"*/}
        {/*/>*/}
      </Datagrid>
    </List>
  )
}
