"use client";
import * as React from "react";
import Paper from "@mui/material/Paper";
import { CustomScrollbarContainer } from "@/components/TablesComponents/TableContainerWithCustomScrollbar";
import { Box } from "@mui/system";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
import WeatherSummaryCard from "@/components/WeatherPageComponents/WeatherCard";
import { Weather } from "@/types/Weathers";

export default function WeathersSummaryCardsView() {
	const [weathersData, setWeathersData] = React.useState<Weather[]>([]);
	const [isFetchingData, setIsFetchingData] = React.useState(true);

	React.useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get(
					"https://api-deslocamento.herokuapp.com/api/v1/WeatherForecast"
				);
				setWeathersData(response.data);
				setIsFetchingData(false);
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};

		fetchData();
	}, []);

	return isFetchingData ? (
		<Box
			sx={{
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
			}}
		>
			<CircularProgress />
		</Box>
	) : (
		<Paper elevation={4} sx={{ width: "100%", padding: "30px" }}>
			<CustomScrollbarContainer
				sx={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					flexWrap: "wrap",
					minHeight: 440,
					maxHeight: 440,
				}}
			>
				{weathersData.map((weatherData, index) => {
					return <WeatherSummaryCard weatherData={weatherData} />;
				})}
			</CustomScrollbarContainer>
		</Paper>
	);
}
