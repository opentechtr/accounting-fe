import React from "react";
import { useTranslation } from "react-i18next";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axiosInstance from "../api/axiosInstance";
import { TextField, Button, Checkbox, FormControlLabel, Grid, Paper, Typography } from "@mui/material";

const schema = yup.object().shape({
    cariKodu: yup.string().required("Required"),
    cariAdi: yup.string().required("Required"),
    cariAdi2: yup.string(),
    cariTipi: yup.string(),
    vergiDairesi: yup.string().required("Required"),
    vknTckn: yup.string().required("Required"),
    faturaAdresi: yup.string(),
    postaKodu: yup.string(),
    ilce: yup.string(),
    il: yup.string(),
    ulke: yup.string(),
    telefon1: yup.string(),
    telefon2: yup.string(),
    cepTel: yup.string(),
    email: yup.string().email("Invalid email"),
    website: yup.string(),
    fax: yup.string(),
    iban: yup.string(),
    bankaKodu: yup.string(),
    bankaAdi: yup.string(),
    bankaSubeKodu: yup.string(),
    bankaSubeAdi: yup.string(),
    bankaHesapNo: yup.string(),
    paraBirimi: yup.string(),
    aciklama: yup.string(),
    pasif: yup.boolean(),
    adresTipi: yup.string(),
    sevkiyatAdresi: yup.string(),
    sevkiyatPostaKodu: yup.string(),
    sevkiyatTelefon1: yup.string(),
    sevkiyatTelefon2: yup.string(),
    sevkiyatCepTel: yup.string(),
    sevkiyatEmail: yup.string(),
    sevkiyatWebsite: yup.string(),
    sevkiyatFax: yup.string(),
    departman: yup.string(),
    yetkiliAdi: yup.string(),
    yetkiliSoyadi: yup.string(),
    yetkiliCepTel1: yup.string(),
    yetkiliCepTel2: yup.string()
});

export default function CurrentAccount() {
    const { t } = useTranslation();
    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
        defaultValues: Object.fromEntries(Object.keys(schema.fields).map((key) => [key, ""]))
    });

    const onSubmit = async (data) => {
        try {
            const response = await axiosInstance.post("/current-account", data);
            console.log("Success:", response.data);
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <Paper className="max-w-6xl mx-auto p-6 shadow-lg">
            <Typography variant="h5" gutterBottom sx={{ textAlign: "center", fontWeight: "bold", marginBottom: "16px" }}>
                {t("currentAccount")}
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={1}>
                    {Object.keys(schema.fields).map((key) => (
                        <Grid item xs={12} sm={2.6} key={key}> {/* Her satırda 5 input olacak şekilde ayarlandı */}
                            <Controller
                                name={key}
                                control={control}
                                render={({ field }) => (
                                    key === "pasif" ? (
                                        <FormControlLabel
                                            control={<Checkbox {...field} checked={field.value} />}
                                            label={t(key)}
                                            sx={{ marginBottom: "4px" }}
                                        />
                                    ) : (
                                        <TextField
                                            {...field}
                                            label={t(key)}
                                            fullWidth
                                            size="small"
                                            variant="outlined"
                                            error={!!errors[key]}
                                            helperText={errors[key]?.message}
                                            InputLabelProps={{ style: { fontSize: "0.85rem" } }}
                                            sx={{ marginBottom: "8px" }}
                                        />
                                    )
                                )}
                            />
                        </Grid>
                    ))}
                </Grid>
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{ marginTop: "16px", padding: "8px", fontSize: "0.9rem", fontWeight: "bold" }}
                >
                    {t("submit")}
                </Button>
            </form>
        </Paper>
    );
}
