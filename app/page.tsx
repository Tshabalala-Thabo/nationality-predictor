"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Loader2, Search } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { countryNames } from "./data/countries"
import { useNationality } from "./hooks/useNationality"
import { motion, AnimatePresence } from "framer-motion"
import ReactCountryFlag from "react-country-flag"


// Type definitions for our API response
type CountryPrediction = {
  country_id: string
  probability: number
}

type NameNationalityResponse = {
  count: number
  name: string
  country: CountryPrediction[]
}

export default function NationalityPredictor() {
  const [name, setName] = useState("")
  const { loading, error, results, predictNationality } = useNationality()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const trimmedName = name.trim()
    if (!trimmedName) return
    await predictNationality(trimmedName)
  }

  return (
    <div
      className="w-full h-full bg-cover bg-center bg-no-repeat min-h-screen md:bg-contain relative flex flex-col"
      style={{
        backgroundImage: 'url("/world_map_transparent.svg")',
        backgroundPosition: 'center 30%'
      }}
    >
      <div className="absolute inset-0 bg-background/80" />
      <div className="container max-w-md mx-auto py-10 px-4 relative z-10 flex-1">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="bg-card/40 backdrop-blur-sm border-primary/20 shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl text-center text-primary-foreground">Nationality Predictor</CardTitle>
              <CardDescription className="text-center text-muted-foreground">Enter a name to predict possible nationalities</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex space-x-2">
                  <Input
                    placeholder="Enter a name..."
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="flex-1 bg-transparent border-primary/20 text-primary-foreground placeholder:text-muted-foreground"
                  />
                  <Button
                    type="submit"
                    disabled={loading || !name.trim()}
                    className="bg-primary text-primary-foreground hover:bg-primary/90"
                  >
                    {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
                  </Button>
                </div>

                {error && <p className="text-sm text-destructive">{error}</p>}

                <AnimatePresence mode="wait">
                  {results && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0, transition: { duration: 0.2 } }}
                      className="mt-6 space-y-4"
                    >
                      <h3 className="font-medium text-lg text-primary-foreground">
                        Nationality predictions for &quot;{results.name}&quot;
                      </h3>
                      {results.country.length > 0 ? (
                        <div className="space-y-3">
                          {results.country.map((prediction, index) => (
                            <motion.div
                              key={prediction.country_id}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              transition={{
                                delay: index * 0.15,
                                duration: 0.5,
                                exit: { duration: 0.2 }
                              }}
                              className="space-y-1"
                            >
                              <div className="flex justify-between items-center text-primary-foreground">
                                <div className="flex items-center gap-2">
                                  <ReactCountryFlag
                                    countryCode={prediction.country_id}
                                    svg
                                    style={{
                                      width: '2em',
                                      height: '2em',
                                    }}
                                    title={prediction.country_id}
                                  />
                                  <span>{countryNames[prediction.country_id] || prediction.country_id}</span>
                                </div>
                                <motion.span
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  transition={{ delay: index * 0.15 + 0.2 }}
                                  className="font-medium"
                                >
                                  {(prediction.probability * 100).toFixed(1)}%
                                </motion.span>
                              </div>
                              <motion.div
                                initial={{ scaleX: 0 }}
                                animate={{ scaleX: 1 }}
                                transition={{ delay: index * 0.15 + 0.1, duration: 0.4 }}
                                className="origin-left"
                              >
                                <Progress value={prediction.probability * 100} className="h-2" />
                              </motion.div>
                            </motion.div>
                          ))}
                        </div>
                      ) : (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="text-center py-4 text-muted-foreground"
                        >
                          No nationality predictions found for this name. Try another name!
                        </motion.div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="text-center py-4 relative z-10"
      >
        <a
          href="https://thabotshabalala.netlify.app"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-primary-foreground/60 hover:text-primary-foreground transition-colors"
        >
          Developed by Thabo Tshabalala
        </a>
      </motion.div>
    </div>
  )
}
