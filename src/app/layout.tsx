"use client";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import { Inter } from "next/font/google";
import HeaderComponent from "@/components/Header/Header";
import React from "react";
import Container from "@mui/material/Container";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
	title: "Create Next App",
	description: "Generated by create next app",
	viewport: "width=device-width, initial-scale=1",
};

const ColorModeContext = React.createContext({ toggleColorMode: () => {} });

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const [mode, setMode] = React.useState<"light" | "dark">("dark");
	const colorMode = React.useMemo(
		() => ({
			toggleColorMode: () => {
				setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
			},
		}),
		[]
	);

	const theme = React.useMemo(
		() =>
			createTheme({
				palette: {
					mode,
				},
			}),
		[mode]
	);

	return (
		<ColorModeContext.Provider value={colorMode}>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<html lang="pt-BR">
					<body className={inter.className}>
						<HeaderComponent toggleColorMode={colorMode.toggleColorMode} />
						<Container maxWidth="lg">{children}</Container>
					</body>
				</html>
			</ThemeProvider>
		</ColorModeContext.Provider>
	);
}
