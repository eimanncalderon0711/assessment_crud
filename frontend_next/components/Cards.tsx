import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

type Props = {
    heading: string,
    icon:  LucideIcon;
    count: number
}

export default function CardComponent({icon:Icon, heading, count}: Props) {
  return (
    <div className="w-full">
      <Card className="hover:shadow-lg transition duration-300 ease-in-out">
        <CardHeader>
          <CardTitle className="flex items-center gap-3"><Icon className="w-6 h-6 text-sky-600" strokeWidth={2.5}/>{heading}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">{count}</p>
        </CardContent>
      </Card>
    </div>
  );
}
