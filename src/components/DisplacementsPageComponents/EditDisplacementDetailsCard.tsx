import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import {
	FinishDisplacementObject,
	TransformedDisplacement,
} from "@/types/Displacements";
import OutlinedInput from "@mui/material/OutlinedInput";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import axios from "axios";
import ResponsiveDateAndTimePickers from "../TimePicker";
import dayjs from "dayjs";

export default function EditDisplacementDetailsCard({
	setIsEditing,
	displacementData,
	setSuccessSnackbarIsOpen,
	setFailureSnackbarIsOpen,
}: {
	setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
	displacementData: TransformedDisplacement;
	setSuccessSnackbarIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
	setFailureSnackbarIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
	const {
		kmInicial,
		inicioDeslocamento,
		nomeCliente,
		nomeCondutor,
		marcaModeloVeiculo,
		checkList,
		motivo,
		...requisitionBodyObject
	} = displacementData;

	const [updatedDisplacementData, setUpdatedDisplacementData] =
		React.useState<FinishDisplacementObject>(requisitionBodyObject);

	const [dateAndTime, setDateAndTime] = React.useState({
		date: new Date(requisitionBodyObject.fimDeslocamento),
		time: new Date(requisitionBodyObject.fimDeslocamento),
	});

	const handleInputChange = (
		event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
		field: keyof FinishDisplacementObject
	) => {
		setUpdatedDisplacementData((prevData) => ({
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
		setUpdatedDisplacementData({
			...updatedDisplacementData,
			["fimDeslocamento"]: toLoadDateAndTime,
		});
	};

	const updateOneDisplacementById = async (id: number) => {
		try {
			const response = await axios.put(
				`https://api-deslocamento.herokuapp.com/api/v1/Deslocamento/${id}/EncerrarDeslocamento`,
				updatedDisplacementData
			);

			setSuccessSnackbarIsOpen(true);
			setIsEditing(false);
		} catch (error) {
			console.error("Error fetching data:", error);
			setFailureSnackbarIsOpen(true);
		}
	};

	return (
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
					Cliente:{" "}
					<OutlinedInput
						style={{ width: "fit-content", height: "40px" }}
						value={displacementData?.nomeCliente}
						disabled={true}
					></OutlinedInput>
				</Typography>
				<Typography variant="h5" component="div" sx={{ mb: "20px" }}>
					Condutor:{" "}
					<OutlinedInput
						style={{ width: "fit-content", height: "40px" }}
						value={displacementData?.nomeCondutor}
						disabled={true}
					></OutlinedInput>
				</Typography>
				<Typography variant="h5" component="div" sx={{ mb: "20px" }}>
					Marca/modelo do veículo:{" "}
					<OutlinedInput
						style={{ width: "fit-content", height: "40px" }}
						value={displacementData?.marcaModeloVeiculo}
						disabled={true}
					></OutlinedInput>
				</Typography>
				<Paper elevation={8} sx={{ padding: "10px" }}>
					<Typography
						sx={{ fontSize: 14, mb: "10px", fontWeight: "800" }}
						color="text.secondary"
						gutterBottom
					>
						Detalhes do deslocamento
					</Typography>
					<Typography
						sx={{ fontSize: 14, mb: "10px" }}
						color="text.secondary"
						gutterBottom
					>
						Inicio:{" "}
						<OutlinedInput
							style={{ width: "fit-content", height: "40px" }}
							value={displacementData?.inicioDeslocamento}
							disabled={true}
						></OutlinedInput>
					</Typography>
					<Typography variant="h5" component="div" sx={{ mb: "20px" }}>
						Data do final:{" "}
						<ResponsiveDateAndTimePickers
							type={"date"}
							handleDateAndTimeChange={handleDateAndTimeChange}
							defaultValue={new Date()}
							minDate={new Date()}
						/>
					</Typography>
					<Typography variant="h5" component="div" sx={{ mb: "20px" }}>
						Horário do final:{" "}
						<ResponsiveDateAndTimePickers
							type={"time"}
							handleDateAndTimeChange={handleDateAndTimeChange}
							defaultValue={new Date()}
							minDate={new Date()}
						/>
					</Typography>
					<Typography
						sx={{ fontSize: 14, mb: "10px" }}
						color="text.secondary"
						gutterBottom
					>
						Km inicial:{"km"}
						<OutlinedInput
							style={{ width: "fit-content", height: "40px" }}
							value={displacementData?.kmInicial}
							disabled={true}
						></OutlinedInput>
					</Typography>
					<Typography
						sx={{ fontSize: 14, mb: "10px" }}
						color="text.secondary"
						gutterBottom
					>
						Km final:{"km"}
						<OutlinedInput
							style={{ width: "fit-content", height: "40px" }}
							onChange={(e) => handleInputChange(e, "kmFinal")}
							defaultValue={displacementData?.kmFinal}
						></OutlinedInput>
					</Typography>
					<Typography
						sx={{ fontSize: 14, mb: "10px" }}
						color="text.secondary"
						gutterBottom
					>
						Motivo:{" "}
						<OutlinedInput
							style={{ width: "fit-content", height: "40px" }}
							value={displacementData?.motivo}
							disabled={true}
						></OutlinedInput>
					</Typography>
					<Typography
						sx={{ fontSize: 14, mb: "10px" }}
						color="text.secondary"
						gutterBottom
					>
						Checklist:{" "}
						<OutlinedInput
							style={{ width: "fit-content", height: "40px" }}
							value={displacementData?.checkList}
							disabled={true}
						></OutlinedInput>
					</Typography>
					<Typography
						sx={{ fontSize: 14, mb: "10px" }}
						color="text.secondary"
						gutterBottom
					>
						Observação:{" "}
						<OutlinedInput
							style={{ width: "fit-content", height: "40px" }}
							onChange={(e) => handleInputChange(e, "observacao")}
							defaultValue={displacementData?.observacao}
						></OutlinedInput>
					</Typography>
				</Paper>
			</CardContent>
			<Box sx={{ display: "flex", justifyContent: "flex-end" }}>
				<CardActions>
					<Button
						onClick={() =>
							updateOneDisplacementById(
								displacementData?.id ? displacementData.id : 0
							)
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
