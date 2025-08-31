package com.example.BraillLite20.Service;

import com.example.BraillLite20.Entity.Donor;
import com.stripe.exception.StripeException;
import com.stripe.model.checkout.Session;
import com.stripe.param.checkout.SessionCreateParams;
import org.springframework.stereotype.Service;


@Service
public class StripeService {

    public Session createCheckoutSession(Donor donor) throws StripeException {
        SessionCreateParams params =
                SessionCreateParams.builder()
                        .setMode(SessionCreateParams.Mode.PAYMENT)
                        .setSuccessUrl("http://localhost:8080/api/payment/success?session_id={CHECKOUT_SESSION_ID}")
                        .setCancelUrl("http://localhost:8080/api/payment/cancel")
                        .addLineItem(
                                SessionCreateParams.LineItem.builder()
                                        .setQuantity(1L)
                                        .setPriceData(
                                                SessionCreateParams.LineItem.PriceData.builder()
                                                        .setCurrency("inr")
                                                        .setUnitAmount((long) (donor.getAmount() * 100))
                                                        .setProductData(
                                                                SessionCreateParams.LineItem.PriceData.ProductData.builder()
                                                                        .setName("Donation for BraiLite")
                                                                        .build()
                                                        )
                                                        .build()
                                        )
                                        .build()
                        )
                        .putMetadata("donorId", String.valueOf(donor.getId()))
                        .build();

        return Session.create(params);
    }
}
