// import { useState } from "react";
// import AirplaneTypeSection from "@/pages/admin/components/AirplaneTypeSection";
// import AirplaneSection from "@/pages/admin/components/AirplaneSection";
// import RepairChapterSection from "@/pages/admin/components/RepairChapterSection";
import RepairLocationSection from "@/pages/admin/components/RepairLocationSection";

const AdminPage = () => {

    return(
        <div className="p-4 mx-auto">
            {/* <AirplaneTypeSection /> */}
            {/* <AirplaneSection /> */}
            {/* <RepairChapterSection /> */}
            <RepairLocationSection />
        </div>
    );
}

export default AdminPage;