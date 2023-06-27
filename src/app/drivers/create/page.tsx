"use client";
import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { Driver } from "@/types/Drivers";
import OutlinedInput from "@mui/material/OutlinedInput";
import SaveIcon from "@mui/icons-material/Save";
import axios from "axios";
import { useRouter } from "next/navigation";
import ResponsiveDateAndTimePickers from "@/components/TimePicker";
import dayjs from "dayjs";

const NewDriverPage = () => {
	const [newDriverData, setNewDriverData] = React.useState<Omit<Driver, "id">>({
		nome: "",
		numeroHabilitacao: "",
		catergoriaHabilitacao: "",
		vencimentoHabilitacao: "",
	});

	const [dateAndTime, setDateAndTime] = React.useState({ date: "", time: "" });

	const handleInputChange = (
		event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
		field: keyof Omit<Driver, "id">
	) => {
		setNewDriverData((prevData) => ({
			...prevData,
			[field]: event.target.value,
		}));
	};

	const handleDateAndTimeChange = (
		event: dayjs.Dayjs | null,
		field: "date" | "time"
	) => {
		setDateAndTime((prevData) => ({
			...prevData,
			[field]: event,
		}));

		const newDateAndTimeState = { ...dateAndTime, [field]: event };
		const formattedDate = dayjs(newDateAndTimeState.date).format("YYYY-MM-DD");
		const formattedTime = dayjs(newDateAndTimeState.time).format(
			"HH:mm:ss.SSS"
		);

		const toLoadDateAndTime = `${formattedDate}T${formattedTime}Z`;
		setNewDriverData({
			...newDriverData,
			["vencimentoHabilitacao"]: toLoadDateAndTime,
		});
	};

	const router = useRouter();

	const createNewDriver = async (newDriverData: Omit<Driver, "id">) => {
		try {
			let { catergoriaHabilitacao, ...newDriverBody } = newDriverData;
			newDriverBody.categoriaHabilitacao = catergoriaHabilitacao;
			console.log("novoojb", newDriverData);

			const response = await axios.post(
				`https://api-deslocamento.herokuapp.com/api/v1/Condutor`,
				newDriverBody
			);
			router.push("/drivers");
		} catch (error) {
			console.error("Error fetching data:", error);
		}
	};

	return (
		<div>
			<Card sx={{ minWidth: 275, width: "fit-content", margin: "auto" }}>
				<CardContent>
					<Typography
						sx={{ fontSize: 14, mb: "10px", textAlign: "center" }}
						color="text.secondary"
						gutterBottom
					>
						Detalhes do condutor
					</Typography>
					<Typography variant="h5" component="div" sx={{ mb: "20px" }}>
						Nome:{" "}
						<OutlinedInput
							style={{ width: "fit-content", height: "40px" }}
							onChange={(e) => handleInputChange(e, "nome")}
						></OutlinedInput>
					</Typography>
					<Typography variant="h5" component="div" sx={{ mb: "20px" }}>
						Categoria da habilitação:{" "}
						<OutlinedInput
							style={{ width: "fit-content", height: "40px" }}
							onChange={(e) => handleInputChange(e, "catergoriaHabilitacao")}
						></OutlinedInput>
					</Typography>
					<Typography variant="h5" component="div" sx={{ mb: "20px" }}>
						Número da habilitação:{" "}
						<OutlinedInput
							style={{ width: "fit-content", height: "40px" }}
							onChange={(e) => handleInputChange(e, "numeroHabilitacao")}
						></OutlinedInput>
					</Typography>

					<Typography variant="h5" component="div" sx={{ mb: "20px" }}>
						Data de vencimento:{" "}
						<ResponsiveDateAndTimePickers
							defaultValue={new Date(0)}
							type={"date"}
							handleDateAndTimeChange={handleDateAndTimeChange}
						/>
					</Typography>
					<Typography variant="h5" component="div" sx={{ mb: "20px" }}>
						Horário de vencimento:{" "}
						<ResponsiveDateAndTimePickers
							defaultValue={new Date(0)}
							type={"time"}
							handleDateAndTimeChange={handleDateAndTimeChange}
						/>
					</Typography>
				</CardContent>
				<Box sx={{ display: "flex", justifyContent: "flex-end" }}>
					<CardActions>
						<Button onClick={() => createNewDriver(newDriverData)} size="small">
							<SaveIcon sx={{ marginRight: "5px" }} />
							Salvar
						</Button>
					</CardActions>
				</Box>
			</Card>
		</div>
	);
};

export default NewDriverPage;
