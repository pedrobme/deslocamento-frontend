import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Weather } from "@/types/Weathers";

export default function WeatherSummaryCard({
	weatherData,
}: {
	weatherData: Weather;
}) {
	const [temperatureDegree, setTemperatureDegree] = React.useState("Celcius");

	const handleDateAndTimeView = () => {
		const displacementInitialDateAndTime = new Date(weatherData.date);
		const toLoadInitialDate =
			displacementInitialDateAndTime.toLocaleDateString("pt-BR");
		const toLoadInitialTime =
			displacementInitialDateAndTime.toLocaleTimeString("pt-BR");

		return `${toLoadInitialDate} às ${toLoadInitialTime}`;
	};
	return (
		<Card sx={{ wordBreak: "break-word", width: "270px", margin: "15px" }}>
			<CardContent>
				<Typography
					sx={{ fontSize: 14, mb: "10px", textAlign: "center" }}
					color="text.secondary"
					gutterBottom
				>
					Previsão de tempo
				</Typography>
				<Typography variant="h6" component="div" sx={{ mb: "20px" }}>
					Dia: {handleDateAndTimeView()}
				</Typography>
				<Typography variant="h6" component="div" sx={{ mb: "20px" }}>
					Temperatura ºC: {weatherData.temperatureC}ºC
				</Typography>
				<Typography variant="h6" component="div" sx={{ mb: "20px" }}>
					Temperatura: {weatherData.temperatureF}ºF
				</Typography>
			</CardContent>
		</Card>
	);
}
