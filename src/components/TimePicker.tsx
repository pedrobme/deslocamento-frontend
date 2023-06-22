import * as React from "react";
import dayjs from "dayjs";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { DatePicker } from "@mui/x-date-pickers";
import "dayjs/locale/pt-br";
import { ptBR } from "date-fns/locale";

dayjs.locale("pt-br");

export default function ResponsiveDateAndTimePickers({
	type,
	handleDateAndTimeChange,
	defaultValue,
}: {
	type: "date" | "time";
	handleDateAndTimeChange: (event: any, field: "date" | "time") => void;
	defaultValue: Date;
}) {
	return (
		<LocalizationProvider adapterLocale={ptBR} dateAdapter={AdapterDateFns}>
			{type === "time" && (
				<TimePicker
					defaultValue={defaultValue}
					onChange={(e) => handleDateAndTimeChange(e, type)}
				/>
			)}
			{type === "date" && (
				<DatePicker
					format="dd/MM/yyyy"
					defaultValue={defaultValue}
					onChange={(e) => handleDateAndTimeChange(e, type)}
				/>
			)}
		</LocalizationProvider>
	);
}
