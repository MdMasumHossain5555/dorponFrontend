import React from "react";
import MonthlySalesChart from "./compoments/ecommerce/MonthlySalesChart";
import MonthlyTarget from "./compoments/ecommerce/MonthlyTarget";
import StatisticsChart from "./compoments/ecommerce/StatisticsChart";
import RecentOrders from "./compoments/ecommerce/RecentOrders";
import { EcommerceMetrics } from "./compoments/ecommerce/EcommerceMetrics";

function Admin() {
  return (
    <>
      <div className="mb-6">
        <EcommerceMetrics />
      </div>

      <div className="grid grid-cols-12 gap-4 md:gap-6">
        <div className="col-span-12 space-y-6 xl:col-span-7">
          <MonthlySalesChart />
        </div>

        <div className="col-span-12 xl:col-span-5">
          <MonthlyTarget />
        </div>

        <div className="col-span-12">
          <StatisticsChart />
        </div>

        {/* <div className="col-span-12 xl:col-span-5">
        <DemographicCard />
      </div> */}

        <div className="col-span-12 xl:col-span-7">
          <RecentOrders />
        </div>
      </div>
    </>
  );
}

export default Admin;
