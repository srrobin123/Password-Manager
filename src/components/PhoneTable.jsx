import { GiClick } from "react-icons/gi";

function PhoneTable({ data, removePassInfo, editPassInfo, copyText}) {
    return (
        <>
            <tr>
                <td>
                    <div className='flex gap-2'>
                        <div className="dropdown dropdown-bottom">
                            <div tabIndex={0} role="button"><p className="flex items-center gap-1 cursor-pointer font-semibold">{data.sitename} <GiClick className="text-xl" /></p></div>
                            <table tabIndex={0} className="dropdown-content font-semibold menu bg-base-100 rounded-box z-10 w-80 p-2 shadow">
                                <thead>
                                    <tr className='text-black flex justify-center gap-10'>
                                        <th>UserName</th>
                                        <th>Password</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="text-sm">
                                        <td>{data.username} <br />
                                            <button onClick={()=>copyText(data.username)}><lord-icon
                                                src="https://cdn.lordicon.com/iykgtsbt.json"
                                                trigger="hover"
                                                style={{ width: '25px', height: '25px' }}
                                            ></lord-icon></button></td>

                                        <td className="w-3/6">{data.password} <br />
                                            <button onClick={()=>copyText(data.password)}><lord-icon
                                                src="https://cdn.lordicon.com/iykgtsbt.json"
                                                trigger="hover"
                                                style={{ width: '25px', height: '25px' }}
                                            ></lord-icon></button></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                </td>
                <td>
                    <div className='flex item-center'>

                        <div onClick={()=>editPassInfo(data.id)} className='mr-2'>
                            <lord-icon
                                src="https://cdn.lordicon.com/gwlusjdu.json"
                                trigger="hover"
                                style={{ width: '25px', height: '25px' }}
                            ></lord-icon>
                        </div>

                        <div onClick={()=>removePassInfo(data.id)}>
                            <lord-icon
                                src="https://cdn.lordicon.com/skkahier.json"
                                trigger="hover"
                                style={{ width: '25px', height: '25px' }}
                            ></lord-icon>
                        </div>

                    </div>
                </td>
            </tr>
        </>

    )
}

export default PhoneTable
