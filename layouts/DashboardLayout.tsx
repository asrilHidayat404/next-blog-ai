"use client"
import { AppSidebar } from "@/components/dashboard/app-sidebar"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { SessionProvider, useSession } from "next-auth/react"
import { usePathname, useRouter } from "next/navigation"
import { ReactNode, useMemo } from "react"



export default function DashboardLayout({
    children
}: {
    children: ReactNode
}) {
    const router = useRouter()
    const routes = usePathname()
    const pathname = useMemo(() => {
        return routes.split("/").filter(Boolean).map((seg) => seg.charAt(0).toUpperCase() + seg.slice(1))
    }, [routes])


    return (
        <SessionProvider>

        
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
                    <div className="flex items-center gap-2 px-4">
                        <SidebarTrigger className="-ml-1" />
                        <Separator
                            orientation="vertical"
                            className="mr-2 data-[orientation=vertical]:h-4"
                        />
                        <Breadcrumb>
                            <BreadcrumbList>
                                {pathname?.map((path, i) => {
                                    const href = "/" + pathname.slice(0, i + 1).join("/").toLocaleLowerCase()
                                    const isLast = i === pathname.length - 1

                                    return (
                                        <BreadcrumbItem key={i}>
                                            {!isLast ? (
                                                <>
                                                    <BreadcrumbLink href={href}>
                                                        {path}
                                                    </BreadcrumbLink>
                                                    <BreadcrumbSeparator className="hidden md:block" />
                                                </>
                                            ) : (
                                                <BreadcrumbPage>{path}</BreadcrumbPage>
                                            )}
                                        </BreadcrumbItem>
                                    )
                                })}
                            </BreadcrumbList>
                        </Breadcrumb>

                    </div>
                </header>
                <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                        {children}
                    {/* <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    </div> */}
                </div>
            </SidebarInset>
        </SidebarProvider>
        </SessionProvider>
    )
}
