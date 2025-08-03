"use client"
import React, { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { fetchUser, updateProfile } from "@/actions/useractions"
import { ToastContainer, toast, Bounce } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { useRouter } from "next/navigation"

const Dashboard = () => {
  const { data: session } = useSession()
  const router = useRouter()
  const [form, setForm] = useState({})

  useEffect(() => {
    if (!session) router.push("/login")
    else getData()
  }, [router, session])

  const getData = async () => {
    const u = await fetchUser(session.user.name)
    setForm(u)
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const result = await updateProfile(form, session.user.name)
    if (result?.error) {
      toast.error(result.error, { position: "top-right", theme: "light", transition: Bounce })
    } else {
      toast.success("Profile Updated", {
        position: "top-right",
        autoClose: 5000,
        theme: "light",
        transition: Bounce,
      })
    }
  }

  return (
    <>
      <ToastContainer />
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-center mb-10 text-3xl font-bold">
          Welcome to your Coffee Dashboard ☕
        </h1>
        <form
          className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6"
          onSubmit={handleSubmit}
        >
          {[
            { name: "name", label: "Full Name" },
            { name: "email", label: "Email Address" },
            { name: "username", label: "Username" },
            { name: "profilepic", label: "Profile Picture URL" },
            { name: "coverpic", label: "Cover Picture URL" },
            { name: "razorpayid", label: "Razorpay ID" },
            { name: "razorpaysecret", label: "Razorpay Secret" },
          ].map((field) => (
            <div key={field.name}>
              <label
                htmlFor={field.name}
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                {field.label}
              </label>
              <input
                value={form[field.name] || ""}
                onChange={handleChange}
                type="text"
                name={field.name}
                id={field.name}
                className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
              />
            </div>
          ))}
          <div className="md:col-span-2">
            <button
              type="submit"
              className="w-full p-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium text-sm"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </>
  )
}

export default Dashboard
