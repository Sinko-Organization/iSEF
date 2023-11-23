import { EducationLoader } from "@web-app/components/loaders";
import { AccessControlTable, HonorsListTable } from "@web-app/components/tables";
import { NextPage } from "next";

const AccessControlPage: NextPage = () => {
    return (
        <div className="mx-32 fontsans mt-10">
            <AccessControlTable/>
        </div>
    );
};

export default AccessControlPage;