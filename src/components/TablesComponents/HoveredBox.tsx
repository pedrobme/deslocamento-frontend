"use client";
import { useState } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Client } from "@/types/Clients";
import Link from "next/link";
import { Driver } from "@/types/Drivers";
import { Vehicle } from "@/types/Vehicles";
import { TransformedDisplacement } from "@/types/Displacements";
import {
	isClient,
	isDriver,
	isTransformedDisplacement,
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
	data: Client[] | Driver[] | Vehicle[] | TransformedDisplacement[];
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

	isClient(data[index]);

	const ClientHoverBox = (
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
				<PersonIcon />
				<Typography sx={{ fontSize: "13px" }}>Detalhes do Cliente</Typography>
			</Box>
		</Link>
	);

	const DriverHoverBox = (
		<Link
			href={`/drivers/${data[index].id}`}
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
				<AirlineSeatReclineNormalIcon />
				<Typography sx={{ fontSize: "13px" }}>Detalhes do Condutor</Typography>
			</Box>
		</Link>
	);
	const VehicleHoverBox = (
		<Link
			href={`/vehicles/${data[index].id}`}
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
				<DirectionsCarIcon />
				<Typography sx={{ fontSize: "13px" }}>Detalhes do Veículo</Typography>
			</Box>
		</Link>
	);
	const DisplacementHoverBox = (
		<Link
			href={`/displacements/${data[index].id}`}
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
				<DirectionsIcon />
				<Typography sx={{ fontSize: "13px" }}>
					Detalhes do Deslocamento
				</Typography>
			</Box>
		</Link>
	);

	return (
		<>
			{isClient(data[index]) && ClientHoverBox}
			{isDriver(data[index]) && DriverHoverBox}
			{isVehicle(data[index]) && VehicleHoverBox}
			{isTransformedDisplacement(data[index]) && DisplacementHoverBox}
		</>
	);
};

export default HoverBox;
