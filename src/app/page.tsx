"use client";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grow from "@mui/material/Grow";
import { useTheme } from "@mui/material/styles";
import { Zoom } from "@mui/material";

export default function Home() {
	const theme = useTheme();
	return (
		<Box
			sx={{
				bgcolor: theme.palette.mode === "dark" ? "#1d1d1d" : "#dbdbdb",
				height: "85vh",
				display: "flex",
				flexDirection: "column",
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			<Grow in={true}>
				<Typography
					variant="h2"
					gutterBottom
					sx={{ display: { xs: "none", md: "initial" }, width: "50%" }}
				>
					Bem vindo a plataforma de controle da Deslocamento!
				</Typography>
			</Grow>
			<Grow in={true}>
				<Typography
					variant="h4"
					textAlign="center"
					gutterBottom
					sx={{ display: { xs: "initial", md: "none" }, width: "50%" }}
				>
					Bem vindo a plataforma de controle da Deslocamento!
				</Typography>
			</Grow>
			<Zoom in={true} style={{ transitionDelay: "500ms" }}>
				<Typography variant="subtitle1" gutterBottom sx={{ width: "50%" }}>
					Aqui você encontra, publica e altera qualquer informação relacionada a
					clientes, condutores, veículos e muito mais.
				</Typography>
			</Zoom>
		</Box>
	);
}
