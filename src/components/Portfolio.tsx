'use client'
import { PlayCircleIcon } from '@heroicons/react/20/solid'
import Image from 'next/image'
import { useState } from 'react'
import AudioPlayer from './Player'

const orders = [
  {
    id: 1,
    date: 'July 12, 2021',
    datetime: '2021-07-12',
    status: 'out-for-delivery',
    productName: 'Broadcast LLM - US English',
    href: '#',
    imageSrc:
      'https://firebasestorage.googleapis.com/v0/b/podcastsite-1bedc.appspot.com/o/nexus.jpg?alt=media&token=f2eef6a9-e0b2-464d-b583-5fef0fcf3a2e',
    imageAlt: '',
    audioUrl:
      'https://firebasestorage.googleapis.com/v0/b/podcastsite-1bedc.appspot.com/o/german-example.mp3?alt=media&token=ece6218e-5d10-4ad9-ae35-a3510fc7d38d',
  },
  {
    id: 2,
    date: 'July 12, 2021',
    datetime: '2021-07-12',
    status: 'out-for-delivery',
    productName: 'Broadcast LLM - UK English',
    href: '#',
    imageSrc:
      'https://firebasestorage.googleapis.com/v0/b/podcastsite-1bedc.appspot.com/o/AvaSummers.jpg?alt=media&token=367b5261-1e19-40d5-aa56-301551c82c9f',
    imageAlt: '',
    audioUrl:
      'https://firebasestorage.googleapis.com/v0/b/podcastsite-1bedc.appspot.com/o/german-example.mp3?alt=media&token=ece6218e-5d10-4ad9-ae35-a3510fc7d38d',
  },
  {
    id: 3,
    date: 'Q2 2024',
    datetime: '2021-06-21',
    status: 'delivered',
    productName: 'Broadcast LLM - Swedish',
    href: '#',
    imageSrc:
      'https://firebasestorage.googleapis.com/v0/b/podcastsite-1bedc.appspot.com/o/Sebastian%20Lagerman.jpg?alt=media&token=c24184d6-eb22-4350-abde-2099ee4d57b6',
    imageAlt: '',
  },
  {
    id: 4,
    date: 'Q2 2024',
    datetime: '2021-06-21',
    status: 'delivered',
    productName: 'Broadcast LLM - Dutch',
    href: '#',
    imageSrc:
      'https://firebasestorage.googleapis.com/v0/b/podcastsite-1bedc.appspot.com/o/casper-profile-picture.jpg?alt=media&token=fb9361fc-1956-4f03-b0be-2af2766913e4',
    imageAlt: '',
    audioUrl:
      'https://firebasestorage.googleapis.com/v0/b/podcastsite-1bedc.appspot.com/o/german-example.mp3?alt=media&token=ece6218e-5d10-4ad9-ae35-a3510fc7d38d',
  },
  {
    id: 5,
    date: 'Q2 2024',
    datetime: '2021-06-21',
    status: 'delivered',
    productName: 'Broadcast LLM - German',
    href: '#',
    imageSrc:
      'https://firebasestorage.googleapis.com/v0/b/podcastsite-1bedc.appspot.com/o/felixBaumann.jpg?alt=media&token=e6d71a29-f65c-4ada-8c61-66c89ad67d54',
    imageAlt: '',
  },

  {
    id: 6,
    date: 'June 6, 2021',
    datetime: '2021-06-06',
    status: 'cancelled',
    productName: 'Broadcast LLM - Spanish',
    href: '#',
    imageSrc:
      'https://firebasestorage.googleapis.com/v0/b/podcastsite-1bedc.appspot.com/o/PalomaLopez.jpg?alt=media&token=f7a668a0-b1fe-4e2b-8eb2-9bca227d2051',
    imageAlt: '',
    audioUrl:
      'https://firebasestorage.googleapis.com/v0/b/podcastsite-1bedc.appspot.com/o/german-example.mp3?alt=media&token=ece6218e-5d10-4ad9-ae35-a3510fc7d38d',
  },
  {
    id: 7,
    date: 'July 12, 2021',
    datetime: '2021-07-12',
    status: 'out-for-delivery',
    productName: 'Broadcast LLM - UK English',
    href: '#',
    imageSrc:
      'https://firebasestorage.googleapis.com/v0/b/podcastsite-1bedc.appspot.com/o/Victoria%20Eastbridge.jpg?alt=media&token=c4a7c947-a761-4d4e-a7b2-8076ef1adbf7',
    imageAlt: '',
  },
  {
    id: 8,
    date: 'July 12, 2021',
    datetime: '2021-07-12',
    status: 'out-for-delivery',
    productName: 'Full RadioStation with AI',
    href: 'https://radiostation.ai/',
    imageSrc:
      'https://firebasestorage.googleapis.com/v0/b/podcastsite-1bedc.appspot.com/o/full.png?alt=media&token=46fac41e-131a-45a8-954f-64670e22d186',
    imageAlt: '',
  },

  {
    id: 9,
    date: 'July 12, 2021',
    datetime: '2021-07-12',
    status: 'out-for-delivery',
    productName: 'AI Voicetracking',
    href: 'https://aivoicetracker.com/',
    imageSrc:
      'https://firebasestorage.googleapis.com/v0/b/podcastsite-1bedc.appspot.com/o/12%202.png?alt=media&token=2f80ec39-ac9d-4133-9495-c22099964514',
    imageAlt: '',
  },
  {
    id: 10,
    date: 'July 12, 2021',
    datetime: '2021-07-12',
    status: 'out-for-delivery',
    productName: 'AI News, Weather, Traffic reports',
    href: 'http://trendingcontent.com/',
    imageSrc:
      'https://firebasestorage.googleapis.com/v0/b/podcastsite-1bedc.appspot.com/o/04.png?alt=media&token=102102bf-cf9c-407f-9f46-c53c71a5f6e2',
    imageAlt: '',
  },
  {
    id: 11,
    date: 'Q3 2024',
    datetime: '2021-05-24',
    status: 'delivered',
    productName: 'AI Music Analytics & Scheduling',
    href: 'https://analytics-one-gamma.vercel.app/',
    imageSrc:
      'https://firebasestorage.googleapis.com/v0/b/podcastsite-1bedc.appspot.com/o/03.png?alt=media&token=6b7736c9-3b6c-4513-aa62-64cfb984cc1d',
    imageAlt: '',
  },
  {
    id: 12,
    date: 'Q2 2024',
    datetime: '2021-05-24',
    status: 'delivered',
    productName: 'AI Blueprint imaging',
    href: 'https://firebasestorage.googleapis.com/v0/b/podcastsite-1bedc.appspot.com/o/AIblueprint-trailer.mp4?alt=media&token=acd92b97-d283-4b65-96b1-6b66f2969c85',
    imageSrc:
      'https://firebasestorage.googleapis.com/v0/b/podcastsite-1bedc.appspot.com/o/08.png?alt=media&token=f46d3592-a55e-457a-96ad-56db85c26037',
    imageAlt: '',
  },
  {
    id: 13,
    date: 'Q3 2024',
    datetime: '2021-05-24',
    status: 'out-for-delivery',
    productName: 'AI Showprep',
    href: 'https://radiostation.ai/',
    imageSrc:
      'https://firebasestorage.googleapis.com/v0/b/podcastsite-1bedc.appspot.com/o/07.png?alt=media&token=026a03cc-372e-47fc-9729-b6afe7778b35',
    imageAlt: '',
  },
  {
    id: 14,
    date: 'July 12, 2021',
    datetime: '2021-07-12',
    status: 'out-for-delivery',
    productName: 'AI Top40',
    href: 'https://aitop40.com/',
    imageSrc:
      'https://firebasestorage.googleapis.com/v0/b/podcastsite-1bedc.appspot.com/o/06.png?alt=media&token=f41924ec-6e45-4ee4-b9e8-46cae0e18541',
    imageAlt: '',
  },
  {
    id: 15,
    date: 'July 12, 2021',
    datetime: '2021-07-12',
    status: 'out-for-delivery',
    productName: 'AI DanceChart',
    href: 'https://aidancechart.com/',
    imageSrc:
      'https://firebasestorage.googleapis.com/v0/b/podcastsite-1bedc.appspot.com/o/10.png?alt=media&token=818909b0-1592-4469-898a-fc5347377eff',
    imageAlt: '',
  },
  {
    id: 15,
    date: 'July 12, 2021',
    datetime: '2021-07-12',
    status: 'out-for-delivery',
    productName: 'AI Voices, Callers, Celebrities',
    href: 'https://radiostation.ai/',
    imageSrc:
      'https://firebasestorage.googleapis.com/v0/b/podcastsite-1bedc.appspot.com/o/09.png?alt=media&token=9e822967-2c9c-4883-b0b6-ac0260b50822',
    imageAlt: '',
  },

  {
    id: 16,
    date: 'July 12, 2021',
    datetime: '2021-07-12',
    status: 'cancelled',
    productName: 'AI MusicFestival',
    href: 'https://ai-musicfestival.com/',
    imageSrc:
      'https://firebasestorage.googleapis.com/v0/b/podcastsite-1bedc.appspot.com/o/fest.png?alt=media&token=93faadf6-e94e-407d-83ce-9770f6698621',
    imageAlt: '',
  },
  {
    id: 17,
    date: 'July 12, 2021',
    datetime: '2021-07-12',
    status: 'out-for-delivery',
    productName: 'AI Radio One',
    href: 'https://airadioone.com/',
    imageSrc:
      'https://firebasestorage.googleapis.com/v0/b/podcastsite-1bedc.appspot.com/o/r1.png?alt=media&token=68ecd392-faab-44bc-a719-a1e0aa382734',
    imageAlt: '',
  },
  {
    id: 18,
    date: 'July 12, 2021',
    datetime: '2021-07-12',
    status: 'out-for-delivery',
    productName: 'AI Radio Two',
    href: 'https://airadiotwo.vercel.app/',
    imageSrc:
      'https://firebasestorage.googleapis.com/v0/b/podcastsite-1bedc.appspot.com/o/r2.png?alt=media&token=f555bbf4-9742-4e86-b713-7a4c3f1f7281',
    imageAlt: '',
  },
  {
    id: 19,
    date: 'July 12, 2021',
    datetime: '2021-07-12',
    status: 'out-for-delivery',
    productName: 'Cloud Voice Processor',
    href: 'https://cloudvoiceprocessor.com/',
    imageSrc:
      'https://firebasestorage.googleapis.com/v0/b/podcastsite-1bedc.appspot.com/o/cvp.png?alt=media&token=f4a4f64c-efa1-4dc8-a46f-d79ddbfdc514',
    imageAlt: '',
  },
  {
    id: 20,
    date: 'July 12, 2021',
    datetime: '2021-07-12',
    status: 'out-for-delivery',
    productName: 'AAC+ Streaming',
    href: 'http://198.74.62.88/',
    imageSrc:
      'https://firebasestorage.googleapis.com/v0/b/podcastsite-1bedc.appspot.com/o/stream.png?alt=media&token=ee68a416-a3f4-4af6-9e8c-927053ab2b4c',
    imageAlt: '',
  },
  {
    id: 21,
    date: 'Q3 2024',
    datetime: '2021-06-06',
    status: 'delivered',
    productName: 'AI Spot Creator',
    href: 'https://radiostation.ai/',
    imageSrc:
      'https://firebasestorage.googleapis.com/v0/b/podcastsite-1bedc.appspot.com/o/spots.png?alt=media&token=3c0ff687-7353-4dc9-a7b2-d0d8627481ef',
    imageAlt: '',
  },
  {
    id: 22,
    date: 'June 6, 2021',
    datetime: '2021-06-06',
    status: 'cancelled',
    productName: 'AI Music Awards',
    href: 'https://ai-musicawards.com/',
    imageSrc:
      'https://firebasestorage.googleapis.com/v0/b/podcastsite-1bedc.appspot.com/o/11.png?alt=media&token=5adbdce0-846b-49ec-a589-a889f4312292',
    imageAlt: '',
  },
  {
    id: 23,
    date: 'June 6, 2021',
    datetime: '2021-06-06',
    status: 'cancelled',
    productName: 'PPM Panelyzer',
    href: 'https://radiostation.ai/',
    imageSrc:
      'https://firebasestorage.googleapis.com/v0/b/podcastsite-1bedc.appspot.com/o/ppm.png?alt=media&token=b04b17e7-9d57-4c5b-a891-f76317acba84',
    imageAlt: '',
  },

  // More orders...
]

interface IOrder {
  name: string
  source: string
  thumbnail: string
}

export default function Portfolio() {
  const [currentOrder, setCurrentOrder] = useState<IOrder | null>(null)

  return (
    <div className="bg-white">
      <div
        className="mx-auto max-w-2xl px-4 py-24 sm:px-6 lg:max-w-7xl lg:px-8"
        aria-labelledby="order-history-heading"
      >
        <div className="max-w-xl">
          <h1 id="order-history-heading" className="text-3xl font-bold tracking-tight text-slate-900">
            Portfolio
          </h1>
          <p className="mt-2 text-sm text-gray-500">List of most of the services (for now) that keeps wheels turning</p>
        </div>
        {currentOrder && <AudioPlayer {...currentOrder} />}
        <div className="mt-16 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 sm:gap-y-16 lg:grid-cols-3 lg:gap-x-8 xl:grid-cols-4">
          {orders.map((order, i) => (
            <div
              key={order.id + i}
              className="group relative"
              onClick={() => {
                if (!order.audioUrl) return
                setCurrentOrder({
                  name: order.productName,
                  source: order.audioUrl,
                  thumbnail: order.imageSrc,
                })
              }}
            >
              <div
                className={`aspect-h-1 aspect-w-1 relative overflow-hidden rounded-md bg-gray-200 transition ${
                  !order.audioUrl && 'group-hover:opacity-75'
                }`}
              >
                {!!order.audioUrl && (
                  <div className="absolute left-0 top-0 z-10 flex h-full w-full cursor-pointer items-center justify-center bg-gray-600/50 opacity-0 transition hover:opacity-[1]">
                    <PlayCircleIcon width={60} height={60} color="white" opacity={0.9} />
                  </div>
                )}
                <Image
                  src={order.imageSrc}
                  alt={order.imageAlt}
                  className="w-full object-cover object-center"
                  width={280}
                  height={280}
                  quality={75}
                  priority={false}
                  loading={'lazy'}
                />
              </div>
              {i === 0 ? (
                <h2 className="mt-4 text-sm text-slate-900">
                  <a href={order.href}>
                    <span className="absolute inset-0" />
                    {order.productName}
                  </a>
                </h2>
              ) : (
                <h3 className="mt-4 text-sm text-slate-900">
                  <a href={order.href}>
                    <span className="absolute inset-0" />
                    {order.productName}
                  </a>
                </h3>
              )}

              <p className="mt-1 text-lg font-medium">
                {order.status === 'delivered' ? (
                  <span className="text-gray-900">
                    Estimated <time dateTime={order.datetime}>{order.date}</time>
                  </span>
                ) : order.status === 'out-for-delivery' ? (
                  <span className="text-green-500">Available Now</span>
                ) : order.status === 'cancelled' ? (
                  <span className="text-orange-500">On Development</span>
                ) : null}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
