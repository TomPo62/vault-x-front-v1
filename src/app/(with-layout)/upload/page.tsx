'use client'
import BgGrid from '@/components/ui/BgGrid'
import GetFiles from '@/components/upload/GetFiles'
import UploadFile from '@/components/upload/UploadFile'
export default function UploadPage() {
  return (
    <main className="min-h-screen font-[family-name:var(--font-faculty-glyphic)] flex flex-col items-center justify-center">
      <BgGrid />
      <UploadFile />

      <div className="relative z-[55] mt-8 flex flex-col items-center justify-center">
        <p className="flex gap-2 text-lg">
          Don&apos;t have an API key?{' '}
          <a href="/" target="_blank" className="text-primary">
            Request one here
          </a>
        </p>
        <div className="w-full flex my-4 items-center gap-4 mx-auto">
          <div className="grow border-b border-primary"></div>
          <span className="text-primary text-base font-medium">
            Or Retrieve your files
          </span>
          <div className="grow border-b border-primary"></div>
        </div>
        <GetFiles/>
      </div>
    </main>
  )
}
