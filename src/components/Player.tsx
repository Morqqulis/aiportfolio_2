'use client'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import LoadingSpinner from './LoadingSpinner'

export default function AudioPlayer({ source, name, thumbnail }: { source: string; name: string; thumbnail: string }) {
  const [volume, setVolume] = useState(50)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [isLoadingAudio, setIsLoadingAudio] = useState(false)
  const [playGlobalPlayer, setPlayGlobalPlayer] = useState(true)

  // on stream change
  useEffect(() => {
    setIsLoadingAudio(true)
    if (!source) return

    const audioElement = audioRef.current
    if (audioElement) {
      audioElement.pause()
      audioElement.src = source
      audioElement.load()
      if (playGlobalPlayer) {
        audioElement.play().catch(() => {})
      }
    }
    setIsLoadingAudio(false)
  }, [source, name, playGlobalPlayer])

  const handlePause = () => {
    setPlayGlobalPlayer(false)
  }

  const togglePlay = () => {
    setPlayGlobalPlayer(!playGlobalPlayer)
  }

  // on stream end
  useEffect(() => {
    const audioElement = audioRef.current

    audioElement?.addEventListener('ended', handlePause)

    return () => {
      audioElement?.removeEventListener('ended', handlePause)
    }
  }, [])

  // on play/pause
  useEffect(() => {
    const audioElement = audioRef.current
    if (!audioElement) return

    if (playGlobalPlayer) {
      audioElement.play().catch(() => {})
    } else {
      audioElement.pause()
    }
  }, [playGlobalPlayer])

  // on volume change
  const handleVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(event.target.value)
    setVolume(newVolume)
    audioRef.current!.volume = newVolume / 100

    if (!playGlobalPlayer) {
      audioRef.current!.pause()
    }
  }

  // on some audio buffers loading
  function handleCanPlayAudio() {
    setIsLoadingAudio(false)
  }

  return (
    <div className="fixed bottom-0 left-0 z-50 h-20 w-full bg-gradient-to-r from-black to-gray-900">
      <audio onCanPlay={handleCanPlayAudio} ref={audioRef} />
      <div className="mx-auto grid h-full w-full max-w-6xl grid-cols-3 px-8">
        <div className="mr-auto flex w-full items-center justify-start gap-2">
          <Image className="mr-3 h-12 rounded sm:h-16" src={thumbnail} alt="Audio thumbnail" width={64} height={64} />
        </div>
        <div className="flex w-full items-center">
          <div className="w-full">
            {/* player buttons */}
            <div className="mx-auto mb-1 flex items-center justify-center">
              {isLoadingAudio ? (
                <LoadingSpinner />
              ) : (
                <div className="flex w-full items-center justify-center gap-2 transition duration-200">
                  <button onClick={togglePlay} data-tooltip-target="tooltip-pause" type="button" className="w-6">
                    <svg
                      version="1.1"
                      id="play"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                      x="0px"
                      y="0px"
                      viewBox="0 0 100 100"
                      enableBackground="new 0 0 100 100"
                      xmlSpace="preserve"
                    >
                      <path
                        className="stroke-solid"
                        fill="none"
                        stroke="#ffffff"
                        d="M49.9,2.5C23.6,2.8,2.1,24.4,2.5,50.4C2.9,76.5,24.7,98,50.3,97.5c26.4-0.6,47.4-21.8,47.2-47.7
                        C97.3,23.7,75.7,2.3,49.9,2.5"
                      />
                      {playGlobalPlayer ? (
                        <path
                          strokeLinecap="round"
                          stroke="#ffffff"
                          strokeWidth={2}
                          className="translate-x-[22px] translate-y-[20px] scale-[2.5] transform"
                          strokeLinejoin="round"
                          d="M15.75 5.25v13.5m-7.5-13.5v13.5"
                        />
                      ) : (
                        <path
                          strokeLinecap="round"
                          fill="#ffffff"
                          className="translate-x-[24px] translate-y-[22px] scale-[2.5] transform"
                          strokeLinejoin="round"
                          d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z"
                        />
                      )}
                    </svg>
                  </button>
                  <span className="hidden w-max text-sm text-white md:block">{name}</span>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="ml-auto flex items-center justify-center">
          <div className="volume-b group relative cursor-pointer">
            {volume === 0 ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  className="text-white"
                  strokeLinejoin="round"
                  d="M17.25 9.75 19.5 12m0 0 2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25m-10.5-6 4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  className="text-white"
                  strokeLinejoin="round"
                  d="M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25l4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z"
                />
              </svg>
            )}

            <div className="range-c absolute right-[-50px] top-[-80px] hidden w-[120px] rotate-[270deg] transform p-2 hover:flex group-hover:flex">
              <div className="flex rounded-md bg-white p-2">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={volume}
                  onChange={handleVolumeChange}
                  className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200 dark:bg-gray-700"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
