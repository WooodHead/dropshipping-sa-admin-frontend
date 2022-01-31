/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { cloneElement, FC } from "react"
import {
  Datagrid,
  List,
  TextField,
  DateField,
  Pagination,
  useListContext,
  TopToolbar,
  FunctionField,
  Filter,
  Button,
  sanitizeListRestProps,
  RichTextField,
  TextInput,
  SelectInput,
  BulkDeleteButton,
  useNotify,
  BulkExportButton,
  BulkUpdateButton,
  SingleFieldList,
  ChipField,
  ArrayField,
} from "react-admin"
import IconEvent from "@material-ui/icons/Publish"
import Chip from "@material-ui/core/Chip"
import Axios from "axios"
import { API_URL } from "../../../../config/constants"
import InvoiceShow from "../InvoiceShow"
import { makeStyles } from "@material-ui/core/styles"
import { rowStyle } from "./styles"
import IconButton from "@material-ui/core/IconButton"
import { Call, ThumbUp, WhatsApp } from "@material-ui/icons"
import { GuestOrder, OrderStatus } from "../../../../types"

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
})

const BulkSentWhats = (props) => (
  <BulkUpdateButton
    {...props}
    label="تم طلب الاوردر"
    data={{ status: OrderStatus.order_received }}
    type="button"
    style={{ color: "white" }}
    icon={<WhatsApp />}
  />
)

const BulkConfirmed = (props) => (
  <BulkUpdateButton
    {...props}
    label="تم تاكيد الطلب"
    style={{ color: "white" }}
    data={{ status: OrderStatus.confirmed }}
    icon={<ThumbUp />}
  />
)

const BulkWaitingDelivery = (props) => (
  <BulkUpdateButton
    {...props}
    label="في الشحن"
    style={{ color: "white" }}
    data={{ status: OrderStatus.delivery_in_progress }}
    icon={<ThumbUp />}
  />
)

const GuestOrderFilter = (props) => (
  <Filter {...props}>
    <TextInput label="المعرف" source="id||eq" alwaysOn type="number" />
    <TextInput label="اسم العميل" source="receiverName" alwaysOn />
    <TextInput label="رقم هاتف العميل" source="phoneNumber" alwaysOn />
    <TextInput label="العنوان" source="streetName" alwaysOn />
    <TextInput label="اسم المنتج" source="productName" alwaysOn />
    <SelectInput
      source="status||eq"
      alwaysOn
      label="الحالة"
      choices={[
        {
          id: "order_created",
          name: "Created",
        },
        {
          id: "order_received",
          name: "Submitted",
        },
      ]}
    />
  </Filter>
)

const ListActions = (props) => {
  const notify = useNotify()
  const submit = async (ids: any[]) => {
    try {
      await Axios.post(`${API_URL}/guest-order/secret-submit`, {
        ids: ids,
      })
      notify("success submitting", "info")
    } catch (e) {
      notify("unknown error occured", "warning")
    }
  }

  const { className, exporter, filters, maxResults, ...rest } = props
  const { resource, displayedFilters, filterValues, selectedIds, showFilter } =
    useListContext()
  return (
    <TopToolbar className={className} {...sanitizeListRestProps(rest)}>
      {filters &&
        cloneElement(filters, {
          resource,
          showFilter,
          displayedFilters,
          filterValues,
          context: "button",
        })}
      <Button
        onClick={() => submit(selectedIds)}
        label="Submit Orders"
        variant="contained"
      >
        <IconEvent />
      </Button>
      <BulkSentWhats {...props} />
      <BulkConfirmed {...props} />

      <BulkDeleteButton {...props} />
      <BulkExportButton {...props} />
      <BulkWaitingDelivery {...props} />
    </TopToolbar>
  )
}

export const GuestOrderList: FC = (props) => {
  const classes = useListStyles()
  return (
    <List
      sort={{
        field: "createdAt",
        order: "DESC",
      }}
      {...props}
      pagination={<PostPagination />}
      bulkActionButtons={<ListActions {...props} />}
      filters={<GuestOrderFilter />}
      perPage={25}
    >
      <Datagrid
        rowClick="expand"
        rowStyle={(record) => rowStyle(record as any)}
        expand={<InvoiceShow />}
      >
        <TextField source="id" label="المعرف" />
        <FunctionField
          label="الحالة"
          source="status"
          render={(record) =>
            record.status === "order_created" ? (
              <Chip label="created" />
            ) : (
              <Chip
                label={record.status}
                style={{ backgroundColor: "#4CAF50" }}
              />
            )
          }
        />
        <TextField source="productName" label="اسم المنتج" />
        <ArrayField source="shoes" label="المتغيرات">
          <Datagrid>
            <TextField source="size" label="المقاس" />
            <TextField source="color" label="اللون" />
          </Datagrid>
        </ArrayField>
        <TextField source="receiverName" label="اسم المستلم" />
        <TextField
          source="streetName"
          cellClassName={classes.comment}
          label="العنوان"
        />
        <TextField source="province" label="المحافظة" />
        <TextField source="phoneNumber" label="رقم الهاتف" />
        <TextField source="totalCost" label="الاجمالي" />
        <TextField source="productPrice" label="سعر القطعة" />
        <TextField source="deliveryCost" label="سعر الشحن" />
        <TextField source="discount" label="الخصم" />
        <TextField source="spamScore" label="مؤشر النصب" />
        <TextField source="quantity" label="عدد القطع" />
        <DateField source="createdAt" label="تاريخ الانشاء" />
      </Datagrid>
    </List>
  )
}
