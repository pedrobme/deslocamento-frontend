"use client";
import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Displacement } from "@/types/Displacements";
import SaveIcon from "@mui/icons-material/Save";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Client } from "@/types/Clients";
import { Driver } from "@/types/Drivers";
import { Vehicle } from "@/types/Vehicles";
import { SelectChangeEvent } from "@mui/material/Select";
import BasicSelect from "@/components/SelectInput";
import { OutlinedInput } from "@mui/material";
import dayjs from "dayjs";
import ResponsiveDateAndTimePickers from "@/components/TimePicker";

const NewDisplacementPage = () => {
	const [newDisplacementData, setNewDisplacementData] = React.useState<
		Omit<Displacement, "id" | "kmFinal" | "fimDeslocamento">
	>({
		kmInicial: 0,
		inicioDeslocamento: "",
		checkList: "",
		motivo: "",
		observacao: "",
		idCondutor: 0,
		idVeiculo: 0,
		idCliente: 0,
	});

	const [entriesArrays, setEntriesArrays] = React.useState({
		clientsEntries: [""],
		driversEntries: [""],
		vehiclesEntries: [""],
	});

	const [dateAndTime, setDateAndTime] = React.useState({ date: "", time: "" });

	console.log(entriesArrays);
	console.log(newDisplacementData);
	console.log(dateAndTime);

	const handleInputChange = (
		event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
		field: keyof Omit<Displacement, "id">
	) => {
		setNewDisplacementData((prevData) => ({
			...prevData,
			[field]: event.target.value,
		}));
	};

	const handleDateAndTimeChange = (
		event: Date | null,
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
		setNewDisplacementData({
			...newDisplacementData,
			["inicioDeslocamento"]: toLoadDateAndTime,
		});
	};

	React.useEffect(() => {
		const getEntriesArrays = async () => {
			try {
				const responseClients = axios.get(
					"https://api-deslocamento.herokuapp.com/api/v1/Cliente"
				);
				const responseDrivers = axios.get(
					"https://api-deslocamento.herokuapp.com/api/v1/Condutor"
				);
				const responseVehicles = axios.get(
					"https://api-deslocamento.herokuapp.com/api/v1/Veiculo"
				);

				const [clientsData, driversData, vehiclesData] = await Promise.all([
					responseClients,
					responseDrivers,
					responseVehicles,
				]);

				const clientsEntries: string[] = clientsData.data.map(
					(clientObj: Client) => {
						return `id:${clientObj.id} - nome:${clientObj.nome}`;
					}
				);
				const driversEntries: string[] = driversData.data.map(
					(driverObj: Driver) => {
						return `id:${driverObj.id} - nome:${driverObj.nome}`;
					}
				);
				const vehiclesEntries: string[] = vehiclesData.data.map(
					(vehicleObj: Vehicle) => {
						return `id:${vehicleObj.id} - placa:${vehicleObj.placa}`;
					}
				);

				setEntriesArrays({
					clientsEntries: clientsEntries,
					driversEntries: driversEntries,
					vehiclesEntries: vehiclesEntries,
				});
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};

		getEntriesArrays();

		const currentDateAndTime = new Date();
		const formattedDate = dayjs(currentDateAndTime).format("YYYY-MM-DD");
		const formattedTime = dayjs(currentDateAndTime).format("HH:mm:ss.SSS");

		const toLoadDateAndTime = `${formattedDate}T${formattedTime}Z`;
		setNewDisplacementData({
			...newDisplacementData,
			["inicioDeslocamento"]: toLoadDateAndTime,
		});
	}, []);

	const router = useRouter();

	const createNewDisplacement = async (
		newDisplacementData: Omit<
			Displacement,
			"id" | "kmFinal" | "fimDeslocamento"
		>
	) => {
		try {
			const response = await axios.post(
				`https://api-deslocamento.herokuapp.com/api/v1/Deslocamento/IniciarDeslocamento`,
				newDisplacementData
			);

			router.push("/displacements");
		} catch (error) {
			console.error("Error fetching data:", error);
			router.push("/displacements");
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
						Detalhes do deslocamento
					</Typography>
					<Typography variant="h5" component="div" sx={{ mb: "20px" }}>
						Km inicial:{" "}
						<OutlinedInput
							style={{ width: "fit-content", height: "40px" }}
							onChange={(e) => handleInputChange(e, "kmInicial")}
						></OutlinedInput>
					</Typography>
					<Typography variant="h5" component="div" sx={{ mb: "20px" }}>
						Data do início:{" "}
						<ResponsiveDateAndTimePickers
							defaultValue={new Date()}
							type={"date"}
							handleDateAndTimeChange={handleDateAndTimeChange}
							minDate={new Date()}
						/>
					</Typography>
					<Typography variant="h5" component="div" sx={{ mb: "20px" }}>
						Horário do início:{" "}
						<ResponsiveDateAndTimePickers
							defaultValue={new Date()}
							type={"time"}
							handleDateAndTimeChange={handleDateAndTimeChange}
							minDate={new Date()}
						/>
					</Typography>
					<Typography variant="h5" component="div" sx={{ mb: "20px" }}>
						Cliente:{" "}
						<BasicSelect
							optionsArray={entriesArrays.clientsEntries}
							label={"Cliente"}
							setNewDisplacementData={setNewDisplacementData}
						/>
					</Typography>
					<Typography variant="h5" component="div" sx={{ mb: "20px" }}>
						Condutor:{" "}
						<BasicSelect
							optionsArray={entriesArrays.driversEntries}
							label={"Condutor"}
							setNewDisplacementData={setNewDisplacementData}
						/>
					</Typography>
					<Typography variant="h5" component="div" sx={{ mb: "20px" }}>
						Veículo:{" "}
						<BasicSelect
							optionsArray={entriesArrays.vehiclesEntries}
							label={"Veiculo"}
							setNewDisplacementData={setNewDisplacementData}
						/>
					</Typography>
					<Typography variant="h5" component="div" sx={{ mb: "20px" }}>
						Checklist:{" "}
						<OutlinedInput
							style={{ width: "fit-content", height: "40px" }}
							onChange={(e) => handleInputChange(e, "checkList")}
						></OutlinedInput>
					</Typography>
					<Typography variant="h5" component="div" sx={{ mb: "20px" }}>
						Motivo:{" "}
						<OutlinedInput
							style={{ width: "fit-content", height: "40px" }}
							onChange={(e) => handleInputChange(e, "motivo")}
						></OutlinedInput>
					</Typography>
					<Typography variant="h5" component="div" sx={{ mb: "20px" }}>
						Observação:{" "}
						<OutlinedInput
							style={{ width: "fit-content", height: "40px" }}
							onChange={(e) => handleInputChange(e, "observacao")}
						></OutlinedInput>
					</Typography>
				</CardContent>
				<Box sx={{ display: "flex", justifyContent: "flex-end" }}>
					<CardActions>
						<Button
							onClick={() => createNewDisplacement(newDisplacementData)}
							size="small"
						>
							<SaveIcon sx={{ marginRight: "5px" }} />
							Salvar
						</Button>
					</CardActions>
				</Box>
			</Card>
		</div>
	);
};

export default NewDisplacementPage;
