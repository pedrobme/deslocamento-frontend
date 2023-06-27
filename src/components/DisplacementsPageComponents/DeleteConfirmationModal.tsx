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

export default function DisplacementDeletionModal({
	open,
	handleClose,
	displacementId,
	setFailSnackbar,
}: {
	open: boolean;
	handleClose: () => void;
	displacementId: number;
	setFailSnackbar: React.Dispatch<React.SetStateAction<boolean>>;
}) {
	const router = useRouter();
	const deleteDisplacementBody: AxiosRequestConfig<any> = {
		data: {
			id: displacementId,
		},
	};

	const deleteOneDisplacementById = async (displacementId: number) => {
		try {
			const response = await axios.delete(
				`https://api-deslocamento.herokuapp.com/api/v1/Deslocamento/${displacementId}`,
				deleteDisplacementBody
			);
			router.push("/displacements");
		} catch (error) {
			console.error("Error fetching data:", error);
			handleClose();
			setFailSnackbar(true);
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
						Você tem certeza que deseja deletar este deslocamento?
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
							onClick={() => deleteOneDisplacementById(displacementId)}
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
