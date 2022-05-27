import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import Navbar from '../../main_dashboard/components/Navbars/Navbar';
import Sidebar from "../../main_dashboard/components/Sidebar/Sidebar.js";

import styles from '../../main_dashboard/assets/jss/material-dashboard-react/layouts/adminStyle.js'
import bgImage from "../../main_dashboard/assets/img/sidebar-2.jpg";
import logo from "../../main_dashboard/assets/img/reactlogo.png";

import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import LocationOn from "@material-ui/icons/LocationOn";
import AddItem from "@material-ui/icons/AddBox";
import ViewItem from "@material-ui/icons/ViewList";
import ViewTrans from "@material-ui/icons/Visibility";

import CreateMedicine from './CreateMedicine';
import ReceivedRawMaterial from './ReceivedRawMaterial';
import ViewReceivedRawMat from './ViewReceivedRawMat';
import ReceiveProduct from './ReceiveProduct';
import ViewResponses from '../Events/ViewResponses';
import ViewRequests from '../Events/ViewRequests';
import RequestProductManufacturer from './RequestProduct';
import ViewMedicines from './ViewMedicines';
import MedicineInfo from './MedicineInfo';
import ViewTransactions from '../Transactions/ViewTransactions';

import ManufacturerDashboard from '../../main_dashboard/views/Dashboard/Dashboard';
import UserProfile from '../../main_dashboard/views/UserProfile/UserProfile';
import Maps from "../../main_dashboard/views/Maps/Maps.js";

// import routes from './ownerRoutes.js';

let ps;

const routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: Dashboard,
    component: ManufacturerDashboard,
    layout: "/manufacturer"
  },
  {
    path: "/create-medicine",
    name: "Create Medicine",
    icon: AddItem,
    component: CreateMedicine,
    layout: "/manufacturer"
  },
  {
    path: "/view-raw-materials",
    name: "View Raw Materials",
    icon: ViewItem,
    component: ViewReceivedRawMat,
    layout: "/manufacturer"
  },
  {
    path: "/request-product",
    name: "Request Product",
    icon: ViewItem,
    component: RequestProductManufacturer,
    layout: "/manufacturer"
  },
  {
    path: "/receive-product",
    name: "Receive Product",
    icon: ViewTrans,
    component: ReceiveProduct,
    layout: "/manufacturer"
  },
  {
    path: "/view-responses",
    name: "View Response",
    icon: ViewTrans,
    component: ViewResponses,
    layout: "/manufacturer"
  },
  {
    path: "/view-medicines",
    name: "View Medicines",
    icon: ViewItem,
    component: ViewMedicines,
    layout: "/manufacturer"
  },
  {
    path: "/user",
    name: "User Profile",
    icon: Person,
    component: UserProfile,
    layout: "/manufacturer"
  },
  {
    path: "/maps",
    name: "Maps",
    icon: LocationOn,
    component: Maps,
    layout: "/manufacturer"
  },
];

const useStyles = makeStyles(styles);

export default function Manufacturer({ ...rest }) {
  const switchRoutes = (
    <Switch>
      {routes.map((prop, key) => {
        if (prop.layout === "/manufacturer") {
          return (
            <Route
              path={prop.layout + prop.path}
              render={() => (
                <prop.component account={rest.account} supplyChain={rest.supplyChain} web3={rest.web3} />
              )}
              key={key}
            />
          );
        }
        return null;
      })}
      <Route exact path="/manufacturer/view-raw-material/:id" component={ReceivedRawMaterial} />
      <Route exact path="/manufacturer/view-medicine/:id" component={MedicineInfo} />
      <Route exact path="/manufacturer/view-transaction/:id" component={ViewTransactions} />
      <Route exact path="/manufacturer/view-request/:id" component={ViewRequests} />
      <Redirect from="/manufacturer" to="/manufacturer/dashboard" />
    </Switch>
  );
  const classes = useStyles();
  const mainPanel = React.createRef();

  const [ image, setImage ] = React.useState(bgImage);
  const [ color, setColor ] = React.useState("blue");
  const [ fixedClasses, setFixedClasses ] = React.useState("dropdown show");
  const [ mobileOpen, setMobileOpen ] = React.useState(false);
  const handleImageClick = image => {
    setImage(image);
  };
  const handleColorClick = color => {
    setColor(color);
  };
  const handleFixedClick = () => {
    if (fixedClasses === "dropdown") {
      setFixedClasses("dropdown show");
    } else {
      setFixedClasses("dropdown");
    }
  };
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const getRoute = () => {
    return window.location.pathname !== "/manufacturer/maps";
  };
  const resizeFunction = () => {
    if (window.innerWidth >= 960) {
      setMobileOpen(false);
    }
  };

  React.useEffect(() => {
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(mainPanel.current, {
        suppressScrollX: true,
        suppressScrollY: false
      });
      document.body.style.overflow = "hidden";
    }
    window.addEventListener("resize", resizeFunction);

    return function cleanup() {
      if (navigator.platform.indexOf("Win") > -1) {
        ps.destroy();
      }
      window.removeEventListener("resize", resizeFunction);
    };
  }, [ mainPanel ]);

  return (
    <div className={classes.wrapper}>
      <Sidebar
        routes={routes}
        logoText={"Manufacturer"}
        logo={logo}
        image={image}
        handleDrawerToggle={handleDrawerToggle}
        open={mobileOpen}
        color={color}
        {...rest}
      />
      <div className={classes.mainPanel} ref={mainPanel}>
        <Navbar
          routes={routes}
          handleDrawerToggle={handleDrawerToggle}
          {...rest}
        />

        {getRoute() ? (
          <div className={classes.content}>
            <div className={classes.container}>{switchRoutes}</div>
          </div>
        ) :
          (
            <div className={classes.map}>{switchRoutes}</div>
          )
        }
      </div>
    </div>
  );
}