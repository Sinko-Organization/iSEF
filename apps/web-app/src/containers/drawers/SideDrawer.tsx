import DashboardIcon from "@mui/icons-material/Dashboard";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import InboxIcon from "@mui/icons-material/MoveToInbox";
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
import Image from "next/image";
import Link from "next/link";
import * as React from "react";

const drawerWidth = 240;

interface Props {
  window?: () => Window;
  children: React.ReactNode;
}

const paths = [
  {
    name: "Dashboard",
    link: "/dashboard",
  },
  {
    name: "Honor's List",
    link: "/honors-list",
  },
  {
    name: "Courses",
    link: "/courses",
  },
  {
    name: "Grades",
    link: "/grades",
  },
];

const systemPaths = [
  {
    name: "Import",
    link: "/import",
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
            width={270}
            height={275}
          />
        </div>
      </Toolbar>
      <Divider>ISEF</Divider>

      <List>
        {paths.map((path, index) => (
          <ListItemButton key={index}>
            <ListItemIcon>
              {index % 2 === 0 ? <DashboardIcon /> : <FormatListBulletedIcon />}
            </ListItemIcon>
            <Link href={path.link} className="sidebar-link">
              <ListItemText primary={path.name} />
            </Link>
          </ListItemButton>
        ))}
      </List>

      <Divider />
      <List>
        {systemPaths.map((systemPath, index) => (
          <ListItemButton key={index}>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <Link href={systemPath.link} className="sidebar-link">
              <ListItemText primary={systemPath.name} />
            </Link>
          </ListItemButton>
        ))}
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Typography
          variant="h6"
          noWrap
          component="div"
          fontFamily="Raleway"
          style={{ backgroundColor: "#653780" }}
        >
          <Toolbar className="toolbar">
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: "none" } }}
            >
              <MenuIcon />
            </IconButton>
            INTELLIGENT STUDENTS E-FOLDERS
          </Toolbar>
        </Typography>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>

        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}
