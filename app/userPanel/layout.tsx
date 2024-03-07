import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Sidebar from "./sidebar/sidebar";
import styles from './dashboard.module.css'

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "User Page",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={styles.container}>
      <div className={styles.menu}>
        <Sidebar />
      </div>
      <div className={styles.children}>
        {children} 
      </div>
    </div>
  );
}