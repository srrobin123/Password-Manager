import React from 'react'

function PcTable({ data, removePassInfo, editPassInfo, copyText}) {

    return (

        <>
            <tr>
                <td>
                    <div className='flex gap-2'>
                        <p>{data.sitename}</p>
                        <button onClick={()=>copyText(data.sitename)}><lord-icon
                            src="https://cdn.lordicon.com/iykgtsbt.json"
                            trigger="hover"
                            style={{ width: '25px', height: '25px' }}
                        ></lord-icon></button>
                    </div>
                </td>
                <td>
                    <div className='flex gap-2'>
                        <p>{data.username}</p>
                        <button onClick={()=>copyText(data.username)}><lord-icon
                            src="https://cdn.lordicon.com/iykgtsbt.json"
                            trigger="hover"
                            style={{ width: '25px', height: '25px' }}
                        ></lord-icon></button>
                    </div>
                </td>
                <td>
                    <div className='flex gap-2'>
                        <p>{data.password}</p>
                        <button onClick={()=>copyText(data.password)}><lord-icon
                            src="https://cdn.lordicon.com/iykgtsbt.json"
                            trigger="hover"
                            style={{ width: '25px', height: '25px' }}
                        ></lord-icon></button>
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
            </tr></>

    )
}

export default PcTable
