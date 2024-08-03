import { useState } from "react"
import Call from "../calls/call"

const useCreateCampaign = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    const [result, setResult] = useState(null)

    const createCampaign = async (payload) => {
        setIsLoading(true)
        setError(null)
        setResult(null)

        try {
            const response = await fetch('https://www.toingg.com/api/v3/create_campaign/', {
                method: 'POST',
                headers: {
                    'accept': 'application/json',
                    'Authorization': 'Bearer tg_005ffd65-42cc-4538-864a-1937e63bc44c-JeVCTvK1KOHNS6iz0yeTIw',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            })

            const json = await response.json()

            if (!response.ok) {
                console.log(json)
                throw new Error(json.message)
            }

            setResult(json)
            console.log(response)
            alert('Campaign created successfully')

            return < Call />
        } catch (err) {
            setError(err.message)
        } finally {
            setIsLoading(false)
        }
    }

    return { createCampaign, isLoading, error, result }
}


export default useCreateCampaign