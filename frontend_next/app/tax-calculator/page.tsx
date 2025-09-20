'use client';
import { CalculatorCard } from "@/components/CalculatorCard";
import { TableWithSearch } from "@/components/TableWithSearch";
import { TaxBracketCard } from "@/components/TaxBracketCard";
import { TaxService } from "@/services/tax.service";
import { User } from "@/types/user";
import { useState } from "react";

export default function TaxCalculator(){
    const [user, setUser] = useState<User | undefined>(undefined);
    const [annualTax, setAnnualTax] = useState<number>(0);
    
    const selectUserToCompute = (userData: User) => {
        setUser(userData)
    }

    const computeAnnualTax = async (id: number) => {
        const res = await TaxService.computeTax(id);
        setAnnualTax(res.tax)
    }

    return (
        <div className="py-5">
           <header>
                <h1 className="font-extrabold text-2xl">Tax Calculator</h1>
                <p className="text-slate-600">Calculate annual income tax based on Philippine TRAIN Law 2025</p>
           </header>
           <main className="mt-5">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
                <div className="">
                    <CalculatorCard user={user} setUser={setUser} computeAnnualTax={computeAnnualTax} annualTax={annualTax}/>
                </div>
                {/* Create a table here with search */}
                <div>
                    <TableWithSearch selectUserToCompute={selectUserToCompute}/>
                </div>
            </div>
            <TaxBracketCard/>
           </main>
        </div>
    )
}