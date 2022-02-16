import React, { cloneElement, FC } from "react"
import {
  Datagrid,
  List,
  TextField,
  DateField,
  Pagination,
  FunctionField,
  Filter,
  BooleanField,
  TextInput,
  DatagridProps,
} from "react-admin"
import Chip from "@material-ui/core/Chip"
import Avatar from "@material-ui/core/Avatar"
import { makeStyles } from "@material-ui/core/styles"
import { Theme, useMediaQuery } from "@material-ui/core"
import { MobileGrid } from "../../../../../domains/attributes/components/MobileGrid"
import { ProductsMobileGrid } from "./ProductsMobileGrid"

const PostPagination = (props) => (
  <Pagination rowsPerPageOptions={[25, 50, 100]} {...props} />
)

const useListStyles = makeStyles({
  headerRow: {
    borderLeftColor: "transparent",
    borderLeftWidth: 5,
    borderLeftStyle: "solid",
  },
  // headerCell: {
  //   padding: '6px 0px 6px 0px',
  // },
  // rowCell: {
  //   padding: '6px 4px 6px 4px',
  // },
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

const GuestOrderFilter: FC = (props) => (
  <Filter {...props}>
    <TextInput label="اسم المنتج" source="productName" alwaysOn />
  </Filter>
)

export const ProductsList: FC<DatagridProps> = (props) => {
  const isXSmall = useMediaQuery<Theme>((theme) => theme.breakpoints.down("xs"))

  const classes = useListStyles()
  if (isXSmall) {
    return (
      <List {...props} pagination={<PostPagination />} hasCreate perPage={25}>
        <ProductsMobileGrid {...props} />
      </List>
    )
  }
  return (
    <List
      sort={{ field: "createdAt", order: "DESC" }}
      {...props}
      pagination={<PostPagination />}
      filters={<GuestOrderFilter />}
      perPage={25}
    >
      <Datagrid rowClick="edit">
        <TextField source="id" label="المعرف" />
        <FunctionField
          label="الصورة"
          render={(record) => (
            <Avatar
              src={`${record.thumbnail}`}
              style={{ width: 50, height: 50 }}
            />
          )}
        />
        <TextField
          source="name"
          label="اسم المنتج"
          cellClassName={classes.comment}
        />
        <TextField source="stockCount" label="المخزون" />
        <TextField source="price" label="سعر المنتج" />
        <TextField source="vendorPrice" label="سعر المورد" />
        <FunctionField
          label="نشط"
          render={(record) =>
            record.isActive ? (
              <Chip label="نشط" style={{ backgroundColor: "#4CAF50" }} />
            ) : (
              <Chip label="غير نشط" style={{ backgroundColor: "#f44336" }} />
            )
          }
        />
        <FunctionField
          label="ممسوح"
          render={(record) =>
            record.isDeleted ? (
              <Chip label="ممسوح" style={{ backgroundColor: "#f44336" }} />
            ) : (
              <Chip label="غير ممسوح" style={{ backgroundColor: "#4CAF50" }} />
            )
          }
        />
        <TextField source="sku" label="رمز sku" />
        <TextField source="category.name" label="القسم" />
        <TextField source="vendor.name" label="المورد" />
        <TextField source="brand.name" label="البراند" />

        <DateField source="createdAt" label="تاريخ الإنشاء" />
      </Datagrid>
    </List>
  )
}
