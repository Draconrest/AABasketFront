// assets
import { ProjectOutlined, FundViewOutlined } from '@ant-design/icons';

// icons
const icons = {
  ProjectOutlined,
  FundViewOutlined
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const user = {
  id: 'users-group',
  title: 'Administración de Usuarios',
  type: 'group',
  children: [
    {
      id: 'viewUsers',
      title: 'Ver Usuarios',
      type: 'item',
      url: '/users/view',
      icon: icons.FundViewOutlined,
      breadcrumbs: false
    },
    {
      id: 'newUser',
      title: 'Agregar Usuario',
      type: 'item',
      url: '/users/new',
      icon: icons.ProjectOutlined,
      breadcrumbs: false
    }
  ]
};

export default user;
