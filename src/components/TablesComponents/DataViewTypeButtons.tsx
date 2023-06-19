import * as React from "react";
import TableRowsIcon from "@mui/icons-material/TableRows";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

export default function HorizontalToggleButtons({
	viewType,
	setViewType,
}: {
	viewType: string;
	setViewType: React.Dispatch<React.SetStateAction<string>>;
}) {
	const handleChange = (
		event: React.MouseEvent<HTMLElement>,
		nextView: string
	) => {
		setViewType(nextView);
	};

	return (
		<ToggleButtonGroup
			orientation="horizontal"
			value={viewType}
			exclusive
			onChange={handleChange}
			sx={{ mb: "10px" }}
		>
			<ToggleButton value="list" aria-label="list">
				<TableRowsIcon />
			</ToggleButton>
			<ToggleButton value="cards" aria-label="cards">
				<ViewModuleIcon />
			</ToggleButton>
		</ToggleButtonGroup>
	);
}
