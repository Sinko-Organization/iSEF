import { AccessControlTable } from "@web-app/components/tables";
import { trpc } from "@web-app/utils/trpc";
import AdminError from "@web-app/components/errors/AdminError";
import { EducationLoader } from "@web-app/components/loaders";
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

    const { data: user, error } = trpc.useQuery(["user.role"]);
    const { data: admins, error: adminsError } = trpc.useQuery(["user.getAll"]);


    if (!admins) {
        return <EducationLoader />
    }

    if (user?.role == "superadmin") {
        return (
            <div className="mx-32 fontsans mt-10">
                <AccessControlTable users={admins}/>
            </div>
        );
    } else {
        return <AdminError />
    }


    
};

export default AccessControlPage;