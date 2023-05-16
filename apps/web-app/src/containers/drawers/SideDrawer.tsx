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
            width={270}
            height={275}
          />
        </div>
      </Toolbar>
      <Divider className="font-bold">ISEF</Divider>

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
          style={{ backgroundColor: "#9078b6" }}
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
            {/* Intelligent Students E - Folders */}
            INTELLIGENT STUDENTS E-FOLDERS
            {/*LOG OUT BUTTON*/}
            <Box sx={{ display: "flex", marginLeft: 90 }}>
              <Typography>
                <button onClick={() => signOut()}>Log Out</button>
              </Typography>
            </Box>
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
