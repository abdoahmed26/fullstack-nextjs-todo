import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { ModeToggle } from "./ModeToggle";

interface IProp {

}

const Navbar = ({}:IProp)=>{
    return (
        <nav>
            <div className="container">
                <div className="flex justify-between items-center py-3">
                    <ModeToggle />
                    <SignedIn>
                        <UserButton />
                    </SignedIn>
                    <SignedOut>
                        <SignInButton/>
                    </SignedOut>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;