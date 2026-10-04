/* =========================================
   NARESH LIVE INN - MAIN JAVASCRIPT
   ========================================= */


document.addEventListener("DOMContentLoaded", function () {

    /* ================= CONFIGURATION ================= */

    const HOTEL_NAME = "NARESH Live Inn Guest House";

    const WHATSAPP_NUMBER = "919700621165";

    const UPI_ID = "9700621165@hdfc";


    /* ================= ELEMENTS ================= */

    const bookingForm =
        document.getElementById("bookingForm");

    const roomType =
        document.getElementById("roomType");

    const selectedRoom =
        document.getElementById("selectedRoom");

    const selectedAmount =
        document.getElementById("selectedAmount");

    const paymentAmount =
        document.getElementById("paymentAmount");

    const payUpiBtn =
        document.getElementById("payUpiBtn");

    const copyUpiBtn =
        document.getElementById("copyUpiBtn");

    const confirmPaymentBtn =
        document.getElementById("confirmPaymentBtn");


    /* ================= VARIABLES ================= */

    let currentRoom = "";

    let currentAmount = 0;


    /* ================= UPDATE ROOM ================= */

    function updateRoomDetails() {

        if (!roomType) {
            return;
        }

        const value = roomType.value;

        if (!value) {

            currentRoom = "";

            currentAmount = 0;

            if (selectedRoom) {
                selectedRoom.textContent = "Not selected";
            }

            if (selectedAmount) {
                selectedAmount.textContent = "₹0";
            }

            if (paymentAmount) {
                paymentAmount.textContent = "₹0";
            }

            return;
        }


        const parts = value.split("|");

        currentRoom = parts[0];

        currentAmount = Number(parts[1]) || 0;


        if (selectedRoom) {
            selectedRoom.textContent = currentRoom;
        }


        if (selectedAmount) {
            selectedAmount.textContent =
                "₹" + currentAmount.toLocaleString("en-IN");
        }


        if (paymentAmount) {
            paymentAmount.textContent =
                "₹" + currentAmount.toLocaleString("en-IN");
        }

    }


    /* ================= ROOM SELECT CHANGE ================= */

    if (roomType) {

        roomType.addEventListener(
            "change",
            updateRoomDetails
        );

    }


    /* ================= ROOM CARD BUTTONS ================= */

    const roomButtons =
        document.querySelectorAll(".book-room-btn");


    roomButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            const room =
                button.getAttribute("data-room");

            const price =
                button.getAttribute("data-price");


            if (roomType) {

                roomType.value =
                    room + "|" + price;

                updateRoomDetails();

            }


            const bookingSection =
                document.getElementById("booking");


            if (bookingSection) {

                bookingSection.scrollIntoView({
                    behavior: "smooth"
                });

            }

        });

    });


    /* ================= WHATSAPP FUNCTION ================= */

    function openWhatsApp(message) {

        const encodedMessage =
            encodeURIComponent(message);


        const whatsappURL =
            "https://wa.me/" +
            WHATSAPP_NUMBER +
            "?text=" +
            encodedMessage;


        /*
         * Direct navigation works more reliably
         * than some popup methods in hosted websites.
         */

        window.location.href = whatsappURL;

    }


    /* ================= BOOKING ================= */

    if (bookingForm) {

        bookingForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();


                const fullName =
                    document.getElementById("fullName").value.trim();


                const phone =
                    document.getElementById("phone").value.trim();


                const checkIn =
                    document.getElementById("checkIn").value;


                const room =
                    document.getElementById("roomType").value;


                if (!fullName) {

                    alert("Please enter your full name.");

                    return;

                }


                if (!phone) {

                    alert("Please enter your phone number.");

                    return;

                }


                if (!checkIn) {

                    alert("Please select your check-in date.");

                    return;

                }


                if (!room) {

                    alert("Please select a room type.");

                    return;

                }


                const roomParts =
                    room.split("|");


                const roomName =
                    roomParts[0];


                const amount =
                    Number(roomParts[1]) || 0;


                const message =
                    "🏨 *Booking Request - " +
                    HOTEL_NAME +
                    "*\n\n" +

                    "👤 *Name:* " +
                    fullName +
                    "\n" +

                    "📱 *Phone:* " +
                    phone +
                    "\n" +

                    "📅 *Check-in:* " +
                    checkIn +
                    "\n" +

                    "🛏️ *Room:* " +
                    roomName +
                    "\n" +

                    "💰 *Room Price:* ₹" +
                    amount.toLocaleString("en-IN") +
                    " / day\n\n" +

                    "Please confirm room availability.";


                openWhatsApp(message);

            }
        );

    }


    /* ================= PAY VIA UPI ================= */

    if (payUpiBtn) {

        payUpiBtn.addEventListener(
            "click",
            function () {

                if (!currentAmount || currentAmount <= 0) {

                    alert(
                        "Please select a room first to set the payment amount."
                    );

                    return;

                }


                const upiURL =
                    "upi://pay" +

                    "?pa=" +
                    encodeURIComponent(UPI_ID) +

                    "&pn=" +
                    encodeURIComponent(HOTEL_NAME) +

                    "&am=" +
                    encodeURIComponent(
                        currentAmount.toFixed(2)
                    ) +

                    "&cu=INR";


                /*
                 * This opens the UPI app chooser
                 * on supported mobile devices.
                 */

                window.location.href = upiURL;

            }
        );

    }


    /* ================= COPY UPI ================= */

    if (copyUpiBtn) {

        copyUpiBtn.addEventListener(
            "click",
            async function () {

                try {

                    await navigator.clipboard.writeText(
                        UPI_ID
                    );

                    alert(
                        "UPI ID copied: " +
                        UPI_ID
                    );

                }

                catch (error) {

                    /*
                     * Fallback for browsers where
                     * Clipboard API is unavailable.
                     */

                    const tempInput =
                        document.createElement("input");

                    tempInput.value = UPI_ID;

                    document.body.appendChild(
                        tempInput
                    );

                    tempInput.select();

                    document.execCommand("copy");

                    document.body.removeChild(
                        tempInput
                    );

                    alert(
                        "UPI ID copied: " +
                        UPI_ID
                    );

                }

            }
        );

    }


    /* ================= PAYMENT CONFIRMATION ================= */

    if (confirmPaymentBtn) {

        confirmPaymentBtn.addEventListener(
            "click",
            function () {

                if (!currentAmount || currentAmount <= 0) {

                    alert(
                        "Please select your room first."
                    );

                    return;

                }


                const message =
                    "💳 *Payment Confirmation - " +
                    HOTEL_NAME +
                    "*\n\n" +

                    "🛏️ *Room:* " +
                    currentRoom +
                    "\n" +

                    "💰 *Amount:* ₹" +
                    currentAmount.toLocaleString("en-IN") +
                    "\n\n" +

                    "I have made the UPI payment. " +
                    "Please verify the payment and confirm my booking.";


                openWhatsApp(message);

            }
        );

    }


    /* ================= SET MINIMUM DATE ================= */

    const checkIn =
        document.getElementById("checkIn");


    if (checkIn) {

        const today =
            new Date();


        const year =
            today.getFullYear();


        const month =
            String(today.getMonth() + 1)
                .padStart(2, "0");


        const day =
            String(today.getDate())
                .padStart(2, "0");


        const todayString =
            year + "-" + month + "-" + day;


        checkIn.min =
            todayString;

    }


    /* ================= INITIAL UPDATE ================= */

    updateRoomDetails();

});