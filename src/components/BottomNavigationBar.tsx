import * as React from "react";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import Paper from "@mui/material/Paper";
import { NavigationOptions } from "@/types/NavigationOptions";
import { useRouter } from "next/navigation";
import ThermostatIcon from "@mui/icons-material/Thermostat";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import DirectionsIcon from "@mui/icons-material/Directions";
import PersonIcon from "@mui/icons-material/Person";
import AirlineSeatReclineNormalIcon from "@mui/icons-material/AirlineSeatReclineNormal";

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

export default function FixedBottomNavigation() {
	const currentPage = window.location.pathname.split("/").pop();
	const currentPageIndex = pagesLabels.findIndex(
		(page) => page.path === `/${currentPage}`
	);

	const [value, setValue] = React.useState(currentPageIndex);
	const ref = React.useRef<HTMLDivElement>(null);

	const router = useRouter();

	return (
		<Box sx={{ pb: 7 }} ref={ref}>
			<Paper
				elevation={10}
				sx={{
					width: "100vw",
					overflow: "scroll",
					position: "fixed",
					bottom: 0,
					left: 0,
				}}
			>
				<BottomNavigation
					showLabels
					value={value}
					onChange={(event, newValue) => {
						setValue(newValue);
					}}
					sx={{
						minWidth: "fit-content",
						display: "flex",
						justifyContent: "space-around",

						paddingInline: "35px",
					}}
				>
					{pagesLabels.map((pageLabel) => (
						<BottomNavigationAction
							label={pageLabel.menuTag}
							icon={pageLabel.icon}
							sx={{ minWidth: "fit-content" }}
							onClick={() => {
								router.push(pageLabel.path);
							}}
						/>
					))}
				</BottomNavigation>
			</Paper>
		</Box>
	);
}
