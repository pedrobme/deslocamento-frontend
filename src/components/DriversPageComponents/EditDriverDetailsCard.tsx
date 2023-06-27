import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Driver, DriverEditObject } from "@/types/Drivers";
import OutlinedInput from "@mui/material/OutlinedInput";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import axios from "axios";
import ResponsiveDateAndTimePickers from "../TimePicker";
import dayjs from "dayjs";

export default function EditDriverDetailsCard({
	setIsEditing,
	driverData,
	setSuccessSnackbarIsOpen,
	setFailureSnackbarIsOpen,
}: {
	setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
	driverData: Driver;
	setSuccessSnackbarIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
	setFailureSnackbarIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
	const { numeroHabilitacao, nome, ...requisitionBodyObject } = driverData;

	const [updatedDriverData, setUpdatedDriverData] = React.useState<
		Omit<Driver, "nome" | "numeroHabilitacao">
	>(requisitionBodyObject);

	const [dateAndTime, setDateAndTime] = React.useState({
		date: new Date(requisitionBodyObject.vencimentoHabilitacao),
		time: new Date(requisitionBodyObject.vencimentoHabilitacao),
	});

	const handleInputChange = (
		event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
		field: keyof DriverEditObject
	) => {
		setUpdatedDriverData((prevData) => ({
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
		setUpdatedDriverData({
			...updatedDriverData,
			["vencimentoHabilitacao"]: toLoadDateAndTime,
		});
	};

	const updateOneDriverById = async (id: number) => {
		try {
			const response = await axios.put(
				`https://api-deslocamento.herokuapp.com/api/v1/Condutor/${id}`,
				updatedDriverData
			);

			setSuccessSnackbarIsOpen(true);
			setIsEditing(false);
		} catch (error) {
			console.error("Error fetching data:", error);
			setFailureSnackbarIsOpen(true);
		}
	};

	const handleMinDate = () => {
		const date = dayjs(driverData.vencimentoHabilitacao);
		const updatedDate = date.add(1, "day");

		return updatedDate.toDate();
	};

	return (
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
						value={driverData.nome}
						disabled={true}
					></OutlinedInput>
				</Typography>
				<Typography variant="h5" component="div" sx={{ mb: "20px" }}>
					Categoria da habilitação:{" "}
					<OutlinedInput
						style={{ width: "fit-content", height: "40px" }}
						onChange={(e) => handleInputChange(e, "catergoriaHabilitacao")}
						defaultValue={driverData.catergoriaHabilitacao}
						disabled={true}
					></OutlinedInput>
				</Typography>
				<Typography variant="h5" component="div" sx={{ mb: "20px" }}>
					Número da habilitação:{" "}
					<OutlinedInput
						style={{ width: "fit-content", height: "40px" }}
						value={driverData.numeroHabilitacao}
						disabled={true}
					></OutlinedInput>
				</Typography>
				<Typography variant="h5" component="div" sx={{ mb: "20px" }}>
					Data de vencimento:{" "}
					<ResponsiveDateAndTimePickers
						type={"date"}
						handleDateAndTimeChange={handleDateAndTimeChange}
						defaultValue={handleMinDate()}
						minDate={handleMinDate()}
					/>
				</Typography>
				<Typography variant="h5" component="div" sx={{ mb: "20px" }}>
					Horário de vencimento:{" "}
					<ResponsiveDateAndTimePickers
						type={"time"}
						handleDateAndTimeChange={handleDateAndTimeChange}
						defaultValue={dateAndTime.date}
						minDate={dateAndTime.time}
					/>
				</Typography>
			</CardContent>
			<Box sx={{ display: "flex", justifyContent: "flex-end" }}>
				<CardActions>
					<Button
						onClick={() =>
							updateOneDriverById(driverData.id ? driverData.id : 0)
						}
						size="small"
					>
						<SaveIcon sx={{ marginRight: "5px" }} />
						Salvar
					</Button>
					<Button onClick={() => setIsEditing(false)} size="small">
						<CancelIcon sx={{ marginRight: "5px" }} />
						Cancelar
					</Button>
				</CardActions>
			</Box>
		</Card>
	);
}
