import { useState } from "react";
import { Drawer, IconButton, List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";

export default function Navigation() {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    return (
        <>
            <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={() => setOpen(true)}>
                    
                <MenuIcon />
            </IconButton>

            <Drawer anchor="left" open={open} onClose={() => setOpen(false)}>
                <List sx={{ width: 200 }}>
                    <ListItem disablePadding>
                        <ListItemButton onClick={() => navigate("/customers")}>
                            <ListItemText primary="Customers" />
                        </ListItemButton>
                    </ListItem>

                    <ListItem disablePadding>
                        <ListItemButton onClick={() => navigate("/trainings")}>
                            <ListItemText primary="Trainings" />
                        </ListItemButton>
                    </ListItem>

                    <ListItem disablePadding>
                        <ListItemButton onClick={() => navigate("/calendar")}>
                            <ListItemText primary="Calendar" />
                        </ListItemButton>
                    </ListItem>

                    <ListItem disablePadding>
                        <ListItemButton onClick={() => navigate("/statistics")}>
                            <ListItemText primary="Statistics" />
                        </ListItemButton>
                    </ListItem>
                </List>
            </Drawer>
        </>
    );
}