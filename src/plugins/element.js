import Vue from 'vue'

import { Button, Form, FormItem, Input, Message, Dropdown, DropdownMenu, DropdownItem,Menu,MenuItem,MenuItemGroup,Submenu,Table,TableColumn,Pagination,Select,Option,Switch,Checkbox,CheckboxGroup,Upload,Dialog} from 'element-ui'

Vue.use(Button).use(Form).use(FormItem).use(Input).use(Dropdown).use(DropdownMenu).use(DropdownItem).use(Menu).use(MenuItem).use(MenuItemGroup).use(Submenu).use(Table).use(TableColumn).use(Pagination).use(Select).use(Option).use(Switch).use(Checkbox).use(CheckboxGroup).use(Upload).use(Dialog)


Vue.prototype.$message = Message;
