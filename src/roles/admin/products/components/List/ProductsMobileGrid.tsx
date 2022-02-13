import { MobileGridProps } from "../../../../../types"
import { Card, CardContent, CardHeader } from "@material-ui/core"
import {
  BooleanField,
  DateField,
  EditButton,
  NumberField,
  TextField,
} from "react-admin"
import { makeStyles } from "@material-ui/core/styles"
import { MobileFields } from "../../../../../components/MobileFields"

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

export const ProductsMobileGrid = (props: MobileGridProps) => {
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
                <h4>المعرف: {id}</h4>
                <EditButton
                  resource="commands"
                  basePath={basePath}
                  record={data[id]}
                />
              </div>
            }
          />
          <CardContent className={classes.cardContent}>
            <MobileFields fields={data[id]} id={id} />
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
