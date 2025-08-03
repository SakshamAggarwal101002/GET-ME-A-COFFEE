"use server"
import Razorpay from "razorpay"
import Payment from "@/models/Payment"
import connectDb from "@/db/connectDb"
import User from "@/models/User"

export const initiate = async (amount, to_username, paymentform) => {
  await connectDb()
  let user = await User.findOne({ username: to_username })
  let secret = user.razorpaysecret
  let id = user.razorpayid
  const instance = new Razorpay({
    key_id: id,
    key_secret: secret,
  })

  const options = {
    amount: Number.parseInt(amount),
    currency: "INR",
  }

  const order = await instance.orders.create(options)

  await Payment.create({
    oid: order.id,
    amount: amount / 100,
    to_user: to_username,
    name: paymentform.name,
    message: paymentform.message,
  })

  return order
}

// export const fetchUser = async (username) => {
//   await connectDb()
//   const u = await User.findOne({ username })
//   if (!u) {
//     console.error(`User not found for username: ${username}`)
//     return null
//   }
//   return JSON.parse(JSON.stringify(u))
// }
export const fetchUser = async (username) => {
  await connectDb()
  const u = await User.findOne({ username }).lean()
  if (!u) {
    console.error(`User not found for username: ${username}`)
    return null
  }
  // return u
    return JSON.parse(JSON.stringify(u))
}

// export const fetchPayments = async (username) => {
//   await connectDb()
//   const payments = await Payment.find({ to_user: username, done: true })
//     .sort({ amount: -1 })
//     .limit(10)
//     .lean()
//   return payments
// }

export const fetchPayments = async (username) => {
  await connectDb()
  const payments = await Payment.find({ to_user: username, done: true })
    .sort({ amount: -1 })
    .limit(10)
    .lean()
  // return payments
  return JSON.parse(JSON.stringify(payments))

}

export const updateProfile = async (ndata, oldusername) => {
  await connectDb()

  if (oldusername !== ndata.username) {
    let u = await User.findOne({ username: ndata.username })
    if (u) {
      return { error: "User name already exists" }
    }
    await User.updateOne({ email: ndata.email }, ndata)
    await Payment.updateMany({ to_user: oldusername }, { to_user: ndata.username })
  } else {
    await User.updateOne({ email: ndata.email }, ndata)
  }

  return { success: true }
}
