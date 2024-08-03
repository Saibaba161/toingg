import { useEffect, useState } from "react"

const useSupportedVoices = () => {
    const [voiceData, setVoiceData] = useState({ voice: [] })
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true)
                const response = await fetch('https://www.toingg.com/api/v3/get_supported_voices', {
                    headers: {
                        'accept': 'application/json',
                        'Authorization': 'Bearer tg_005ffd65-42cc-4538-864a-1937e63bc44c-JeVCTvK1KOHNS6iz0yeTIw'
                    }
                })

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`)
                }

                const json = await response.json()
                setVoiceData(json.result)
                console.log("Fetched voice data:", json.result)
            } catch (e) {
                console.error("Error fetching voice data:", e)
                setError(e.message)
            } finally {
                setIsLoading(false)
            }
        }

        fetchData()
    }, [])

    return { voiceData, isLoading, error }
}

export default useSupportedVoices