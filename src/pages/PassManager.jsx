import { useEffect, useRef, useState } from 'react'
import PhoneTable from '../components/PhoneTable'
import PcTable from '../components/PcTable'
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';
import uuid from 'react-uuid';

function PassManager() {

    const [manager, setManager] = useState([])
    const [showPass, setShowPass] = useState(true)
    const site = useRef(null)
    const user = useRef(null)
    const pass = useRef(null)
    const id = uuid()

    useEffect(() => { 
        (async () => {
            const res = await fetch('http://localhost:3000/')
            const data = await res.json()
            setManager(data)
        })();
    }, [])


    async function formHandler(event) {
        event.preventDefault()
        const form = new FormData(event.currentTarget)
        const sitename = form.get('sitename')
        const username = form.get('username')
        const password = form.get('password')

        if (sitename.length > 0) {
            setManager([...manager, { sitename, username, password, id }])

            await fetch('http://localhost:3000/', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ sitename, username, password, id }) })
            
            site.current.value = ''
            user.current.value = ''
            pass.current.value = ''

            toast.success('Save Succesfully')
        }
    }


    function removePassInfo(id) {

        (async () => {
            await fetch(`http://localhost:3000/`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id })
            })
        })();

        const filterData = manager.filter((info => info.id !== id))
        setManager(filterData)
        if (!site.current.value) {
            toast.error('Password Deleted')
        }
    }


    function editPassInfo(id) {
        const findData = manager.find((info => info.id === id))
        site.current.value = findData.sitename
        user.current.value = findData.username
        pass.current.value = findData.password

        removePassInfo(id)
    }

    function copyText(text) {
        navigator.clipboard.writeText(text)
            .then(() => {
                console.log("Text copied to clipboard!");
            })
            .catch(err => {
                console.error("Failed to copy text:", err);
            });
    }


    return (
        <div>
            <div className="absolute top-0 z-[-2] h-screen w-screen rotate-180 transform bg-green-100 bg-[radial-gradient(60%_120%_at_50%_50%,hsla(0,0%,100%,0)_0,rgba(252,205,238,.5)_100%)]"></div>


            <div className='max-w-7xl flex flex-col justify-center items-center mx-auto pt-10 md:pt-20'>
                <div>
                    <h1 className="text-xl text-center md:text-3xl font-bold text-black"><span className="text-green-400">&lt;</span>Pass <span className="text-green-400">OP/&gt;</span></h1>
                    <p className='text-center font-semibold'>Your Own Password Manager</p>
                </div>
                <div className='w-[70%]'>
                    <form onSubmit={formHandler} className='py-10'>
                        <input ref={site} type="text" placeholder='Enter Website Name' name='sitename' className='w-full bg-white rounded-2xl py-1 px-3 border-green-600 focus:outline-green-400' />
                        <div className='pt-5 flex justify-center flex-col md:flex-row items-center gap-5 md:gap-10'>
                            <input ref={user} type="text" placeholder='Enter Username' name='username' className='w-full bg-white rounded-2xl py-1 px-3 border-green-600 focus:outline-green-400' />
                            <div className='flex items-center relative w-full'>
                                <input ref={pass} type={showPass ? 'password' : 'text'} placeholder='Enter Password' name='password' className='w-full bg-white rounded-2xl py-1 px-3 border-green-600 focus:outline-green-400' />
                                {
                                    showPass ? <FaEyeSlash onClick={() => setShowPass(false)} className='absolute right-2' /> : <FaEye onClick={() => setShowPass(true)} className='absolute right-2' />
                                }

                            </div>
                        </div>
                        <div className='mx-auto w-fit pt-6'>
                            <button className='btn btn-success px-5 text-black font-semibold border-2 rounded-3xl border-green-600'><lord-icon
                                src="https://cdn.lordicon.com/jgnvfzqg.json"
                                trigger="hover"
                                colors="primary:#121331,secondary:#666666"
                            ></lord-icon>Save</button>
                        </div>
                    </form>
                </div>
            </div>


            {
                manager.length ? <div>
                    <div className='max-w-sm w-full md:max-w-7xl mx-auto px-4 md:px-10 pb-5 hidden md:block'>
                        <div className="overflow-auto">
                            <table className="table">
                                {/* head */}
                                <thead>
                                    <tr className='bg-green-900 text-white '>
                                        <th>SiteName</th>
                                        <th>UserName</th>
                                        <th>Password</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody className='bg-green-200'>
                                    {/* row */}
                                    {
                                        manager?.map((data, index) => <PcTable copyText={copyText} editPassInfo={editPassInfo} removePassInfo={removePassInfo} data={data} key={index} />)
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>


                    <div className='max-w-sm w-full md:max-w-7xl mx-auto px-4 md:px-10 pb-5 md:hidden'>
                        <div className="overflow-x-auto min-h-48">
                            <table className="table">
                                {/* head */}
                                <thead>
                                    <tr className='bg-green-900 text-white '>
                                        <th>SiteName</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody className='bg-green-200'>
                                    {/* row */}

                                    {
                                        manager?.map((data, index) => <PhoneTable copyText={copyText} editPassInfo={editPassInfo} removePassInfo={removePassInfo} data={data} key={index} />)
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div> : <div>
                    <h1 className="text-2xl text-center font-bold text-black">Your Passwords </h1>
                    <p className='text-center font-semibold pt-4'>No passwords to show</p>
                </div>
            }
            <ToastContainer />
        </div>
    )
}

export default PassManager