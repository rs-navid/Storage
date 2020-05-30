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
} from "@fortawesome/free-solid-svg-icons";

const menu = [
  {
    id: 100,
    text: "تنظیمات",
    icon: faCog,
    path: "/setting",
  },
  {
    id: 120,
    text: "تنظیمات پیشرفته",
    icon: faSlidersH,
    path: "/advancesetting",
    isHidden: true,
  },
  {
    id: 300,
    text: "مدیریت دوره ها",
    icon: faHistory,
    path: "/periods",
  },
  {
    id: 200,
    text: "مدیریت کاربران",
    icon: faUsers,
    path: "/users",
  },
  {
    id: 400,
    text: "مدیریت مشتریان",
    icon: faRestroom,
    path: "/clients",
  },
  {
    type: "sep",
    container: [100, 120, 200, 300, 400],
  },
  {
    id: 500,
    text: "مدیریت آزمون ها",
    icon: faVial,
    path: "/exams",
  },
  {
    id: 550,
    text: "مدیریت روش های آزمون",
    icon: faVials,
    path: "/methods",
  },
  {
    id: 600,
    text: "مدیریت درخواست ها",
    icon: faCopy,
    path: "/requests",
  },
  {
    type: "sep",
    container: [500, 550, 600],
  },
  {
    id: 700,
    text: "نتایج میکروبی",
    icon: faFlask,
    path: "/microbilaresults",
    search: "type=1&title=میکروبی",
  },
  {
    id: 710,
    text: "نتایج شیمیایی",
    icon: faFlask,
    path: "/chemicalresults",
    search: "type=2&title=شیمیایی",
  },
  {
    id: 720,
    text: "نتایج سلولزی",
    icon: faFlask,
    path: "/celluloseresults",
    search: "type=3&title=سلولزی",
  },
  {
    id: 730,
    text: "نتایج بسته بندی",
    icon: faFlask,
    path: "/packingresults",
    search: "type=4&title=بسته بندی",
  },
  {
    id: 740,
    text: "نتایج محیط زیست",
    icon: faFlask,
    path: "/environmentresults",
    search: "type=5&title=محیط زیست",
  },
  {
    id: 750,
    text: "مدیریت نتایج",
    icon: faStickyNote,
    path: "/resultsmanagement",
  },
  {
    type: "sep",
    container: [700, 710, 720, 730, 740, 750],
  },
];

export default menu;
