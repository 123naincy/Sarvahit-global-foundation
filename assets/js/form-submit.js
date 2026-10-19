const SCRIPT_URL =
    "https://script.google.com/macros/s/AKfycbxUxpv_jrehwgxlV-DhZ_WCCCOyC9iuHcht8yQuonbsA4csr1rINXNSzbDgznoKYGf9/exec";


function submitToGoogleSheet(form, formType) {

    form.addEventListener("submit", async function (event) {

        event.preventDefault();

        const submitButton =
            form.querySelector('button[type="submit"]');

        const originalText =
            submitButton.innerHTML;

        submitButton.disabled = true;

        submitButton.innerHTML =
            'Sending... <i class="fa-solid fa-spinner fa-spin"></i>';


        const data = {

            formType: formType,

            fullName:
                form.querySelector('[name="full-name"]')?.value ||
                form.querySelector('[name="name"]')?.value ||
                "",

            email:
                form.querySelector('[name="c-email"]')?.value ||
                form.querySelector('[name="email"]')?.value ||
                "",

            phone:
                form.querySelector('[name="phone-number"]')?.value ||
                form.querySelector('[name="phone"]')?.value ||
                "",

            purpose:
                form.querySelector('[name="purpose"]')?.value ||
                "",

            message:
                form.querySelector('[name="contact-message"]')?.value ||
                form.querySelector('[name="message"]')?.value ||
                "",

            donationAmount:
                form.querySelector('[name="donation-amount"]')?.value ||
                "",

            paymentMethod:
                form.querySelector(
                    '[name="donation-payment"]:checked'
                )?.value ||
                "",

            pageUrl:
                window.location.href

        };


        console.log("Sending Lead:", data);


        try {

            await fetch(SCRIPT_URL, {

                method: "POST",

                mode: "no-cors",

                headers: {
                    "Content-Type":
                        "text/plain;charset=utf-8"
                },

                body: JSON.stringify(data)

            });


            form.reset();

            window.location.href =
                "thankyou.html";


        } catch (error) {

            console.error(
                "Form submission error:",
                error
            );

            alert(
                "Unable to submit form. Please try again."
            );

            submitButton.disabled = false;

            submitButton.innerHTML =
                originalText;

        }

    });

}