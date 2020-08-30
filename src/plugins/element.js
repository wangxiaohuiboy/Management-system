import Vue from 'vue'

import { Button, Form, FormItem, Input, Message, Dropdown, DropdownMenu, DropdownItem,Menu,MenuItem,MenuItemGroup,Submenu,Table,TableColumn,Pagination} from 'element-ui'

Vue.use(Button).use(Form).use(FormItem).use(Input).use(Dropdown).use(DropdownMenu).use(DropdownItem).use(Menu).use(MenuItem).use(MenuItemGroup).use(Submenu).use(Table).use(TableColumn).use(Pagination)

Vue.prototype.$message = Message;
