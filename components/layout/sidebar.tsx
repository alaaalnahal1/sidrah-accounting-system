"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { type LucideIcon, LayoutDashboard, Users, ShoppingCart, Package, Settings, Truck, BarChart3 } from 'lucide-react'

interface SidebarItem {
  title: string
  href: string
  icon: LucideIcon
  submenu?: SidebarSubItem[]
}

interface SidebarSubItem {
  title: string
  href: string
}

const sidebarItems: SidebarItem[] = [
  {
    title: "لوحة التحكم",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "العملاء",
    href: "/customers",
    icon: Users,
  },
  {
    title: "الموردين",
    href: "/suppliers",
    icon: Truck,
  },
  {
    title: "المخزون",
    href: "/inventory",
    icon: Package,
    submenu: [
      {
        title: "المنتجات",
        href: "/inventory/products",
      },
      {
        title: "التصنيفات",
        href: "/inventory/categories",
      },
      {
        title: "المستودعات",
        href: "/inventory/warehouses",
      },
      {
        title: "وحدات القياس",
        href: "/inventory/units",
      },
      {
        title: "حركات المخزون",
        href: "/inventory/movements",
      },
      {
        title: "التقارير",
        href: "/inventory/reports",
      },
    ],
  },
  {
    title: "المبيعات",
    href: "/sales",
    icon: ShoppingCart,
  },
  {
    title: "المشتريات",
    href: "/purchases",
    icon: ShoppingCart,
  },
  {
    title: "التقارير",
    href: "/reports",
    icon: BarChart3,
  },
  {
    title: "الإعدادات",
    href: "/settings",
    icon: Settings,
  },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="h-full w-64 border-l bg-background">
      <div className="flex h-14 items-center border-b px-4">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <span className="text-lg">نظام سدرة المحاسبي</span>
        </Link>
      </div>
      <div className="py-4">
        <nav className="grid gap-2 px-2">
          {sidebarItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`)
            
            return (
              <div key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all ${
                    isActive ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                  }`}
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.title}</span>
                </Link>
                
                {item.submenu && isActive && (
                  <div className="mr-4 mt-2 grid gap-1 border-r pr-2">
                    {item.submenu.map((subitem) => {
                      const isSubActive = pathname === subitem.href
                      
                      return (
                        <Link
                          key={subitem.href}
                          href={subitem.href}
                          className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all ${
                            isSubActive ? "bg-primary/10 font-medium" : "hover:bg-muted"
                          }`}
                        >
                          <span>{subitem.title}</span>
                        </Link>
                      )
                    })}
                  </div>
                )}
              </div>
            )
          })}
        </nav>
      </div>
    </div>
  )
}
