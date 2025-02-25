import { useState } from "react";
import { Drawer, List, ListItemButton, ListItemText, ListItemIcon, Collapse } from "@mui/material";
import { Home, AccountBalanceWallet, Info, ExpandLess, ExpandMore, ListAlt, AddCircleOutline } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Navbar = () => {
    const { t } = useTranslation();
    const [openCurrentAccount, setOpenCurrentAccount] = useState(false);

    return (
        <Drawer
            variant="permanent"
            anchor="left"
            sx={{
                width: 200,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: 200,
                    backgroundColor: "#1e293b",
                    color: "white",
                    boxShadow: "2px 0 10px rgba(0, 0, 0, 0.2)"
                }
            }}
        >
            <List>
                {/* Ana Sayfa */}
                <ListItemButton component={Link} to="/" sx={{ '&:hover': { backgroundColor: "#334155" } }}>
                    <ListItemIcon>
                        <Home sx={{ color: "white" }} />
                    </ListItemIcon>
                    <ListItemText primary={t("home")} sx={{ '& span': { fontSize: "0.9rem", fontWeight: 500 } }} />
                </ListItemButton>

                {/* Cari İşlemler - Ana Başlık */}
                <ListItemButton onClick={() => setOpenCurrentAccount(!openCurrentAccount)} sx={{ '&:hover': { backgroundColor: "#334155" } }}>
                    <ListItemIcon>
                        <AccountBalanceWallet sx={{ color: "white" }} />
                    </ListItemIcon>
                    <ListItemText primary={t("currentAccount")} sx={{ '& span': { fontSize: "0.9rem", fontWeight: 500 } }} />
                    {openCurrentAccount ? <ExpandLess sx={{ color: "white" }} /> : <ExpandMore sx={{ color: "white" }} />}
                </ListItemButton>

                {/* Cari İşlemler - Alt Menü */}
                <Collapse in={openCurrentAccount} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <ListItemButton component={Link} to="/current-account/create" sx={{ pl: 4, '&:hover': { backgroundColor: "#334155" } }}>
                            <ListItemIcon>
                                <AddCircleOutline sx={{ color: "white" }} />
                            </ListItemIcon>
                            <ListItemText primary={t("newCurrentAccount")} sx={{ '& span': { fontSize: "0.85rem", fontWeight: 400 } }} />
                        </ListItemButton>

                        <ListItemButton component={Link} to="/current-account/list" sx={{ pl: 4, '&:hover': { backgroundColor: "#334155" } }}>
                            <ListItemIcon>
                                <ListAlt sx={{ color: "white" }} />
                            </ListItemIcon>
                            <ListItemText primary={t("currentAccountList")} sx={{ '& span': { fontSize: "0.85rem", fontWeight: 400 } }} />
                        </ListItemButton>
                    </List>
                </Collapse>

                {/* Hakkında */}
                <ListItemButton component={Link} to="/about" sx={{ '&:hover': { backgroundColor: "#334155" } }}>
                    <ListItemIcon>
                        <Info sx={{ color: "white" }} />
                    </ListItemIcon>
                    <ListItemText primary={t("about")} sx={{ '& span': { fontSize: "0.9rem", fontWeight: 500 } }} />
                </ListItemButton>
            </List>
        </Drawer>
    );
};

export default Navbar;
