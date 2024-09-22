// project import
import dashboard from './dashboard';
import pages from './page';
import utilities from './utilities';
//import support from './support';
import user from './user';
import whatsappServices from './whatsappServices';
import billingServices from './billing';

// ==============================|| MENU ITEMS ||============================== //

const menuItems = {
  items: [user, whatsappServices, billingServices, dashboard, pages, utilities /*  support */]
};

export default menuItems;
