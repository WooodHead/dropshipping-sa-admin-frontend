import { GuestOrder } from "../../../../types"
import green from "@material-ui/core/colors/green"
import orange from "@material-ui/core/colors/orange"
import red from "@material-ui/core/colors/red"
import { useTheme } from "@material-ui/core/styles"
import { Identifier } from "react-admin"

export const rowStyle = (record: GuestOrder) => {
  const style = {}
  if (!record) {
    return style
  }
  if (record.spamScore < 2)
    return {
      ...style,
      borderLeftColor: green[500],
      borderLeftWidth: 5,
      borderLeftStyle: "solid",
    }
  if (record.spamScore <= 7)
    return {
      ...style,
      borderLeftColor: orange[500],
      borderLeftWidth: 5,
      borderLeftStyle: "solid",
    }
  if (record.spamScore > 7)
    return {
      ...style,
      borderLeftColor: red[500],
      borderLeftWidth: 5,
      borderLeftStyle: "solid",
    }
  return style
}
