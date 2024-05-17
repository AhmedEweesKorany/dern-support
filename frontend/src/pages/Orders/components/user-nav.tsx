import {
    Avatar,
    AvatarFallback,
  } from "@/components/ui/avatar"
  import { Button } from "@/components/ui/button"
  import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { Link } from "react-router-dom"
  
  export function UserNav({userData,handleLogout}) {
    return (
      <>
      
      {userData != null ?    <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-8 w-8 rounded-full">
            <Avatar className="h-8 w-8">
            <AvatarFallback>{userData?.user_name[0].toUpperCase()+userData?.user_name[1].toUpperCase()}</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">{userData?.user_name}</p>
              <p className="text-xs leading-none text-muted-foreground">
              {userData?.email}
              </p>
              <p className="text-xs leading-none text-muted-foreground">
              {userData?.bio}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
         <a href="/Profile">
         <DropdownMenuItem>
              Profile
              <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
            </DropdownMenuItem></a>

            <a href="/">
         <DropdownMenuItem>
              Home
            </DropdownMenuItem></a>
           {userData?.isAdmin? <a href="/dashboard"> 
           <DropdownMenuItem>
              Dashboard
              <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
            </DropdownMenuItem></a>:null}
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout}>
            Log out
            <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>:  <Link to={"/auth/login"}><Button >Login</Button> </Link>}
   
      </>
    )
  }