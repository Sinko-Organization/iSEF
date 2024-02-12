import { Warning } from "@mui/icons-material";
import { Alert, AlertTitle, Tooltip } from "@mui/material";
import type { FC } from "react";

interface FormErrorProps {
    messages: Array<string>

}

const FormError: FC<FormErrorProps> = ({ messages }) => {

    if (messages.length === 0) return <div></div>
    else {
        return (
            // <div className="flex justify-center items-center h-screen">
            <>

                {messages.map(message => (
                    <Alert severity="error" >
                        {message}
                    </Alert >
                ))}

            </>
            // </div>
        );
    }

};

export default FormError;
