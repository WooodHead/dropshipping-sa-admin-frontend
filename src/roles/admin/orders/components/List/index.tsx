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
  FieldProps,
} from "react-admin"
import { makeStyles } from "@material-ui/core/styles"
import { Theme, useMediaQuery } from "@material-ui/core"
import { MobileGrid } from "../MobileGrid"
import { DropOrderStatus, TicketTypes } from "../../../../../types"
import { fontFamily } from "../../../../../config/constants"
import {
  orderStatusTranslator,
  ticketsTypeTranslator,
} from "../../../../../services/translator-keys.service"

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

export const OrderList: FC<DatagridProps> = (props) => {
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
        <TextField source="receiverName" label="اسم المستلم" />
        <TextField source="totalCost" label="اجمالي الطلب" />
        <TextField source="deliveryCost" label="تكلفة الشحن" />
        <OrderTypeField hideTitle source="status" label="حالة الطلب" />
      </Datagrid>
    </List>
  )
}

export const OrderTypeField: FC<
  FieldProps<{ status: DropOrderStatus; id: number }> & { hideTitle?: boolean }
> = ({ record, hideTitle = false }) => {
  if (!record) {
    return <div />
  }

  return (
    <div style={{ fontFamily }}>
      {!hideTitle && <h3>حالة الطلب:</h3>}
      <p>{orderStatusTranslator[record.status]}</p>
    </div>
  )
}
