import {
  faCog,
  faSlidersH,
  faUsers,
  faHistory,
  faVial,
  faVials,
  faCopy,
  faRestroom,
  faFlask,
  faStickyNote,
  faFileInvoiceDollar,
  faBoxOpen,
  faPrint,
  faDoorOpen
} from "@fortawesome/free-solid-svg-icons";

const menu = [
  {
    id: 25,
    text: "تنظیمات",
    icon: faCog,
    path: "/setting",
  },
  // {
  //   id: 120,
  //   text: "تنظیمات پیشرفته",
  //   icon: faSlidersH,
  //   path: "/advancesetting",
  //   isHidden: true,
  // },
  {
    id: 30,
    text: "مدیریت دوره ها",
    icon: faHistory,
    path: "/periods",
  },
  {
    id: 50,
    text: "مدیریت کاربران",
    icon: faUsers,
    path: "/users",
  },
  {
    id: 60,
    text: "مدیریت مشتریان",
    icon: faRestroom,
    path: "/clients",
  },
  {
    id: 70,
    text: "مدیریت بسته بندی ها",
    icon: faBoxOpen,
    path: "/packs",
  },
  {
    id: 80,
    text: "مدیریت انبارها",
    icon: faDoorOpen,
    path: "/storages",
  },
  {
    type: "sep",
    container: [25, 50, 60, 70, 80],
  },
  // {
  //   id: 500,
  //   text: "مدیریت آزمون ها",
  //   icon: faVial,
  //   path: "/exams",
  // },
  // {
  //   id: 550,
  //   text: "مدیریت روش های آزمون",
  //   icon: faVials,
  //   path: "/methods",
  // },
  // {
  //   id: 600,
  //   text: "مدیریت درخواست ها",
  //   icon: faCopy,
  //   path: "/requests",
  // },
  // {
  //   type: "sep",
  //   container: [500, 550, 600],
  // },
  // {
  //   id: 700,
  //   text: "نتایج میکروبی",
  //   icon: faFlask,
  //   path: "/microbilaresults",
  //   search: "type=1&title=میکروبی",
  // },
  // {
  //   id: 710,
  //   text: "نتایج شیمیایی",
  //   icon: faFlask,
  //   path: "/chemicalresults",
  //   search: "type=2&title=شیمیایی",
  // },
  // {
  //   id: 720,
  //   text: "نتایج سلولزی",
  //   icon: faFlask,
  //   path: "/celluloseresults",
  //   search: "type=3&title=سلولزی",
  // },
  // {
  //   id: 730,
  //   text: "نتایج بسته بندی",
  //   icon: faFlask,
  //   path: "/packingresults",
  //   search: "type=4&title=بسته بندی",
  // },
  // {
  //   id: 740,
  //   text: "نتایج محیط زیست",
  //   icon: faFlask,
  //   path: "/environmentresults",
  //   search: "type=5&title=محیط زیست",
  // },
  // {
  //   id: 750,
  //   text: "مدیریت نتایج",
  //   icon: faStickyNote,
  //   path: "/resultsmanagement",
  // },
  // {
  //   type: "sep",
  //   container: [700, 710, 720, 730, 740, 750],
  // },
  // {
  //   id: 800,
  //   text: "مدیریت صورتحساب ها",
  //   icon: faFileInvoiceDollar,
  //   path: "/invoicemanagement",
  // },
  // {
  //   id: 850,
  //   text: "گزارش درخواست ها",
  //   icon: faPrint,
  //   path: "/requestsreport",
  // },
  // {
  //   id: 860,
  //   text: "گزارش نمونه ها",
  //   icon: faPrint,
  //   path: "/samplesreport",
  // },
  // {
  //   type: "sep",
  //   container: [800, 850, 860],
  // },
];

export default menu;
