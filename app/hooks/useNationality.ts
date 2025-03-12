import { useState } from "react"

type CountryPrediction = {
  country_id: string
  probability: number
}

type NameNationalityResponse = {
  count: number
  name: string
  country: CountryPrediction[]
}

export function useNationality() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [results, setResults] = useState<NameNationalityResponse | null>(null)

  const predictNationality = async (name: string) => {
    if (!name.trim()) return

    setLoading(true)
    setError(null)

    try {
      const response = await fetch(`https://api.nationalize.io/?name=${encodeURIComponent(name)}`)
      if (!response.ok) {
        throw new Error('Failed to fetch nationality predictions')
      }
      const data = await response.json()
      setResults(data)
    } catch (err) {
      setError("Failed to fetch nationality predictions. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return { loading, error, results, predictNationality }
}