import { useState, useEffect } from "react"
import useSupportedVoices from "./hooks/useSupportedVoices"
import useCreateCampaign from "./hooks/useCreateCampaign"

const Form = () => {
    const [name, setName] = useState('')
    const [selectedVoice, setSelectedVoice] = useState('')
    const [language, setLanguage] = useState()
    const [script, setScript] = useState('')
    const [purpose, setPurpose] = useState('')
    const [knowledge, setKnowledge] = useState(undefined)
    const [line, setLine] = useState('')
    const [tone, setTone] = useState('')

    const { voiceData, isLoading: voicesLoading, error: voicesError } = useSupportedVoices()
    const { createCampaign, isLoading: submitting, error: submitError, result } = useCreateCampaign()


    useEffect(() => {
        if (voiceData.voice && voiceData.voice.length > 0) {
            setSelectedVoice(voiceData.voice[0].name)
        }
    }, [voiceData])

    const handleSubmit = async (e) => {
        e.preventDefault()

        const payload = {};
        payload.title = name;
        payload.voice = selectedVoice;
        payload.language = language;
        payload.script = script;
        payload.purpose = purpose;
        if (knowledge) {
            payload.knowledgeBase = knowledge;
        }
        payload.calendar = '10Am to 10Pm IST';
        payload.firstLine = line;
        payload.tone = tone;
        payload.postCallAnalysis = 'false';
        payload.postCallAnalysisSchema = {};


        console.log("Data from the Form: ", payload)

        await createCampaign(payload)
}

    return (
        <form className="voice-form" onSubmit={handleSubmit}>
            <h2>Build AI Calling Agent</h2>
            <div className="form-group">
            <label>Name: </label>
            <input
                type="text"
                onChange= {(e) => setName(e.target.value)}
                value={name}
                placeholder="Enter campaign name"
                required
            />
            </div>

            <div className="form-group">
            <label>Voice: </label>
            <select 
                    id="voice" 
                    value={selectedVoice} 
                    onChange={(e) => setSelectedVoice(e.target.value)}
                    disabled={voicesLoading}
                    required
                >
                    {voicesLoading ? (
                        <option>Loading voices...</option>
                    ) : voicesError ? (
                        <option>Error loading voices</option>
                    ) : voiceData.voice && voiceData.voice.length > 0 ? (
                        voiceData.voice.map((voice, index) => (
                            <option key={index} value={voice.name}>
                                {voice.name} {voice.type ? `- ${voice.type}` : ''}
                            </option>
                        ))
                    ) : (
                        <option>No voices available</option>
                    )}
                </select>
            </div>

            <div className="form-group">
            <label>Language: </label>
            <div className="radio-group">
                <input 
                    type="radio"
                    id="option1"
                    name="options"
                    value="Hindi"
                    checked={language === 'Hindi'}
                    onChange={(e) => setLanguage(e.target.value)}
                />
                <label htmlFor="option1">Hindi</label>   

                <input 
                    type="radio"
                    id="option2"
                    name="options"
                    value="english"
                    checked={language === 'english'}
                    onChange={(e) => setLanguage(e.target.value )}
                />
                <label htmlFor="option2">English</label>
            </div>
            </div>

            <div className="form-group">
            <label>Script: </label>
            <input 
                type="text"
                value={script}
                onChange={(e) => setScript(e.target.value)}
                placeholder="Enter your script"
                required
            />
            </div>

            <div className="form-group">
            <label>Purpose: </label>
            <input 
                type="text"
                value={purpose}
                onChange={(e) => setPurpose(e.target.value)}
                placeholder="Enter the purpose"
                required
            />
            </div>

            <div className="form-group">
            <label>Knowledge Base: </label>
            <input
                id="knowledge" 
                type="text"
                onChange={(e) => setKnowledge(e.target.value)}
            />
            </div>

            <div className="form-group">
            <label>First Line: </label>
            <input
                type="text"
                value={line}
                onChange={(e) => setLine(e.target.value)}
                placeholder="Enter the first line"
                required
            />
            </div>

            <div className="form-group">
            <label>Tone: </label>
            <input 
                type="text"
                value={tone}
                onChange={(e) => setTone(e.target.value)}
                placeholder="Enter the tone"
                required
            />
            </div>

            <button type="submit" disabled={voicesLoading || submitting}>
                    {submitting ? 'Creating Campaign...' : 'Create Campaign'}
            </button>

            {submitError && <p className="error">Error: {submitError}</p>}
            {result && <p className="success">Campaign created successfully!</p>}

            {voicesError && <p className="error">Error loading voices: {voicesError}</p>}

        </form>
    )
}

export default Form