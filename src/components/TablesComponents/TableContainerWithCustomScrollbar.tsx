import { TableContainer } from "@mui/material";
import { styled } from "@mui/system";

export const CustomScrollbarContainer = styled(TableContainer)`
	overflow: auto;
	max-height: 440px;

	&::-webkit-scrollbar {
		width: 12px;
	}

	&::-webkit-scrollbar-track {
		background: #f1f1f1;
	}

	&::-webkit-scrollbar-thumb {
		background: #888;
		border-radius: 10px;
	}

	&::-webkit-scrollbar-thumb:hover {
		background: #555;
	}
`;
