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

import AddRawMaterial from './AddRawMaterial';
import RawMaterialInfo from './RawMaterialInfo';
import SupplierDashboard from '../../main_dashboard/views/Dashboard/Dashboard';
import UserProfile from '../../main_dashboard/views/UserProfile/UserProfile';
import Maps from "../../main_dashboard/views/Maps/Maps.js";

import ViewRawMaterials from './ViewRawMaterials';
import ViewTransactions from '../Transactions/ViewTransactions';
import ViewRequests from '../Events/ViewRequests';

// import routes from './ownerRoutes.js';

let ps;

const routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: Dashboard,
    component: SupplierDashboard,
    layout: "/supplier"
  },
  {
    path: "/add-raw-material",
    name: "Add Raw Material",
    icon: AddItem,
    component: AddRawMaterial,
    layout: "/supplier"
  },
  {
    path: "/view-raw-materials",
    name: "View Raw Material",
    icon: ViewItem,
    component: ViewRawMaterials,
    layout: "/supplier"
  },
  {
    path: "/user",
    name: "User Profile",
    icon: Person,
    component: UserProfile,
    layout: "/supplier"
  },
  {
    path: "/maps",
    name: "Maps",
    icon: LocationOn,
    component: Maps,
    layout: "/supplier"
  },
];

const useStyles = makeStyles(styles);

export default function Supplier({ ...rest }) {
  const switchRoutes = (
    <Switch>
      {routes.map((prop, key) => {
        if (prop.layout === "/supplier") {
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
      <Route exact path="/supplier/view-raw-material/:id" component={RawMaterialInfo} />
      <Route exact path="/supplier/view-transaction/:id" component={ViewTransactions} />
      <Route exact path="/supplier/view-request/:id" component={ViewRequests} />
      <Redirect from="/supplier" to="/supplier/dashboard" />
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
    return window.location.pathname !== "/supplier/maps";
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
        logoText={"Supplier"}
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

