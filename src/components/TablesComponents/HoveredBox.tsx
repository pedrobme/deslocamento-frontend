import { useState } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Client } from "@/types/Clients";
import Link from "next/link";
import { Driver } from "@/types/Drivers";
import { Vehicle } from "@/types/Vehicles";
import { Displacement } from "@/types/Displacements";
import {
	isClient,
	isDisplacement,
	isDriver,
	isVehicle,
} from "@/utils/TypeGuards";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import DirectionsIcon from "@mui/icons-material/Directions";
import PersonIcon from "@mui/icons-material/Person";
import AirlineSeatReclineNormalIcon from "@mui/icons-material/AirlineSeatReclineNormal";

const HoverBox = ({
	data,
	index,
}: {
	data: Client[] | Driver[] | Vehicle[] | Displacement[];
	index: number;
}) => {
	const [isHovered, setIsHovered] = useState(false);

	const boxStyles = {
		backgroundColor: isHovered ? "gray" : "initial",
		transition: "background-color 0.3s ease-in-out",
		cursor: "pointer",
		borderRadius: "20px",
		padding: "5px",
	};

	const handleMouseEnter = () => {
		setIsHovered(true);
	};

	const handleMouseLeave = () => {
		setIsHovered(false);
	};

	return (
		<Link
			href={`/clients/${data[index].id}`}
			style={{ textDecoration: "none", color: "inherit" }}
		>
			<Box
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				style={boxStyles}
				display="flex"
				flexDirection="column"
				justifyContent="center"
				alignItems="center"
			>
				{isClient(data[index]) && (
					<>
						<PersonIcon />
						<Typography sx={{ fontSize: "13px" }}>
							Detalhes do Cliente
						</Typography>
					</>
				)}
				{isDriver(data[index]) && (
					<>
						<AirlineSeatReclineNormalIcon />
						<Typography sx={{ fontSize: "13px" }}>
							Detalhes do Condutor
						</Typography>
					</>
				)}
				{isVehicle(data[index]) && (
					<>
						<DirectionsCarIcon />
						<Typography sx={{ fontSize: "13px" }}>
							Detalhes do Veículo
						</Typography>
					</>
				)}
				{isDisplacement(data[index]) && (
					<>
						<DirectionsIcon />
						<Typography sx={{ fontSize: "13px" }}>
							Detalhes do Deslocamento
						</Typography>
					</>
				)}
			</Box>
		</Link>
	);
};

export default HoverBox;
