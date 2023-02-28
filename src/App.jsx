import { useState } from "react";
import GooglePayButton from "@google-pay/button-react";

export default function App() {

  const paymentRequest = {
    apiVersion: 2,
    apiVersionMinor: 0,
    allowedPaymentMethods: [
      {
        type: "CARD",
        parameters: {
          allowedAuthMethods: ["PAN_ONLY", "CRYPTOGRAM_3DS"],
          allowedCardNetworks: ["MASTERCARD", "VISA"],
        },
        tokenizationSpecification: {
          type: 'PAYMENT_GATEWAY',
          parameters: {
            "gateway": "stripe",
            "stripe:version": "2022-11-15",
            "stripe:publishableKey": import.meta.VITE_APP_STRIPE_KEY
          }
          // type: "DIRECT",
          // parameters: {
          //   protocolVersion: "ECv2",
          //   publicKey: import.meta.env.VITE_APP_PUBLIC_KEY,
          // },
        },
      },
    ],
    merchantInfo: {
      merchantId: import.meta.env.VITE_APP_MERCHANT_ID,
      merchantName: import.meta.env.VITE_APP_MERCHANT_NAME,
    },
    transactionInfo: {
      totalPriceStatus: "FINAL",
      totalPriceLabel: "Total",
      totalPrice: "1.00",
      currencyCode: "INR",
      countryCode: "IN",
    },
  };

  const isTop = window === window.top;

  return (
    <div>
      <div className="demo">
        <GooglePayButton
          environment="TEST"
          buttonType="plain"
          buttonSizeMode="fill"
          paymentRequest={paymentRequest}
          onLoadPaymentData={(paymentRequest) => {
            console.log("load payment data", paymentRequest);
          }}
          onError={(error) => {
            if (error instanceof Error) {
              console.log("Error", error, error.message, error.stack);
            } else {
              console.log("Error", error.statusCode, error.statusMessage);
            }
          }}
        />
      </div>

      <div className="note" style={{ display: isTop ? "none" : "" }}>
        <p>
          Note: This page may need to open in a new window for it to function
          correctly.
        </p>
        <p>
          <a href="/" target="_blank">
            Open in new window
          </a>
          .
        </p>
      </div>
    </div>
  );
}
