import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { Separator } from "@radix-ui/react-separator";
import { Users, PersonStanding, Home, Landmark, Calculator} from "lucide-react";
import Link from "next/link";

// Menu items.
const items = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Users",
    url: "/users",
    icon: PersonStanding,
  },
  {
    title: "Groups",
    url: "/groups",
    icon: Users,
  },
  {
    title: "Tax Calculator",
    url: "/tax-calculator",
    icon: Calculator,
  },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader className="flex-row items-center justify-center mt-5 font-extrabold border-b pb-3">
        <Landmark />
        Tax Manager
      </SidebarHeader>
      <SidebarContent className="mx-2">
        <SidebarGroup />
        <SidebarGroupLabel>Navigations</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            {items.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                  <Link href={item.url}>
                    <item.icon />
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
