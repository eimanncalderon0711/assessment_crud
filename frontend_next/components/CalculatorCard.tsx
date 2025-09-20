'use client';
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { User } from "@/types/user";
import { Calculator } from "lucide-react"
import { Dispatch, SetStateAction, useState } from "react";

type Props = {
  user?: User;
  annualTax: number;
  setUser: Dispatch<SetStateAction<User | undefined>>;
  computeAnnualTax: (id: number) => void; 
}

export function CalculatorCard({user, setUser, computeAnnualTax, annualTax}: Props) {
  return (
    <Card className="w-full max-w-lg h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2"><Calculator/> Calculate Annual Income Tax</CardTitle>
        <CardDescription>
          Enter annual salary to calculate income tax based on TRAIN Law rates
        </CardDescription>
      </CardHeader>
      <CardContent>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Monthly Salary</Label>
              <Input
                value={user?.monthlySalary ?? ""}
                onChange={(e) =>
                  setUser((prev) =>
                    prev
                      ? { ...prev, monthlySalary: Number(e.target.value) }
                      : undefined
                  )
                }
                type="number"
                placeholder="₱3500000"
                required
              />
            </div>
          </div>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <div className="self-start">
          <span className="font-bold">{user?.name}</span>
          <p>₱{annualTax}</p>
        </div>
        <Button onClick={() => computeAnnualTax(user!.id)} className="w-full bg-sky-600">
          Calculate Tax
        </Button>
      </CardFooter>
    </Card>
  )
}
