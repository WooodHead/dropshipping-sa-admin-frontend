import { CategoryList } from "./components/List"
import { ModeratorCreate } from "./components/Create"
import { ModeratorEdit } from "./components/Edit"
import { CategoryShow } from "./components/Show"

export const usersResources = {
  list: CategoryList,
  show: CategoryShow,
  edit: ModeratorEdit,
  create: ModeratorCreate,
}
