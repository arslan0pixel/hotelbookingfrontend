import { useEffect } from "react";

type toastProps={
    message: string;
    type:"SUCCESS" | "ERROR";
    onClose: ()=> void;
}

const Toast = ({message, type, onClose}:toastProps)=>{

useEffect(()=>{
    const timer  = setTimeout(() => {
        onClose()
    }, 5000);
  return   ()=>{
    clearTimeout(timer)
  }
}, [onClose])

    const styles = type === "SUCCESS" ? " fixed right-4 top-4 z-50 rounded-md bg-green-700 text-white  max-w-md " :  " fixed right-4 top-4 z-50 rounded-md bg-red-700 text-white  max-w-md "
return(
    <div className={styles}>
        <div className="flex items-center justify-center ">
<span className="font-semibold  text-lg  ">{message}</span>
        </div>
    </div>
)
}

export default Toast;