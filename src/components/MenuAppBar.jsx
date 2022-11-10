import { AppBar, Toolbar, Typography, IconButton, ThemeProvider, Drawer, List, ListItem, ListItemIcon, ListItemText, Divider } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import PersonIcon from '@mui/icons-material/Person';
import TaskIcon from '@mui/icons-material/Task';
import CloseIcon from '@mui/icons-material/Close';
import theme from "./Theme"
import { Link } from "react-router-dom";
import { useState } from "react";

function MenuAppBar() {
    const [openMenu, setOpenMenu] = useState(false);

    const handleOpenMenu = () => {
        setOpenMenu(true);
    }

    const handleCloseMenu = () => {
        setOpenMenu(false);
    }

    return(
        <>
            <ThemeProvider theme={theme}>
                <AppBar position="static" className="appBar">
                    <Toolbar variant="dense">
                        <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleOpenMenu}>
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" color="inherit" component="div">
                            App
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Drawer
                    anchor='left'
                    open={openMenu}
                    onClose={handleCloseMenu}
                    PaperProps={{
                        sx: {
                          background: '#424242',
                          width: '20%'
                        }
                    }}
                >
                    <IconButton onClick={handleCloseMenu} className="closeButton">
                        <CloseIcon color="background" />
                    </IconButton>
                    <List>
                        <ListItem button component={Link} to="/users">
                            <ListItemIcon>
                                <PersonIcon color="background"/>
                            </ListItemIcon>
                            <ListItemText primary="Users" className="whiteText"/>
                        </ListItem>
                        <Divider />
                        <ListItem button component={Link} to="/tasks">
                            <ListItemIcon>
                                <TaskIcon color="background"/>
                            </ListItemIcon>
                            <ListItemText primary="Tasks" className="whiteText"/>
                        </ListItem>
                    </List>
                </Drawer>
            </ThemeProvider>
        </>
    );
}

export default MenuAppBar;