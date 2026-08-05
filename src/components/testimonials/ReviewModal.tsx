import { useState } from 'react'
import { MessageSquarePlus } from 'lucide-react'
import { Modal } from '@/components/ui/Modal'
import { Button } from '@/components/ui/Button'
import { ReviewForm } from './ReviewForm'

interface ReviewModalProps {
  onReviewAdded: () => void
  buttonText?: string
  buttonSize?: 'md' | 'lg'
}

export function ReviewModal({ onReviewAdded, buttonText = 'Add a Review', buttonSize = 'md' }: ReviewModalProps) {
  const [open, setOpen] = useState(false)

  function handleSuccess() {
    // Close modal after a short delay so user can see the success message
    setTimeout(() => {
      setOpen(false)
    }, 2500)
  }

  return (
    <>
      <Button
        variant="secondary"
        size={buttonSize}
        onClick={() => setOpen(true)}
        className="mt-6"
      >
        <MessageSquarePlus size={18} />
        {buttonText}
      </Button>

      <Modal open={open} onClose={() => setOpen(false)} title="Share Your Experience">
        <ReviewForm onSuccess={handleSuccess} />
      </Modal>
    </>
  )
}
