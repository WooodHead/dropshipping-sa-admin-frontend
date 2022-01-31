import * as React from "react"
import { FC } from "react"
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import { makeStyles } from "@material-ui/core/styles"
import {
  useShowController,
  ReferenceField,
  TextField,
  FieldProps,
  Button,
  useNotify,
} from "react-admin"
import { GuestOrder } from "../../../../types"
import IconEvent from "@material-ui/icons/Publish"
import Axios from "axios"
import { API_URL } from "../../../../config/constants"

const CustomerField: FC<FieldProps<GuestOrder>> = ({ record }) =>
  record ? (
    <Typography>
      {record.receiverName}
      <br />
      {record.province} - {record.streetName}
      <br />
      {record.phoneNumber}, {record.phoneNumber2}
    </Typography>
  ) : null

const useStyles = makeStyles({
  root: { width: 600, margin: "auto" },
  spacer: { height: 20 },
  invoices: { margin: "10px 0" },
})

const InvoiceShow = (props: any) => {
  const { record } = useShowController<GuestOrder>(props)
  const classes = useStyles()
  const notify = useNotify()

  if (!record) return null

  const submit = async (id: number) => {
    try {
      await Axios.post(`${API_URL}/guest-order/secret-submit/${id}`)
      notify("success submitting", "info")
    } catch (e) {
      notify("unknown error occured", "warning")
    }
  }

  return (
    <Card className={classes.root}>
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography variant="h6" gutterBottom>
              {record.receiverName}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="h6" gutterBottom align="right">
              Invoice {record.id}
            </Typography>
          </Grid>
          <ReferenceField
            resource="guest-order"
            reference="guest-order"
            source="id"
            basePath="/guest-order"
            record={record}
            link={false}
          >
            <CustomerField />
          </ReferenceField>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={12} container alignContent="flex-end">
            <ReferenceField
              resource="guest-order"
              reference="guest-order"
              source="id"
              basePath="/guest-order"
              record={record}
              link={true}
            >
              <p>تعديل</p>
            </ReferenceField>
          </Grid>
        </Grid>

        <div className={classes.spacer}>&nbsp;</div>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography variant="h6" gutterBottom align="center">
              Date
            </Typography>
            <Typography gutterBottom align="center">
              {new Date(record.createdAt).toLocaleString()}
            </Typography>
          </Grid>

          <Grid item xs={5}>
            <Typography variant="h6" gutterBottom align="center">
              Notes
            </Typography>
            <ReferenceField
              resource="guest-order"
              reference="guest-order"
              source="id"
              basePath="/guest-order"
              record={record}
              link={false}
            >
              <TextField
                source="notes"
                align="center"
                component="p"
                gutterBottom
              />
            </ReferenceField>
          </Grid>
          <Button onClick={() => submit(record?.id)} label="Submit Order">
            <IconEvent />
          </Button>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default InvoiceShow
