import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../Api-Client"
import { useAppContext } from "../contexts/contextApp";
// import { useNavigate } from "react-router-dom";
const SignOut = ()=>{
    const queryClient = useQueryClient()
    // const navigateTo = useNavigate()
const {showToast} = useAppContext()
    const mutation = useMutation(apiClient.signOut,{
        onSuccess:async()=>{
            queryClient.invalidateQueries("validateToken")
            showToast({message: "User logged out successfully", type: "SUCCESS"})
            
        },
        onError:(error:Error)=>{
showToast({message: error.message,type:"ERROR"})
        }
    })

    const signOut = ()=>{
        mutation.mutate()
    }
    return (
        <button onClick={signOut} className="bg-white hover:bg-gray-400 text-[#004D] flex items-center font-bold rounded-md px-3">SignOut</button>
    )
}

export default SignOut;