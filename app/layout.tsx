import Navbar from "@/components/molecules/Navbar";
import NavbarProfile from "@/components/molecules/Navbar/NavbarMenu/NavbarProfile";
import "./global.css";

export default function RootLayout({children}: {children: React.ReactNode}) {
	return (
		<html lang="en" className="h-full">
			<body className="h-full">{children}</body>
		</html>
	);
}
