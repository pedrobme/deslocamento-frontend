"use client";
import ClientDetailsCard from "@/components/ClientsPageComponents/ClientDetailsCard";
import { Client } from "@/types/Clients";
import axios from "axios";
import { useRouter } from "next/navigation";
import React from "react";

const ClientDetailsPage = () => {
	const [clientData, setClientData] = React.useState<Client | null>(null);

	const router = useRouter();
	console.log(router);

	React.useEffect(() => {
		const clientId = window.location.pathname.split("/").pop();

		const fetchData = async () => {
			try {
				const response = await axios.get(
					`https://api-deslocamento.herokuapp.com/api/v1/Cliente/${clientId}`
				);
				setClientData(response.data);
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};

		fetchData();
	}, []);

	return <ClientDetailsCard clientData={clientData} />;
};

export default ClientDetailsPage;
