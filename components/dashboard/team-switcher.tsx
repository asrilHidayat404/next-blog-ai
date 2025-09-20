"use client"

import * as React from "react"
import { AlignJustify, ChevronsUpDown, Plus } from "lucide-react"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import Link from "next/link"

export function TeamSwitcher() {

  return (
    <SidebarMenu>
      <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Link href={"/"} className="bg-accent-foreground flex aspect-square size-10 items-center justify-center rounded-lg p-1">
                <img src="/next.svg" alt="" />
              </Link>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">NEXT JS</span>
                <span className="truncate text-xs">NECK SICK</span>
              </div>
            </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
