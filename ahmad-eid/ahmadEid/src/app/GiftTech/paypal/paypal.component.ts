import { AfterViewInit, Component } from '@angular/core';
import { Firestore, collection, addDoc } from 'firebase/firestore';

declare var paypal: any;

@Component({
  selector: 'app-paypal',
  templateUrl: './paypal.component.html',
  standalone:true,
  styleUrls: ['./paypal.component.scss']
})
export class PaypalComponent implements AfterViewInit {

  constructor(private firestore: Firestore) {}

  ngAfterViewInit(): void {
    const script = document.createElement('script');
    script.src = 'https://www.paypal.com/sdk/js?client-id=AUbSBRgTwzrV5fBWLjorQO5Rl7d1gd8AkMte5YrICg3-uodBpwY5FuTdnoZcZuitBIHtvSTpk_rxhUdi'; 
    script.onload = () => {
      paypal.Buttons({
        createOrder: (data: any, actions: any) => {
          return actions.order.create({
            purchase_units: [{
              amount: { value: '0.06' } // Change to your dynamic amount
            }]
          });
        },
        onApprove: async (data: any, actions: any) => {
          const order = await actions.order.capture();
          console.log('Payment Successful!', order);

          // Save transaction to Firestore
          const paymentsRef = collection(this.firestore, 'payments');
          await addDoc(paymentsRef, {
            orderId: order.id,
            payer: order.payer.name.given_name,
            amount: order.purchase_units[0].amount.value,
            currency: order.purchase_units[0].amount.currency_code,
            status: order.status,
            createdAt: new Date()
          });

          alert('Payment Successful!');
        },
        onError: (err: any) => {
          console.error('PayPal Error:', err);
          alert('Payment failed! Try again.');
        }
      }).render('#paypal-button-container');
    };
    document.body.appendChild(script);
  }
}

