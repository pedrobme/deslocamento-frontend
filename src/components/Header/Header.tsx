"use client";
import ThemeSwitch from "../ThemeSwitcher";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import Link from "next/link";
import FixedBottomNavigation from "../BottomNavigationBar";
import { NavigationOptions } from "@/types/NavigationOptions";
import ThermostatIcon from "@mui/icons-material/Thermostat";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import DirectionsIcon from "@mui/icons-material/Directions";
import PersonIcon from "@mui/icons-material/Person";
import AirlineSeatReclineNormalIcon from "@mui/icons-material/AirlineSeatReclineNormal";

interface HeaderComponentInterface {
	toggleColorMode: () => void;
}

const pagesLabels: NavigationOptions = [
	{ path: "/clients", menuTag: "clientes", icon: <PersonIcon /> },
	{
		path: "/drivers",
		menuTag: "Condutores",
		icon: <AirlineSeatReclineNormalIcon />,
	},
	{ path: "/vehicles", menuTag: "Veículos", icon: <DirectionsCarIcon /> },
	{
		path: "/displacements",
		menuTag: "Deslocamentos",
		icon: <DirectionsIcon />,
	},
	{ path: "/weather", menuTag: "Previsão do tempo", icon: <ThermostatIcon /> },
];

export default function HeaderComponent({
	toggleColorMode,
}: HeaderComponentInterface) {
	return (
		<AppBar position="static" sx={{ marginBottom: "1rem" }}>
			<Container maxWidth="xl">
				<Toolbar disableGutters>
					<AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
					<Typography
						variant="h6"
						noWrap
						component="a"
						href="/"
						sx={{
							mr: 2,
							display: { xs: "none", md: "flex" },
							fontFamily: "monospace",
							fontWeight: 700,
							letterSpacing: ".3rem",
							color: "inherit",
							textDecoration: "none",
						}}
					>
						DESLOCAMENTO
					</Typography>
					<AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
					<Typography
						variant="h5"
						noWrap
						component="a"
						href="/"
						sx={{
							mr: 2,
							display: { xs: "flex", md: "none" },
							flexGrow: 1,
							fontSize: { xs: "0.5rem" },
							fontFamily: "monospace",
							fontWeight: 700,
							letterSpacing: ".3rem",
							color: "inherit",
							textDecoration: "none",
						}}
					>
						DESLOCAMENTO
					</Typography>
					<Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
						{pagesLabels.map((pageLabel) => (
							<Link href={`${pageLabel.path}`}>
								<Button
									key={pageLabel.menuTag}
									sx={{ my: 2, color: "white", display: "block" }}
								>
									{pageLabel.menuTag}
								</Button>
							</Link>
						))}
					</Box>

					<Box sx={{ flexGrow: 0 }}>
						<ThemeSwitch toggleColorMode={toggleColorMode} />
					</Box>
				</Toolbar>
			</Container>
		</AppBar>
	);
}
