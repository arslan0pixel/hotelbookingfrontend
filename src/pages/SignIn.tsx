import { useForm } from "react-hook-form"
import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../Api-Client"
import { useAppContext } from "../contexts/contextApp";
import { Link, useLocation, useNavigate } from "react-router-dom";
export type signInFormData = {
    email: string;
    password: string;
}
const SignIn = () => {
    const queryClient = useQueryClient();
    const { register, handleSubmit, formState: { errors } } = useForm<signInFormData>()
    const { showToast } = useAppContext()
    const navigateTo = useNavigate()
const location  = useLocation()
    const mutation = useMutation(apiClient.signIn, {
        onSuccess: async () => {

            showToast({ message: "Sign In Success", type: "SUCCESS" })
            await queryClient.invalidateQueries("validateToken")
            navigateTo(location.state?.from?.pathname || "/")
        },
        onError: (error: Error) => {
            showToast({ message: error.message, type: "ERROR" })
        }
    })

    const signInHandler = handleSubmit((data) => {
        mutation.mutate(data)
    })
    return (
        <form className="flex flex-col gap-5" onSubmit={signInHandler}>
            <h2 className=" heading text-2xl text-white">SignIn</h2>
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
            <span className="flex items-center justify-between">
                <span className="text-sm">
                  
                not registered ? <Link 
                className="text-blue500 hover:underline  " to="/register">create an account here</Link>
                </span>
                <button type="submit" className="bg-[#2a7899bc] text-white p-2 rounded font-bold hover:bg-[#009D]">Login</button>
            </span>
        </form>
    )
}

export default SignIn;