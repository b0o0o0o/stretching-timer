import React, { useEffect, useState, useRef } from 'react'
import { FaPlay, FaPause, FaRedo } from 'react-icons/fa'

type Props = {
    totalCycles: number
}
const playSound = () => {
    const audio = new Audio('/beep.mp3')
    audio.play()
}
const Timer: React.FC<Props> = ({ totalCycles }) => {
    const [ isActive, setIsActive ] = useState(false)
    const [ isStretching, setIsStretching ] = useState(true)
    const [ timeLeft, setTimeLeft ] = useState(20)
    const [ cyclesRemaining, setCyclesRemaining ] = useState(totalCycles)
    const timerRef = useRef<number | null>(null)
    useEffect(() => {
        setCyclesRemaining(totalCycles)
        setTimeLeft(20)
        setIsStretching(true)
        setIsActive(false)
    }, [ totalCycles ])
    useEffect(() => {
        if ( !isActive ) return
        timerRef.current = window.setInterval(() => {
            setTimeLeft(prev => {
                if ( prev === 1 ) {
                    playSound()
                    if ( !isStretching && cyclesRemaining <= 1 ) {
                        clearInterval(timerRef.current!)
                        setIsActive(false)
                        return 0
                    }
                    setIsStretching(!isStretching)
                    if ( !isStretching ) {
                        setCyclesRemaining(c => c - 1)
                    }
                    return isStretching ? 10 : 20
                }
                return prev - 1
            })
        }, 1000)
        return () => {
            if ( timerRef.current ) clearInterval(timerRef.current)
        }
    }, [ isActive, isStretching, cyclesRemaining ])
    const toggle = () => {
        if ( timeLeft === 0 ) {
            setTimeLeft(20)
            setCyclesRemaining(totalCycles)
            setIsStretching(true)
        }
        setIsActive(!isActive)
    }
    const reset = () => {
        if ( timerRef.current ) clearInterval(timerRef.current)
        setIsStretching(true)
        setTimeLeft(20)
        setCyclesRemaining(totalCycles)
        setIsActive(false)
    }
    const circleRadius = 132
    const strokeWidth = 33
    const normalizedRadius = circleRadius - strokeWidth / 2
    const circumference = normalizedRadius * 2 * Math.PI
    const phaseDuration = isStretching ? 20 : 10
    const progress = timeLeft / phaseDuration
    const strokeDashoffset = -(circumference - progress * circumference)
    return (
        <div className="w-full max-w-xs relative flex flex-col items-center justify-center">
            <button onClick={reset} className="absolute top-0 right-0 p-2 text-gray-400 hover:text-white cursor-pointer">
                <FaRedo size={25}/>
            </button>

            <div className="flex items-center justify-center relative mb-6">
                <svg height={circleRadius * 2} width={circleRadius * 2}>
                    <circle
                        stroke="#2e2f38"
                        fill="transparent"
                        strokeWidth={strokeWidth}
                        r={normalizedRadius}
                        cx={circleRadius}
                        cy={circleRadius}
                    />
                    <circle
                        stroke={isStretching ? "#F4EEFD" : "#DFCEF8"}
                        fill="transparent"
                        strokeWidth={strokeWidth}
                        strokeLinecap="round"
                        strokeDasharray={`${circumference} ${circumference}`}
                        strokeDashoffset={strokeDashoffset}
                        r={normalizedRadius}
                        cx={circleRadius}
                        cy={circleRadius}
                        transform={`rotate(-90 ${circleRadius} ${circleRadius})`}
                        style={{ transition: 'stroke-dashoffset 1s linear' }}
                    />
                </svg>

                <div className="absolute">
                    <div className="text-center text-6xl font-bold mb-2">
                        {timeLeft}
                    </div>
                    <div className={`text-center text-sm uppercase tracking-wider ${isStretching ? "text-[#F4EEFD]" : "text-[#DFCEF8]"}`}>
                        {isStretching ? 'STRETCH' : 'BREAK'}
                    </div>
                    <div className="text-center text-xs text-gray-400 mb-4">
                        Exercice {totalCycles - cyclesRemaining + 1} / {totalCycles}
                    </div>
                </div>
            </div>
            <button onClick={toggle} className="mt-10">
                {isActive ? <FaPause size={64}/> : <FaPlay size={64}/>}
            </button>
        </div>
    )
}
export default Timer