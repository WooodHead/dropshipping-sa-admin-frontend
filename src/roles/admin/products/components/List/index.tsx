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
    <TextInput label="Product Name" source="productName" alwaysOn />
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
        <TextField source="id" />
        {/*<FunctionField*/}
        {/*  label="Available"*/}
        {/*  render={(record) => (*/}
        {/*    <Avatar*/}
        {/*      src={`${record.productPicture}`}*/}
        {/*      style={{ width: 50, height: 50 }}*/}
        {/*    />*/}
        {/*  )}*/}
        {/*/>*/}
        {/*<TextField source="productName" cellClassName={classes.comment} />*/}
        {/*<TextField source="productPrice" />*/}
        {/*<TextField source="orderCount" />*/}
        {/*<FunctionField*/}
        {/*  label="Available"*/}
        {/*  render={(record) =>*/}
        {/*    record.isAvailable === "available" ? (*/}
        {/*      <Chip label="Available" style={{ backgroundColor: "#4CAF50" }} />*/}
        {/*    ) : (*/}
        {/*      <Chip label="Out Stock" style={{ backgroundColor: "#f44336" }} />*/}
        {/*    )*/}
        {/*  }*/}
        {/*/>*/}
        {/*<BooleanField source="isDeleted" />*/}
        {/*<BooleanField source="inStock" />*/}
        <DateField source="createdAt" />
      </Datagrid>
    </List>
  )
}
