// assets
import { UserOutlined } from '@ant-design/icons';

// icons
const icons = {
  UserOutlined
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const user = {
  id: 'users-group',
  title: 'Administración de deportistas',
  type: 'group',
  children: [
    {
      id: 'viewUsers',
      title: 'Ver deportistas activos',
      type: 'item',
      url: '/users/view',
      icon: icons.UserOutlined,
      breadcrumbs: false
    }
  ]
};

export default user;
