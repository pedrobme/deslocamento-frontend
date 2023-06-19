import { useState } from "react";
import PersonIcon from "@mui/icons-material/Person";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Client } from "@/types/Clients";
import Link from "next/link";

const HoverBox = ({
	clientsData,
	index,
}: {
	clientsData: Client[];
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
			href={`/clients/${clientsData[index].id}`}
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
				<Typography>Detalhes do cliente</Typography>
			</Box>
		</Link>
	);
};

export default HoverBox;
