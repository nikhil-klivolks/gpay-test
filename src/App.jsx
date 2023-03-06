import { useState } from "react";
import GooglePayButton from "@google-pay/button-react";

export default function App() {

  const [isReadyToPay, setIsReadyToPay] = useState(true);

  const paymentRequest = {
    apiVersion: 2,
    apiVersionMinor: 0,
    allowedPaymentMethods: [
      {
      //   type: "CARD",
      //   parameters: {
      //     allowedAuthMethods: ["PAN_ONLY", "CRYPTOGRAM_3DS"],
      //     allowedCardNetworks: ["MASTERCARD", "VISA"],
      //   },
      //   tokenizationSpecification: {
      //     type: 'PAYMENT_GATEWAY',
      //     parameters: {
      //       "gateway": "stripe",
      //       "stripe:version": "2022-11-15",
      //       "stripe:publishableKey": import.meta.VITE_APP_STRIPE_KEY
      //     }
      //     // type: "DIRECT",
      //     // parameters: {
      //     //   protocolVersion: "ECv2",
      //     //   publicKey: import.meta.env.VITE_APP_PUBLIC_KEY,
      //     // },
      //   },
      // },
      // {
        type: "UPI",
        parameters: {
          // allowedAuthMethods: ["PAN_ONLY", "CRYPTOGRAM_3DS"],
          // allowedUPIApps: ["paytm", "googlepay"],
          pa: 'nikhildanand@okhdfcbank'
        },
        tokenizationSpecification: {
          type: 'PAYMENT_GATEWAY',
          parameters: {
            "gateway": "stripe",
            "stripe:version": "2022-11-15",
            "stripe:publishableKey": import.meta.VITE_APP_STRIPE_KEY
          }
        }
      },
      // "UPI"
    ],
    // UPIParameters: {
    //   pa: 'nikhildanand@okhdfcbank',
    //   pn: 'Nikhil D Anand',
    //   // tr: '<your-transaction-reference-id>',
    //   // tn: 'Hi',
    // },
    paymentMethodTokenizationParameters: {
      parameters: {
        "gateway": "stripe",
        "stripe:version": "2022-11-15",
        "stripe:publishableKey": import.meta.VITE_APP_STRIPE_KEY
      }
    },
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

  // const button = new GooglePayButton({
  //   environment: 'TEST',
  //   buttonColor: 'white',
  //   buttonType: 'long',
  //   paymentDataRequest,
  //   onLoadPaymentData: paymentData => {
  //     console.log('PaymentData', paymentData);
  //     // send payment data to server for processing
  //   },
  //   onReadyToPayChange: result => {
  //     setIsReadyToPay(result.paymentMethodPresent && result.paymentMethodTypes.includes('UPI'));
  //   },
  // });

  const onReadyToPayChange = result => {
    console.log({ result })
    // setIsReadyToPay(result.paymentMethodPresent && result.paymentMethodTypes.includes('UPI'));
  }


  return (
    <div>
      <div className="demo">
        <div>
      {isReadyToPay ? (
        <GooglePayButton
          environment="PRODUCTION"
          buttonType="plain"
          buttonSizeMode="fill"
          paymentRequest={paymentRequest}
          onReadyToPayChange={onReadyToPayChange}
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
      ) : (
        <div>UPI payments are not supported on this device or location. Made by Nikhil</div>
      )}
    </div>
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
