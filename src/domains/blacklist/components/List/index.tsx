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
  BooleanField,
  TextInput,
  SelectInput,
} from "react-admin"
import IconEvent from "@material-ui/icons/Publish"
import Chip from "@material-ui/core/Chip"
import Axios from "axios"
import { API_URL } from "../../../../config/constants"
import Avatar from "@material-ui/core/Avatar"
import { makeStyles } from "@material-ui/core/styles"

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
    <TextInput label="Keyword" source="keyword" alwaysOn />
  </Filter>
)

export const KeywordList: FC = (props) => {
  return (
    <List
      {...props}
      pagination={<PostPagination />}
      filters={<BlacklistFilter />}
      hasCreate
      perPage={25}
    >
      <Datagrid rowClick="edit">
        <TextField source="id" />
        <TextField source="keyword" />
      </Datagrid>
    </List>
  )
}
