import {
  faCog,
  faSlidersH,
  faUsers,
  faHistory,
  faVial,
  faVials,
  faCopy,
  faRestroom,
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
];


export default menu;