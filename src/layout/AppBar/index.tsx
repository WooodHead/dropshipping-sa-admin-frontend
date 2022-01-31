import * as React from "react"
import { AppBar, Button, Toolbar, useDataProvider } from "react-admin"
import Typography from "@material-ui/core/Typography"
import IconButton from "@material-ui/core/IconButton"
import { makeStyles } from "@material-ui/core/styles"
import Axios from "axios"
import { API_URL } from "../../config/constants"
import DeleteIcon from "@material-ui/icons/Delete"

const useStyles = makeStyles({
  title: {
    flex: 1,
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    overflow: "hidden",
  },
  spacer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "flex-end",
    display: "flex",
  },
})

const MyAppBar = (props) => {
  const classes = useStyles()
  const purgeCache = async () => {
    await Axios.post(
      `${API_URL}/products/secret-reset`,
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    )
  }
  return (
    <AppBar {...props} elevation={1}>
      <Typography
        variant="h6"
        color="inherit"
        className={classes.title}
        id="react-admin-title"
      />
      <Typography style={{ textAlign: "center", flex: 1 }}>
        dropshipping sa
      </Typography>
      <div className={classes.spacer}>
        <IconButton onClick={purgeCache} color="inherit">
          <DeleteIcon />
        </IconButton>
      </div>
    </AppBar>
  )
}

export default MyAppBar
