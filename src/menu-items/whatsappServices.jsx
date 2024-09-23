// assets
import { WhatsAppOutlined } from '@ant-design/icons';

// icons
const icons = {
  WhatsAppOutlined
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const whatsappServices = {
  id: 'whatsapp-group',
  title: 'Servicios de WhatsApp',
  type: 'group',
  children: [
    {
      id: 'sendMessages',
      title: 'Envia mensaje',
      type: 'item',
      url: '/whatsapp/message',
      icon: icons.WhatsAppOutlined,
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

export default whatsappServices;
