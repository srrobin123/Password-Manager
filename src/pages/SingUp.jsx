import { useRef, useState } from "react"
import useAuth from "../AuthProvider/useAuth"
import { ToastContainer, toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';


function SingUp() {

  const [userMessage, setUserMessage] = useState(null)
  const [cheakConditon, setcheakConditon] = useState(true)
  const [showPass, setShowPass] = useState(false)
  const [conShowPass, setConShowPass] = useState(false)
  const email = useRef(null)
  const pass = useRef(null)
  const conPass = useRef(null)
  const { SignUpWithEmailPass } = useAuth()
  const navigate = useNavigate()




  function formHandler(event) {
    event.preventDefault()
    setUserMessage(null)

    if (pass.current.value.length < 7) {
      setUserMessage(<p className="text-red-500">Password should be at least 6 characters</p>)
      return
    }

    if (pass.current.value === conPass.current.value) {
      SignUpWithEmailPass(email.current.value, pass.current.value)
        .then((userCredential) => {
          toast.success('Account is created!')
          navigate('/')
        })
        .catch((error) => {
          if (error.message === 'Firebase: Error (auth/email-already-in-use).') {
            toast.error("This email is alredy use.")
          } else {
            toast.error('Account is not Create!')
          }
        });

      email.current.value = ''
      pass.current.value = ''
      conPass.current.value = ''
      event.target.teams.checked = false
      setcheakConditon(true)
    } else {
      setUserMessage(<p className="text-red-500">Confirm password not match!</p>)
    }
  }

  return (
    <div className="hero min-h-[80vh]">
      <div className="absolute top-0 z-[-2] h-screen w-screen rotate-180 transform bg-green-100 bg-[radial-gradient(60%_120%_at_50%_50%,hsla(0,0%,100%,0)_0,rgba(252,205,238,.5)_100%)]"></div>
      <div className="hero-content flex-col">
        <div className="text-center">
          <h1 className="text-5xl font-bold">Sign UP</h1>
        </div>
        <div className="card bg-base-100 w-full max-w-sm md:min-w-90 shrink-0 shadow-2xl">
          <form onSubmit={formHandler} className="card-body">
            <div className="form-control">
              <label className="label font-semibold">
                <span className="label-text">Email</span>
              </label> <br />
              <input ref={email} type="email" placeholder="email" name='email' className="input input-bordered w-full" required />
            </div>
            <div className="form-control">
              <label className="label font-semibold">
                <span className="label-text">Password</span>
              </label>
              <div className="flex relative items-center">
                <input ref={pass} type={showPass ? 'text' : 'password'} placeholder="password" name='password' className="input input-bordered w-full" required />
                {
                  showPass ? <FaEye onClick={() => setShowPass(false)} className="absolute right-2" /> : <FaEyeSlash onClick={() => setShowPass(true)} className="absolute right-2" />
                }
              </div>
            </div>
            <div className="form-control">
              <label className="label font-semibold">
                <span className="label-text">Confirm Password</span>
              </label>
              <div className="flex relative items-center">
                <input ref={conPass} type={conShowPass ? 'text' : 'password'} placeholder="confirm password" name='confirmPassword' className="input input-bordered w-full" required />
                {
                  conShowPass ? <FaEye onClick={() => setConShowPass(false)} className="absolute right-2" /> : <FaEyeSlash onClick={() => setConShowPass(true)} className="absolute right-2" />
                }
              </div>
            </div>
            {
              userMessage && userMessage
            }
            <div className='form-control'>
              <label className='lebel font-semibold flex items-center gap-1'>
                <input onClick={() => setcheakConditon(!cheakConditon)} type="checkbox" name='teams' />
                <span className="label-text">Check all items and conditions</span>
              </label>
            </div>
            <div className="form-control mt-3">
              <button disabled={cheakConditon} className="btn btn-success w-full">Sign Up</button>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  )
}

export default SingUp
