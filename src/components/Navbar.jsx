import { Link } from "react-router-dom";
import useAuth from "../AuthProvider/useAuth";


function Navbar() {
  const {SingOut, user} = useAuth();
  return (
    <div className="bg-slate-800">
      <nav className="max-w-[80vw] mx-auto flex justify-between items-center h-16">
        <div className="logo">
          <h1 className="text-xl md:text-3xl font-bold text-white"><span className="text-green-400">&lt;</span>Pass <span className="text-green-400">OP/&gt;</span></h1>
        </div>
        <div>
          {
            user? <button className="btn btn-success md:font-semibold" onClick={SingOut}>Log Out</button>:<div>
              <Link to='/'><button className="btn btn-success md:font-semibold mr-2 md:mr-4">Sing In</button></Link>
              <Link to='/register'><button className="btn btn-success md:font-semibold">Sign Up</button></Link>
            </div>
          }
          
        </div>
      </nav>
    </div>
  )
}

export default Navbar;