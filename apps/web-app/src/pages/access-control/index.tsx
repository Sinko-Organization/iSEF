import { AccessControlTable } from "@web-app/components/tables";
import { NextPage } from "next";


const AccessControlPage: NextPage = () => {
    const testUsers = [
        {
            email: "user1@example.com",
            role: "admin",
        },
        {
            email: "user2@example.com",
            role: null,
        },
    ];


    return (
        <div className="mx-32 fontsans mt-10">
            <AccessControlTable users={testUsers}/>
        </div>
    );
};

export default AccessControlPage;