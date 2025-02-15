'use client'

import { useState } from "react"
import { toast } from "sonner"
import { ChevronDown } from "lucide-react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"

interface UnifiedAlertMessageProps {
  onStatusChange?:() => Promise<void>
  form?: any
  onSubmit?: () => Promise<void>
  onToggle?: () => Promise<void>
  isActive?: boolean
  iconLucide?: React.ReactNode
  activeText?: string
  inactiveText?: string
  dialogTitle?: string
  dialogDescription?: string
  cancelText?: string
  confirmText?: string
  successMessage?: string
  errorMessage?: string
  activeColor?: string
  inactiveColor?: string
  backgroundButton?: string
}

export function AlertMessage({
  onStatusChange,
  form,
  onSubmit,
  onToggle,
  isActive,
  iconLucide,
  activeText,
  inactiveText,
  dialogTitle,
  dialogDescription,
  cancelText,
  confirmText,
  successMessage,
  errorMessage,
  activeColor = "#ECFDF3",
  inactiveColor = "#F9FAFB",
  backgroundButton
}: UnifiedAlertMessageProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleAction = async () => {
    setIsSubmitting(true)
    try {
      if (form && onSubmit) {
        await form.handleSubmit(onSubmit)()
      } else if (onToggle) {
        await onToggle()
        toast.success(successMessage)
      }
    } catch (error) {
      toast.error(errorMessage || "An error occurred")
    } finally {
      setIsSubmitting(false)
      setIsDialogOpen(false)
      onStatusChange && onStatusChange()
    }
  }

  const triggerButton = form ? (
    <Button
      type="button"
      size="lg"
      className={`w-full text-white py-2 ${backgroundButton || 'bg-black'}`}
      disabled={isSubmitting || (form.formState && form.formState.isSubmitting)}
    >
      {confirmText || "Submit"}
    </Button>
  ) : isActive !== undefined ? (
    isActive ? (
      <div
        className="cursor-pointer px-2 py-1 rounded-md border border-[#22C55E] w-fit whitespace-nowrap flex flex-row justify-between items-center gap-1 text-[#067647]"
        style={{ backgroundColor: activeColor }}
      >
        <span>{activeText}</span> <ChevronDown size={15} />
      </div>
    ) : (
      <div
        className="cursor-pointer text-[#6B7280] px-2 py-1 rounded-md border border-[#E4E7EC] w-fit whitespace-nowrap flex flex-row justify-between items-center gap-1"
        style={{ backgroundColor: inactiveColor }}
      >
        <span>{inactiveText}</span> <ChevronDown size={15} />
      </div>
    )
  ) : null

  return (
    <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <AlertDialogTrigger asChild>
        {triggerButton}
      </AlertDialogTrigger>
      <AlertDialogContent className="top-1/4 md:top-1/2 bg-white rounded-lg overflow-hidden max-w-[90%] w-[300px] h-[308px] md:w-[544px] md:h-[176px] p-6">
        <AlertDialogHeader className="flex flex-col">
          <div className="flex flex-col md:flex-row items-center gap-6 md:gap-4">
            {iconLucide}
            <AlertDialogTitle className="flex flex-col md:flex-row items-center gap-6 md:gap-2">
              {dialogTitle || "Are you sure?"}
            </AlertDialogTitle>
          </div>
          <AlertDialogDescription className="md:pl-16">
            {dialogDescription || "This action cannot be undone."}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isSubmitting}>
            {cancelText || "Cancel"}
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleAction}
            disabled={isSubmitting}
            className={`${isActive !== undefined && isActive ? 'bg-red-500 hover:bg-red-600' : 'bg-black'}`}
          >
            {confirmText || "confirm"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}