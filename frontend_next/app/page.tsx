import ActionCardComponent from "@/components/ActionCards";
import CardComponent from "@/components/Cards";
import { Button } from "@/components/ui/button";
import { GroupService } from "@/services/group.service";
import { UserService } from "@/services/user.service";
import {
  Banknote,
  Building2,
  Calculator,
  ChartColumn,
  MonitorCog,
  Shield,
  User,
  Users,
} from "lucide-react";

const dummyActivity = [
  {
    icon:Shield,
    heading: "TRAIN Law 2025 tax rates updated",
    description: "Tax calculation now reflects latest Philippine tax brackets",
    time: "Today"
  },
  {
    icon:Users,
    iconColor: "blue",
    heading: "15 new employees added",
    description: "HR department completed onboarding process",
    time: "2 days ago"
  },
   {
    icon:Calculator,
    iconColor: "orange",
    heading: "Monthly tax calculations completed",
    description: "All employee tax computations processed successfully",
    time: "1 week ago"
  }
]

export default async function Home() {
  const {total: numberOfUsers,totalComputedTax,totalAnnualSalary} = await UserService.getPaginated();
  const { total: numberOfGroups } = await GroupService.getPaginated();

  return (
    <div className="py-5">
      <main className="flex flex-col gap-[10px] items-center sm:items-start">
        <h1 className="font-extrabold text-2xl">Dashboard Overview</h1>
        <div>
          <span>
            Welcome to our Tax Computation System. Here's what's happening
            today.
          </span>
        </div>

        {/* Cards */}
        <div className="w-full flex justify-between items-center gap-3 flex-col md:flex-row">
          <CardComponent
            heading="Number of users"
            icon={User}
            count={numberOfUsers}
          />
          <CardComponent
            heading="Number of groups"
            icon={Users}
            count={numberOfGroups}
          />
          <CardComponent
            heading="Total Annual salary"
            icon={Banknote}
            count={totalComputedTax}
          />
          <CardComponent
            heading="Computed Total Tax"
            icon={ChartColumn}
            count={totalAnnualSalary}
          />
        </div>

        {/* Quick Actions */}
        <div className="mt-5 w-full">
          <h1 className="font-bold text-2xl">Quick Actions</h1>
          <div className="flex gap-2 md:gap-10 justify-between flex-col md:flex-row py-3">
            <ActionCardComponent
              url={"users"}
              heading="Manage users"
              content="View and manage users income"
              icon={Users}
            />
            <ActionCardComponent
              url={"groups"}
              heading="Manage groups"
              content="View and manage groups"
              icon={Building2}
            />
            <ActionCardComponent
              url={"tax-calculator"}
              heading="Calculate Tax"
              content="Calculate the tax of users income"
              icon={Calculator}
            />
          </div>
        </div>

        {/* Recent Activity */}
        <div className="w-full">
          <h1 className="text-2xl font-bold">Recent activty</h1>
          <div className="shadow-lg p-5 border rounded-md">
            <div className="flex items-center gap-2 my-5">
              <MonitorCog size={30} />
              <p className="text-2xl font-extrabold">System Updates</p>
            </div>
            <div className="grid gap-4">
              {dummyActivity.map((activity, index) => { 
              return <div className="grid grid-cols-1 lg:grid-cols-6 items-center shadow-sm rounded-sm bg-slate-100 p-2 dark:bg-slate-800" key={index}>
                <div className="m-auto">
                  <activity.icon color={activity.iconColor} />
                </div>
                <div className="col-span-4">
                  <h1 className="font-bold">{activity.heading}</h1>
                  <p className="text-slate-500">
                    {activity.description}
                  </p>
                </div>
                <p className="text-center border-2 p-1 rounded-full font-semibold dark:text-slate-100">{activity.time}</p>
              </div>
              })}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
