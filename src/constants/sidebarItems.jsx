import {
  MdDashboard,
  MdSearch,
  MdCampaign,
  MdSettings,
} from "react-icons/md";

const sidebarItems = [
  {
    title: "Dashboard",
    icon: <MdDashboard size={22} />,
    path:'/'
  },
  {
    title: "Search Leads",
    icon: <MdSearch size={22} />,
    path:'/search-leads'
  },
  {
    title: "Campaigns",
    icon: <MdCampaign size={22} />,
    path:'/campaigns'
  },
  {
    title: "Settings",
    icon: <MdSettings size={22} />,
    
  },
];

export default sidebarItems;