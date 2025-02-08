import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import useAuth from './../AuthProvider/useAuth';
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Login() {
  const { SignInWithEmailPass, loginWithGoogle } = useAuth()
  const navigate = useNavigate()

  function formHandler(event) {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    const email = form.get('email')
    const password = form.get('password')
    SignInWithEmailPass(email, password)
      .then((userCredential) => {
        navigate('/PassManager')
        setTimeout(() => {
          toast.success('Login successfuly!')
        }, 200);
      })
      .catch((error) => {
        const errorMessage = error.message;
        if (errorMessage === 'Firebase: Error (auth/invalid-credential).') {
          toast.error('User credential invalid!')
        }else{
          toast.error('Login error!')
        }
      });
  }


  function btnClickLoginWithGoogle() {
    loginWithGoogle()
      .then((userCredential) => {
        navigate('/PassManager')
        setTimeout(() => {
          toast.success('Login successfuly!')
        }, 200);
      })
      .catch((error) => {
        const errorMessage = error.message;
      });
  }

  return (
    <div className="hero min-h-[80vh]">
      <div className="absolute top-0 z-[-2] h-screen w-screen rotate-180 transform bg-green-100 bg-[radial-gradient(60%_120%_at_50%_50%,hsla(0,0%,100%,0)_0,rgba(252,205,238,.5)_100%)]"></div>
      <div className="hero-content flex-col">
        <div className="text-center">
          <h1 className="text-5xl font-bold">Login now!</h1>
        </div>
        <div className="card bg-base-100 w-full max-w-sm md:max-w-lg shrink-0 shadow-2xl">
          <form onSubmit={formHandler} className="card-body">
            <div className="form-control">
              <label className="label font-semibold">
                <span className="label-text">Email</span>
              </label> <br />
              <input type="email" placeholder="email" name="email" className="input input-bordered w-full" required />
            </div>
            <div className="form-control">
              <label className="label font-semibold">
                <span className="label-text">Password</span>
              </label>
              <input type="password" placeholder="password" name="password" className="input input-bordered w-full" required />
              <label className="label">
                <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
              </label>
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-success w-full">Login</button>
            </div>
          </form>
          <div className='flex justify-center items-center gap-5 pb-5'>
            <button onClick={btnClickLoginWithGoogle} className='btn btn-success text-sm md:w-2/5 '><FcGoogle />Login Google</button>
            <button className='btn btn-success text-sm md:w-2/5 '><FaFacebook />Login Facebook</button>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  )
}

export default Login
