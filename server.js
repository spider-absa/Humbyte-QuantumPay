import express from "express";
import bodyParser from "body-parser";
import fs from "fs";
import crypto from "crypto";
import {
    createAuthenticatedClient
} from "@interledger/open-payments";

const app = express();
app.use(bodyParser.json());

const PRIVATE_KEY = fs.readFileSync("private.key", "utf8");
const keyId = "fd0796d3-4148-4654-8465-93afe65be063";

// Endpoint para crear la URL de interacción de pago
app.post("/create-payment", async (req, res) => {
    const { sendingWalletUrl, receivingWalletUrl, amount } = req.body;

    if (!sendingWalletUrl || !receivingWalletUrl || !amount) {
        return res.status(400).json({ error: "Faltan datos" });
    }

    try {
        // Crear cliente autenticado
        const client = await createAuthenticatedClient({
            walletAddressUrl: sendingWalletUrl,
            privateKey: PRIVATE_KEY,
            keyId: "fd0796d3-4148-4654-8465-93afe65be063", // Coloca tu keyId aquí
        });

        // Obtener información de wallets
        var sendingWalletAddress = await client.walletAddress.get({ url: sendingWalletUrl });
        var receivingWalletAddress = await client.walletAddress.get({ url: receivingWalletUrl });

        // Generar URL de interacción para abrir la wallet y autorizar el pago
        const interactionUrl = `https://wallet.interledger-test.dev/send?receiver=${encodeURIComponent(receivingWalletUrl)}&amount=${encodeURIComponent(amount)}&currency=USD`;

        res.json({ interactionUrl });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error generando URL de pago" });
    }
});

app.listen(3000, () => console.log("Backend corriendo en http://localhost:3000"));
