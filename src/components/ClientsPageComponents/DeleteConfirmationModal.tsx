import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import axios, { AxiosRequestConfig } from "axios";
import { useRouter } from "next/navigation";

const style = {
	position: "absolute" as "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: 400,
	bgcolor: "background.paper",
	border: "2px solid #000",
	boxShadow: 24,
	p: 4,
};

export default function ClientDeletionModal({
	open,
	handleClose,
	clientId,
}: {
	open: boolean;
	handleClose: () => void;
	clientId: number;
}) {
	const router = useRouter();
	const deleteClientBody: AxiosRequestConfig<any> = {
		data: {
			id: clientId,
		},
	};

	const deleteOneClientById = async (clientId: number) => {
		try {
			const response = await axios.delete(
				`https://api-deslocamento.herokuapp.com/api/v1/Cliente/${clientId}`,
				deleteClientBody
			);
			router.push("/clients");
		} catch (error) {
			console.error("Error fetching data:", error);
		}
	};

	return (
		<div>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box sx={style}>
					<Typography id="modal-modal-title" variant="h6" component="h2">
						Você tem certeza que deseja deletar este cliente?
					</Typography>
					<Typography id="modal-modal-title" variant="h6" component="h2">
						Essa decisão é irreversível.
					</Typography>

					<Box
						sx={{ padding: "10px", display: "flex", justifyContent: "center" }}
					>
						<Button
							sx={{ marginRight: "10px" }}
							variant="contained"
							onClick={() => deleteOneClientById(clientId)}
						>
							Deletar
						</Button>
						<Button
							sx={{ marginLeft: "10px" }}
							variant="contained"
							onClick={handleClose}
						>
							Voltar
						</Button>
					</Box>
				</Box>
			</Modal>
		</div>
	);
}
