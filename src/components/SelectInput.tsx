import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { Displacement } from "@/types/Displacements";

type setNewDataType = React.Dispatch<
	React.SetStateAction<Omit<Displacement, "id" | "kmFinal" | "fimDeslocamento">>
>;

export default function DisplacementEntriesSelectInput({
	label,
	optionsArray,
	setNewDisplacementData,
}: {
	label: "Cliente" | "Condutor" | "Veiculo";
	optionsArray: string[];
	setNewDisplacementData: setNewDataType;
}) {
	const [selectedValue, setSelectedValue] = React.useState("");

	const handleChange = (event: SelectChangeEvent) => {
		setSelectedValue(event.target.value as string);
	};

	React.useEffect(() => {
		if (selectedValue === "") {
			return;
		}
		switch (label) {
			case "Cliente":
				const idClienteMatch = selectedValue.match(/id:(\d+)/);
				let idCliente = 0;
				if (idClienteMatch) {
					idCliente = Number(idClienteMatch[1]);
				} else {
					console.log("Client id cannot be found");
				}
				setNewDisplacementData((prevData) => ({
					...prevData,
					["idCliente"]: idCliente,
				}));
				break;
			case "Condutor":
				const idCondutorMatch = selectedValue.match(/id:(\d+)/);
				let idCondutor = 0;
				if (idCondutorMatch) {
					idCondutor = Number(idCondutorMatch[1]);
				} else {
					console.log("Driver id cannot be found");
				}
				setNewDisplacementData((prevData) => ({
					...prevData,
					["idCondutor"]: idCondutor,
				}));
				break;
			case "Veiculo":
				const idVeiculoMatch = selectedValue.match(/id:(\d+)/);
				let idVeiculo = 0;
				if (idVeiculoMatch) {
					idVeiculo = Number(idVeiculoMatch[1]);
				} else {
					console.log("Vehicle id cannot be found");
				}
				setNewDisplacementData((prevData) => ({
					...prevData,
					["idVeiculo"]: idVeiculo,
				}));
				break;
			default:
				break;
		}
	}, [selectedValue]);

	return (
		<Box sx={{ minWidth: 120 }}>
			<FormControl fullWidth>
				<InputLabel id="demo-simple-select-label">Age</InputLabel>
				<Select
					labelId="demo-simple-select-label"
					id="demo-simple-select"
					value={selectedValue}
					label="Age"
					onChange={handleChange}
				>
					{optionsArray.map((option, index) => (
						<MenuItem key={index} value={option}>
							{option}
						</MenuItem>
					))}
				</Select>
			</FormControl>
		</Box>
	);
}
