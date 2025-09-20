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

const taxBrackets:{amountInfo: string, taxInfo:string}[] = [
  {
    amountInfo:"Up to ₱250,000",
    taxInfo:"Tax Exempt (0%)"
  },
  {
    amountInfo:"₱250,001 - ₱400,000",
    taxInfo:"15% on excess over ₱250,000"
  },
  {
    amountInfo:"₱400,001 - ₱800,000",
    taxInfo:"₱22,500 + 20% on excess over ₱400,000"
  },
  {
    amountInfo:"₱800,001 - ₱2,000,000",
    taxInfo:"₱102,500 + 25% on excess over ₱800,000"
  },
  {
    amountInfo:"₱2,000,001 - ₱8,000,000",
    taxInfo:"₱402,500 + 30% on excess over ₱2,000,000"
  },
  {
    amountInfo:"Over ₱8,000,000",
    taxInfo:"₱2,202,500 + 35% on excess"
  },
]

export function TaxBracketCard() {
  return (
    <Card className="w-full mt-5">
      <CardHeader>
        <CardTitle>Tax Brackets (TRAIN Law 2025)</CardTitle>
        <CardDescription>
          Philippine income tax rates for individuals
        </CardDescription>
      </CardHeader>
      <CardContent>
        {taxBrackets.map((taxInfo, index) => {
          return <div key={index} className="flex justify-between items-start border-b-2 sm:items-center flex-col my-5 sm:flex-row">
          <p className=" font-medium">{taxInfo.amountInfo}</p>
          <p>{taxInfo.taxInfo}</p>
        </div>
        })}
      </CardContent>
    </Card>
  )
}
