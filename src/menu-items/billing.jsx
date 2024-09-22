// assets
import { ProjectOutlined, FundViewOutlined } from '@ant-design/icons';

// icons
const icons = {
  ProjectOutlined,
  FundViewOutlined
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const billingServices = {
  id: 'billing-group',
  title: 'Servicios de facturación',
  type: 'group',
  children: [
    {
      id: 'viewBilling',
      title: 'Ver facturas',
      type: 'item',
      url: '/billing/view',
      icon: icons.FundViewOutlined,
      breadcrumbs: false
    } /* 
    {
      id: 'Enviar mensaje a todos',
      title: 'Agregar deportista',
      type: 'item',
      url: '/users/new',
      icon: icons.ProjectOutlined,
      breadcrumbs: false
    } */
  ]
};

export default billingServices;
