import React from 'react'
import {
  DialogTrigger,
} from "@/components/ui/dialog"
import Image from 'next/image'

type GridProps = {
  img?: string
}

const SquareGrid: React.FC<GridProps> = ({ img }) => {
  return (
    <DialogTrigger className='not-last:border-r not-last:border-slate-200'>
      <div className="size-24 md:size-40 text-center content-center text-slate-200 hover:bg-sky-950 cursor-pointer">
        {img && <img className='w-full h-full' src={img} alt='team' /* width={0} height={0} sizes='100vw' */ />}
      </div>
    </DialogTrigger>
  )
}

export default SquareGrid