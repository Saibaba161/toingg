import { useEffect, useState } from "react"

const SupportedLang = () => {
    const [data, setData] = useState({})

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('https://www.toingg.com/api/v3/get_supported_languages', {
                headers: {
                    'accept': 'application/json',
                    'Authorization': 'Bearer tg_005ffd65-42cc-4538-864a-1937e63bc44c-JeVCTvK1KOHNS6iz0yeTIw'
                }
            })

            const json = await response.json()

            if(!response.ok) {
                console.log(response)
                throw new Error('Data is not ok')
            }

            console.log(json)
            setData(json)
        }

        fetchData()
    }, [])

    return (
        <div>
            {data.message}

        </div>
    )
}

export default SupportedLang