import { useRef, useState } from 'react'
import toast from 'react-hot-toast'
import { Upload, Loader2, ImageIcon } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { cn } from '@/lib/utils'

interface ImageUploaderProps {
  value?: string
  onUploaded: (url: string) => void
  accept?: string
  label?: string
  aspect?: string
}

// Uploads straight to the public "media" Storage bucket, then records the
// asset in media_library so it also shows up in the Media Library screen.
export function ImageUploader({ value, onUploaded, accept = 'image/*', label = 'Upload Image', aspect = 'aspect-video' }: ImageUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [uploading, setUploading] = useState(false)

  async function handleFile(file: File) {
    setUploading(true)
    const path = `${Date.now()}-${file.name.replace(/\s+/g, '-')}`
    const { error: uploadError } = await supabase.storage.from('media').upload(path, file, { upsert: true })

    if (uploadError) {
      toast.error(uploadError.message)
      setUploading(false)
      return
    }

    const { data } = supabase.storage.from('media').getPublicUrl(path)
    await supabase.from('media_library').insert({
      url: data.publicUrl,
      file_name: file.name,
      file_type: file.type.startsWith('video') ? 'video' : 'image',
      size_bytes: file.size,
    })

    onUploaded(data.publicUrl)
    setUploading(false)
    toast.success('Uploaded')
  }

  return (
    <div>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0]
          if (file) handleFile(file)
        }}
      />
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        disabled={uploading}
        className={cn(
          'relative flex w-full items-center justify-center overflow-hidden rounded-xl border-2 border-dashed border-ink/30 bg-white hover:border-chili transition-colors',
          aspect,
        )}
      >
        {value ? (
          <img src={value} alt="" className="absolute inset-0 h-full w-full object-cover" />
        ) : (
          <ImageIcon className="text-ink/20" size={32} />
        )}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-ink/0 hover:bg-ink/40 text-transparent hover:text-paper transition-colors">
          {uploading ? <Loader2 className="animate-spin" size={22} /> : <Upload size={22} />}
          <span className="text-xs font-semibold">{uploading ? 'Uploading…' : label}</span>
        </div>
      </button>
    </div>
  )
}
