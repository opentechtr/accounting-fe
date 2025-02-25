import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import axiosInstance from "../api/axiosInstance";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from "@mui/material";

export default function CurrentAccountList() {
    const { t } = useTranslation();
    const [accounts, setAccounts] = useState([]); // Başlangıçta boş dizi olarak ayarlandı
    const [loading, setLoading] = useState(true); // Yükleme durumu
    const [error, setError] = useState(null); // Hata durumu

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosInstance.get("/current-account");

                if (Array.isArray(response.data)) {
                    setAccounts(response.data); // Eğer array ise set et
                } else {
                    console.error("Beklenmeyen veri formatı:", response.data);
                    setAccounts([]); // Beklenmeyen durumda boş array olarak ayarla
                }
            } catch (error) {
                console.error("Veri çekme hatası:", error);
                setError("Veriler yüklenirken hata oluştu.");
            } finally {
                setLoading(false); // Yükleme tamamlandı
            }
        };

        fetchData();
    }, []);

    if (loading) return <Typography>Loading...</Typography>; // Yükleme ekranı
    if (error) return <Typography color="error">{error}</Typography>; // Hata mesajı göster

    return (
        <Paper className="max-w-4xl mx-auto p-6 shadow-lg">
            <Typography variant="h4" gutterBottom>{t("currentAccountList")}</Typography>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>{t("cariKodu")}</TableCell>
                            <TableCell>{t("cariAdi")}</TableCell>
                            <TableCell>{t("telefon1")}</TableCell>
                            <TableCell>{t("email")}</TableCell>
                            <TableCell>{t("vergiDairesi")}</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {accounts.length > 0 ? (
                            accounts.map((account, index) => (
                                <TableRow key={index}>
                                    <TableCell>{account.cariKodu || "-"}</TableCell>
                                    <TableCell>{account.cariAdi || "-"}</TableCell>
                                    <TableCell>{account.telefon1 || "-"}</TableCell>
                                    <TableCell>{account.email || "-"}</TableCell>
                                    <TableCell>{account.vergiDairesi || "-"}</TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={5} style={{ textAlign: "center" }}>
                                    {t("noDataAvailable")}
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
}
