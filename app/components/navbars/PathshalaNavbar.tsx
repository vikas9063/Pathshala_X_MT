import { useState, useEffect } from "react"

import { Menu, Search, Phone, Mail, LogIn, ChevronDown } from "lucide-react"

import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "~/components/ui/sheet"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "~/components/ui/navigation-menu"
import { useTenantOrPathshalaStore } from "~/store/useTenantStore"
import { Link } from "react-router"



const navigationData = [
  { name: "Home", to: "/" },
  { 
    name: "About Us", 
    to: "/about",
    subItems: [
      { title: "Our Mission", to: "/about/mission", description: "Values that drive our education." },
      { title: "Leadership", to: "/about/leadership", description: "Meet our principal and board." },
    ]
  },
  { 
    name: "Academics", 
    to: "/academics",
    subItems: [
      { title: "Curriculum", to: "/academics/curriculum", description: "CBSE & International standards." },
      { title: "Examination", to: "/academics/exams", description: "Schedules and results portal." },
      { title: "E-Learning", to: "/academics/lms", description: "Access digital classroom resources." },
    ]
  },
  { 
    name: "Facilities", 
    to: "/facilities",
    subItems: [
      { title: "Science Lab", to: "/facilities/labs", description: "State-of-the-art physics & chem labs." },
      { title: "Smart Classes", to: "/facilities/smart-class", description: "Interactive learning environments." },
      { title: "Sports Complex", to: "/facilities/sports", description: "Indoor and outdoor sports arena." },
      { title: "Library", to: "/facilities/library", description: "Over 50,000 books and journals." },
    ]
  },
  { 
    name: "Gallery", 
    to: "/gallery",
    subItems: [
      { title: "Annual Day", to: "/gallery/annual-day", description: "Moments from our yearly celebration." },
      { title: "Sports Meet", to: "/gallery/sports-meet", description: "Action shots from the field." },
      { title: "Campus Tour", to: "/gallery/campus", description: "Virtual tour of our infrastructure." },
    ]
  },
  { name: "Contact", to: "/contact" },
]

export default function PathshalaNavbar() {
  const [mounted, setMounted] = useState(false)
  const pathshala = useTenantOrPathshalaStore((state) => state.pathshala)

  useEffect(() => {
    // marks component as hydrated
    setMounted(true)
  }, [])

  // SSR-safe placeholder
  if (!mounted) {
    return <header className="w-full h-24 border-b bg-background" />
  }

  return (
    <header className="w-full sticky top-0 z-50 shadow-sm">
      {/* ───────── Top Bar ───────── */}
      <div className="bg-primary text-primary-foreground text-xs sm:text-sm">
        <div className="container mx-auto flex justify-between items-center py-2 px-4">
          <div className="flex gap-4">
            <span className="flex items-center gap-1">
              <Phone className="h-3 w-3" />
              {pathshala?.contactInfo?.primaryPhone || 'phone : NA'}
            </span>
            <span className="hidden md:flex items-center gap-1">
              <Mail className="h-3 w-3" />
              {pathshala?.contactInfo?.email || 'email : NA'}
            </span>
          </div>
          <div className="flex gap-4">
            <Link to="/alumni" className="hover:underline font-medium">Alumni</Link>
            <Link to="/careers" className="hover:underline font-medium">Careers</Link>
            <Link to="/pay-fees" className="hover:underline font-medium">Pay Fees Online</Link>
          </div>
        </div>
      </div>

      {/* ───────── Main Navbar ───────── */}
      <div className="border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link to="/" className="text-xl font-extrabold text-primary tracking-tight uppercase">
            {pathshala?.pathshalaName || 'NA'}
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center">
            <NavigationMenu>
              <NavigationMenuList>
                {navigationData.map((item) => (
                  <NavigationMenuItem key={item.name}>
                    {item.subItems ? (
                      <>
                        <NavigationMenuTrigger className="bg-transparent">{item.name}</NavigationMenuTrigger>
                        <NavigationMenuContent>
                          <ul className="grid w-100 gap-3 p-4 md:w-125 md:grid-cols-2 lg:w-150">
                            {item.subItems.map((sub) => (
                              <li key={sub.title}>
                                <NavigationMenuLink asChild>
                                  <Link
                                    to={sub.to}
                                    className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                                  >
                                    <div className="text-sm font-semibold leading-none">{sub.title}</div>
                                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground mt-1">
                                      {sub.description}
                                    </p>
                                  </Link>
                                </NavigationMenuLink>
                              </li>
                            ))}
                          </ul>
                        </NavigationMenuContent>
                      </>
                    ) : (
                      <NavigationMenuLink asChild>
                        <Link to={item.to} className={navigationMenuTriggerStyle()}>{item.name}</Link>
                      </NavigationMenuLink>
                    )}
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search portal..." className="pl-8 w-44 h-9" />
            </div>
            <Link to="/login"><Button size="sm" className="px-5">Login</Button></Link>
          </div>

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden border">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-75 sm:w-87.5">
              <SheetTitle className="text-left text-xl font-bold p-4">SchoolLogic</SheetTitle>
              <SheetDescription className="sr-only">Mobile navigation links</SheetDescription>
              <div className="flex flex-col gap-2 mt-6 overflow-y-auto max-h-[80vh] p-5">
                {navigationData.map((item) => (
                  <div key={item.name} className="border-b border-muted last:border-0">
                    {item.subItems ? (
                      <details className="group">
                        <summary className="flex cursor-pointer items-center justify-between py-3 font-semibold list-none">
                          {item.name}
                          <ChevronDown className="h-4 w-4 transition-transform group-open:rotate-180" />
                        </summary>
                        <div className="flex flex-col gap-3 pl-4 pb-4 mt-1">
                          {item.subItems.map((sub) => (
                            <Link key={sub.title} to={sub.to} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                              {sub.title}
                            </Link>
                          ))}
                        </div>
                      </details>
                    ) : (
                      <Link to={item.to} className="font-semibold py-3 block hover:text-primary">
                        {item.name}
                      </Link>
                    )}
                  </div>
                ))}
                <Link to="/login" className="pt-6 space-y-4">
                  <Button className="w-full py-6 text-lg"><LogIn className="mr-2 h-5 w-5" />Login to ERP</Button>
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
