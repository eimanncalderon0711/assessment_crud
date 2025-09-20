'use client';
import * as React from "react"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Group } from "@/types/group";

type Props = {
  selectGroup: Group[],
  value: string | null,
  onChange: (value: string | null) => void;
}

export function SelectScrollable({selectGroup, onChange, value}: Props) {
  return (
    <Select value={value ?? ""} onValueChange={(value) => onChange(value)}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select Group" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Select Group</SelectLabel>
          {selectGroup.map((group) => {
            return <SelectItem key={group.id} value={group.id.toString()}>{group.name}</SelectItem>
          })}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
