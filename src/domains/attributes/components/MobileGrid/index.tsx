// in src/comments.js
import * as React from "react"
import { Card, CardHeader, CardContent } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import {
  DateField,
  EditButton,
  NumberField,
  TextField,
  BooleanField,
  useTranslate,
} from "react-admin"
import { MobileGridProps } from "../../../../types"

const useListStyles = makeStyles((theme) => ({
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    margin: "0.5rem 0",
  },
  cardTitleContent: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  cardContent: theme.typography.body1,
  cardContentRow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    margin: "0.5rem 0",
  },
}))

export const MobileGrid = (props: MobileGridProps) => {
  const { ids, data, basePath } = props
  const classes = useListStyles()

  if (!ids || !data || !basePath) {
    return null
  }

  return (
    <div style={{ margin: "1em" }}>
      {ids.map((id) => (
        <Card key={id} className={classes.card}>
          <CardHeader
            title={
              <div className={classes.cardTitleContent}>
                <span>
                  id :&nbsp;
                  <TextField record={data[id]} source="id" />
                </span>
                <EditButton
                  resource="commands"
                  basePath={basePath}
                  record={data[id]}
                />
              </div>
            }
          />
          <CardContent className={classes.cardContent}>
            <span className={classes.cardContentRow}>
              name:&nbsp;
              <DateField record={data[id]} source="name" showTime />
            </span>
            <span className={classes.cardContentRow}>
              currency :&nbsp;
              <NumberField
                record={data[id]}
                source="primary"
                options={{ style: "currency", currency: "USD" }}
              />
            </span>
            <span className={classes.cardContentRow}>
              slug :&nbsp;
              <TextField source="slug" record={data[id]} />
            </span>
            <span className={classes.cardContentRow}>
              ?????????? :&nbsp;
              <BooleanField record={data[id]} source="returned" />
            </span>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
