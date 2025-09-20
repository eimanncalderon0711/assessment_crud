import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LucideIcon, Users } from "lucide-react";
import Link from "next/link";

type Props = {
    heading: string;
    icon:  LucideIcon;
    content: string;
    url: string;
}

export default function ActionCardComponent({heading, content, icon:Icon, url}: Props) {
  return (
    <div className="w-full">
    <Link href={url}>
      <Card className="hover:shadow-lg transition duration-300 ease-in-out">
        <CardContent className="flex items-center justify-center gap-5 flex-wrap">
          <div className="bg-slate-300 rounded-4xl p-2">
            <Icon color="#4c98b8"/>
          </div>
          <div>
            <p className="text-md font-bold">{heading}</p>
            <p className="text-slate-600">{content}</p>
          </div>
        </CardContent>
      </Card>
    </Link>
    </div>
  );
}