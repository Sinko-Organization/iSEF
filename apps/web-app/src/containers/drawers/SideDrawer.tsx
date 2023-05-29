import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import FactCheckIcon from "@mui/icons-material/FactCheck";
import MenuIcon from "@mui/icons-material/Menu";
import SchoolIcon from "@mui/icons-material/School";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import * as React from "react";

const drawerWidth = 240;

interface Props {
  window?: () => Window;
  children: React.ReactNode;
}

type Path = {
  name: string;
  link: string;
  icon: React.ReactNode;
};

const paths: Path[] = [
  {
    name: "Dashboard",
    link: "/dashboard",
    icon: <SchoolIcon />,
  },
  {
    name: "Honor's List",
    link: "/honors-list",
    icon: <FactCheckIcon />,
  },
];

const systemPaths: Path[] = [
  {
    name: "Import",
    link: "/import",
    icon: <CloudUploadIcon />,
  },
];

export default function ResponsiveDrawer({ window, children }: Props) {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <Toolbar>
        <div>
          <Image
            src="/images/isef-logo.png"
            alt="LOGO"
            width={200}
            height={200}
          />
        </div>
      </Toolbar>
      <Divider
        className="font-bold"
        style={{ fontFamily: "Times New Roman", letterSpacing: "1px" }}
      >
        ISEF
      </Divider>

      <List>
        {paths.map((path, index) => (
          <Link href={path.link} className="sidebar-link" key={index}>
            <ListItemButton>
              <ListItemIcon>{path.icon}</ListItemIcon>

              <ListItemText primary={path.name} />
            </ListItemButton>
          </Link>
        ))}
      </List>

      <Divider />
      <List>
        {systemPaths.map((systemPath, index) => (
          <ListItemButton key={index}>
            <ListItemIcon>{systemPath.icon}</ListItemIcon>
            <Link href={systemPath.link} className="sidebar-link">
              <ListItemText
                primary={systemPath.name}
                style={{ fontFamily: "Times New Roman" }}
              />
            </Link>
          </ListItemButton>
        ))}
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box className="flex">
      <CssBaseline />
      <AppBar
        position="fixed"
        className="w-full"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Typography
          variant="h6"
          noWrap
          component="div"
          style={{ backgroundColor: "#9078b6" }}
        >
          <Toolbar className="toolbar">
            <Typography
              variant="h6"
              noWrap
              className="flex-grow"
              style={{ fontFamily: "Times New Roman", letterSpacing: "2px" }}
            >
              INTELLIGENT STUDENTS E-FOLDERS
            </Typography>
            <Typography style={{ fontFamily: "Times New Roman" }}>
              <button onClick={() => signOut()}>Log Out</button>
            </Typography>
          </Toolbar>
        </Typography>
      </AppBar>
      <Box
        component="nav"
        className="w-full sm:w-auto sm:flex-shrink-0"
        aria-label="mailbox folders"
      >
        <Drawer variant="permanent" className="hidden sm:block" open>
          {drawer}
        </Drawer>
      </Box>
      <Box component="main" className="flex-grow p-1 ml-64">
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}
