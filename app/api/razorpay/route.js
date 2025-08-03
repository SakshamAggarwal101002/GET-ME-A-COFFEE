// import { NextResponse } from "next/server";
// import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils";
// import Payment from "@/models/Payment";
// import Razorpay from "razorpay";
// import User from "@/models/User";
// import connectDb from "@/db/connectDb";
// export const POST = async (req)=>{
//     await connectDb()
//     let body = await req.formData()
//     body = Object.fromEntries(body)
//     // Check if razorpayOrderID is present on the server
//     let p = await Payment.findOne({oid : body.razorpay_order_id})
//     if (!p){
//         return NextResponse.json({success : false, message :"Order Id not found"})
//     }
//     // Verify the payment
//     let user = await User.findOne({username:to_username})
//       let secret = user.razorpaysecret
//       let id = user.razorpayid
//     let xx = validatePaymentVerification({"order_id":body.razorpay_order_id,"payment_id":body.razorpay_payment_id},body.razorpay_signature,secret)
//     if (xx){
//         const updatedPayment = await Payment.findOneAndUpdate({oid : body.razorpay_order_id},{done: "true"},{new:true})
//         return NextResponse.redirect(`${process.env.NEXT_PUBLIC_URL}/${updatedPayment.to_user}?paymentdone=true`)
//     }
//     else{
//         return NextResponse.json({success:false,message:'Payment Verification Failed'})
//     }

// }

import { NextResponse } from "next/server";
import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils";
import Payment from "@/models/Payment";
import Razorpay from "razorpay";
import User from "@/models/User";
import connectDb from "@/db/connectDb";

export const POST = async (req) => {
  try {
    await connectDb();

    let form = await req.formData();
    const body = Object.fromEntries(form);

    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = body;

    // Find payment order by ID
    const paymentRecord = await Payment.findOne({ oid: razorpay_order_id });
    if (!paymentRecord) {
      return NextResponse.json({ success: false, message: "Order Id not found" });
    }

    // Get to_username from payment record
    const to_username = paymentRecord.to_user;
    if (!to_username) {
      return NextResponse.json({ success: false, message: "Username not associated with payment" });
    }

    // Fetch user and get Razorpay secret
    const user = await User.findOne({ username: to_username });
    if (!user) {
      return NextResponse.json({ success: false, message: "User not found" });
    }

    const secret = user.razorpaysecret;

    // Validate Razorpay payment
    const isValid = validatePaymentVerification(
      {
        order_id: razorpay_order_id,
        payment_id: razorpay_payment_id,
      },
      razorpay_signature,
      secret
    );

    if (isValid) {
      const updatedPayment = await Payment.findOneAndUpdate(
        { oid: razorpay_order_id },
        {
          done: true,
          payment_id: razorpay_payment_id,
        },
        { new: true }
      );

      return NextResponse.redirect(`${process.env.NEXT_PUBLIC_URL}/${updatedPayment.to_user}?paymentdone=true`);
    } else {
      return NextResponse.json({ success: false, message: "Payment Verification Failed" });
    }
  } catch (error) {
    console.error("Payment verification error:", error);
    return NextResponse.json({ success: false, message: "Server error", error: error.message });
  }
};
