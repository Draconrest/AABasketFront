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
  title: 'Administración de deportistas',
  type: 'group',
  children: [
    {
      id: 'viewUsers',
      title: 'Ver deportistas activos',
      type: 'item',
      url: '/users/view',
      icon: icons.FundViewOutlined,
      breadcrumbs: false
    }
  ]
};

export default user;
