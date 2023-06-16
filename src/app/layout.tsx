"use client";
import React, { useContext } from "react";
import { CssBaseline } from "@mui/material";
import HeaderComponent from "@/components/Header/Header";

interface LayoutProps {
	children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
	return (
		<>
			<CssBaseline />
			<HeaderComponent />
			{children}
		</>
	);
};

export default Layout;
