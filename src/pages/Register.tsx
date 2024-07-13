import { useForm, } from "react-hook-form"
import { useMutation, useQueryClient } from "react-query"
import * as apiClient from "../Api-Client"
import { useAppContext } from "../contexts/contextApp"
import { useNavigate } from "react-router-dom"
export type userRegisterData = {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    confirmPassword: string
}
const Register = () => {
    const queryClient = useQueryClient()
    const navigateTo = useNavigate()
    const { showToast } = useAppContext()

    const { register, watch, handleSubmit, formState: { errors } } = useForm<userRegisterData>()

    const mutation = useMutation(apiClient.register, {
        onSuccess: async () => {
            showToast({ message: "Register Successfull!", type: "SUCCESS" })
            await queryClient.invalidateQueries("validateToken")
            navigateTo("/")
        },
        onError: (error: Error) => {
            showToast({ message: error.message, type: "ERROR" })
        }
    })

    const registerHandler = handleSubmit((data) => {
        mutation.mutate(data)
    })
    return (
        <form className="  t flex flex-col gap-5" onSubmit={registerHandler}>
            <h1 className="text-3xl font-bold" >Register here</h1>
            <div className=" flex  flex-col md:flex-row gap-5">
                <label className="flex-1  font-bold text-sm ">
                    FirstName
                    <input className="text-normal bg-gray-700 px-2 py-1 border rounded w-full"
                        {...register("firstName", { required: "this field is required" })}
                    ></input>
                    {errors.firstName && (
                        <span className="text-red-500">{errors.firstName.message}</span>
                    )}
                </label>
                <label className="flex-1  font-bold text-sm  ">
                    Last Name
                    <input className="text-normal bg-gray-700 px-2 py-1 border rounded w-full"
                        {...register("lastName", { required: "this field is required" })}
                    ></input>
                    {errors.lastName && (
                        <span className="text-red-500">{errors.lastName.message}</span>
                    )}
                </label>
            </div>
            <label className="flex-1  font-bold text-sm ">
                Email
                <input
                    type="email"
                    className="text-normal bg-gray-700 px-2 py-1 border rounded w-full"
                    {...register("email", { required: "this field is required" })}
                ></input>
                {errors.email && (
                    <span className="text-red-500">{errors.email.message}</span>
                )}
            </label>
            <label className="flex-1 font-bold text-sm ">
                Password
                <input
                    type="password"
                    className="text-normal bg-gray-700 px-2 py-1 border rounded w-full"
                    {...register("password", { required: "this field is required", minLength: { value: 6, message: "password must be at least 6 characters" } })}
                ></input>
                {errors.password && (
                    <span className="text-red-500">{errors.password.message}</span>
                )}
            </label>
            <label className="flex-1  font-bold text-sm ">
                Confirm Password
                <input
                    type="password"
                    className="text-normal bg-gray-700  px-2 py-1 border rounded w-full"
                    {...register("confirmPassword", {
                        validate: (val) => {
                            if (!val) {
                                return "this field is required"
                            } else if (watch("password") !== val) {
                                return "your password do not match"
                            }

                        }
                    })}
                ></input>
                {errors.confirmPassword && (
                    <span className="text-red-500">{errors.confirmPassword.message}</span>
                )}
            </label>
            <span>
                <button type="submit" className="bg-[#2a7899bc] text-white p-2 rounded font-bold hover:bg-[#009D]">Create Account</button>
            </span>
        </form>
    )
}
export default Register