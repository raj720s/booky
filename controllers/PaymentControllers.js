import Room from "../models/roomsModel";
import userModel from "../models/userModel";
import bookingModel from "../models/bookingModel";
import catchAsync from "../middlewares/asyncError";
import absoluteUrl from "next-absolute-url";
const stripe = require("stripe")(process.env.STRIPE_SECRET);
import getRawBody from "raw-body";
// /check_out
export const stripeCheckOutSessionController = catchAsync(async (req, res) => {
  const { origin } = absoluteUrl(req);
  const { checkInDate, checkOutDate, daysOfStay } = req.query;
  // get room details by id
  const room = await Room.findById(req.query.roomId);
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    success_url: `${origin}/bookings/mybookings`,
    cancel_url: `${origin}/rooms/${room._id}`,
    customer_email: req.user.email,
    client_reference_id: req.query.roomId,
    metadata: { checkInDate, checkOutDate, daysOfStay },
    line_items: [
      {
        name: room.name,
        images: [`${room.images[0].url}`],
        amount: req.query.amount * 100,
        currency: "usd",
        quantity: 1,
      },
    ],
  });
  if (room && session) {
    res.status(200).json(session);
  } else {
    res.status(400).json({
      msg: "bad request",
    });
  }
});
// /api/webhook
export const hook_checkout = catchAsync(async (req, res) => {
  // const rawBody = await getRawBody(req);

  // try {
  //   const signature = req.headers["stripe-signature"];
  //   const event = stripe.webhooks.constructEvent(
  //     rawBody,
  //     signature,
  //     process.env.STRIPE_HOOK_SECRET
  //   );
  //   if (event.type === "checkout.session.completed") {
  //     const session = event.data.object;
  //     const room = session.client_reference_id;
  //     const user = await userModel.findOne({ email: session.customer_email })
  //       .id;
  //     const amountPaid = session.amount_total / 100;
  //     const paymentInfo = {
  //       id: session.payment_intent,
  //       status: session.payment_status,
  //     };
  //     const checkInDate = session.metadata.checkInDate;
  //     const checkOutDate = session.metadata.checkOutDate;
  //     const daysOfStay = session.metadata.daysOfStay;
  //     const booking = await bookingModel.create({
  //       room,
  //       user,
  //       checkInDate,
  //       checkOutDate,
  //       daysOfStay,
  //       amountPaid,
  //       paymentInfo,
  //       paidAt: Date.now(),
  //     });
  //     res.status(200).json({
  //       msg: "paid",
  //       booking,
  //     });
  //   }
  // } catch (err) {
  //   console.log("Error in Stripe Checkout Payment => ", err);
  // }
  const rawBody = await getRawBody(req);

  try {
    const signature = req.headers["stripe-signature"];

    const event = stripe.webhooks.constructEvent(
      rawBody,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;

      const room = session.client_reference_id;
      const user = (await User.findOne({ email: session.customer_email })).id;

      const amountPaid = session.amount_total / 100;

      const paymentInfo = {
        id: session.payment_intent,
        status: session.payment_status,
      };

      const checkInDate = session.metadata.checkInDate;
      const checkOutDate = session.metadata.checkOutDate;
      const daysOfStay = session.metadata.daysOfStay;

      const booking = await Booking.create({
        room,
        user,
        checkInDate,
        checkOutDate,
        daysOfStay,
        amountPaid,
        paymentInfo,
        paidAt: Date.now(),
      });

      res.status(200).json({ success: true });
    }
  } catch (error) {
    console.log("Error in Stripe Checkout Payment => ", error);
  }
});
