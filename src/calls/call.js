import { useEffect, useState } from "react"

const Call = () => {
    const [name, setName] = useState('')
    const [num, setNum] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('https://www.toingg.com/api/v3/make_call', {
                method: 'POST',
                headers: {
                    'accept': 'application/json',
                    'Authorization':'Bearer tg_005ffd65-42cc-4538-864a-1937e63bc44c-JeVCTvK1KOHNS6iz0yeTIw',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify()
            })
        }
    })

    return (
        <div>
        <h1>Create you AI call!!</h1>

        <form>
            <label>Name:</label>
            <input 
                type="text"
                onChange={(e) => setName(e.target.value)}
                value={name}
            />

            <label>Phone Number:</label>
            <input
                type='number'
                onChange={(e) => setNum(e.target.value)}
                value={num}
            />

            
        </form>
        </div>
        
    )
}

export default Call