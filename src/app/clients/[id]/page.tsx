"use client";
import ClientDetailsCard from "@/components/ClientsPageComponents/ClientDetailsCard";
import EditClientDetailsCard from "@/components/ClientsPageComponents/EditClientDetailsCard";
import CustomizedSnackbar from "@/components/CustomizedSnackBar";
import { Client } from "@/types/Clients";
import axios from "axios";
import { useParams } from "next/navigation";
import React from "react";

const ClientDetailsPage = () => {
	const [clientData, setClientData] = React.useState<Client>({
		id: 0,
		nome: "",
		tipoDocumento: "",
		numeroDocumento: "",
		logradouro: "",
		numero: "",
		bairro: "",
		cidade: "",
		uf: "",
	});

	const [isEditing, setIsEditing] = React.useState(false);
	const [successSnackbarIsOpen, setSuccessSnackbarIsOpen] =
		React.useState(false);
	const [failureSnackbarIsOpen, setFailureSnackbarIsOpen] =
		React.useState(false);
	const params = useParams();

	React.useEffect(() => {
		const clientId = params.id;

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
	}, [isEditing]);

	return isEditing ? (
		<>
			<EditClientDetailsCard
				setIsEditing={setIsEditing}
				clientData={clientData}
				setSuccessSnackbarIsOpen={setSuccessSnackbarIsOpen}
				setFailureSnackbarIsOpen={setFailureSnackbarIsOpen}
			/>
			<CustomizedSnackbar
				severity="error"
				message="Erro! Tente novamente em alguns instantes."
				openState={failureSnackbarIsOpen}
				setOpenState={setFailureSnackbarIsOpen}
			/>
		</>
	) : (
		<>
			<ClientDetailsCard setIsEditing={setIsEditing} clientData={clientData} />
			<CustomizedSnackbar
				severity="success"
				message="Cliente atualizado com sucesso!"
				openState={successSnackbarIsOpen}
				setOpenState={setSuccessSnackbarIsOpen}
			/>
		</>
	);
};

export default ClientDetailsPage;
