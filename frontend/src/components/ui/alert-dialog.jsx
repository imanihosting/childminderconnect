import * as React from "react"

export const AlertDialog = React.forwardRef(({ open, onOpenChange, children, ...props }, ref) => (
  open ? (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
      <div ref={ref} {...props}>
        {children}
      </div>
    </div>
  ) : null
))
AlertDialog.displayName = "AlertDialog"

export const AlertDialogContent = React.forwardRef(({ children, ...props }, ref) => (
  <div
    ref={ref}
    className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md mx-4"
    {...props}
  >
    {children}
  </div>
))
AlertDialogContent.displayName = "AlertDialogContent"

export const AlertDialogHeader = ({ children, ...props }) => (
  <div className="mb-4" {...props}>
    {children}
  </div>
)

export const AlertDialogTitle = ({ children, ...props }) => (
  <h2 className="text-xl font-semibold mb-2" {...props}>
    {children}
  </h2>
)

export const AlertDialogDescription = ({ children, ...props }) => (
  <p className="text-gray-600" {...props}>
    {children}
  </p>
)

export const AlertDialogFooter = ({ children, ...props }) => (
  <div className="flex justify-end space-x-4 mt-6" {...props}>
    {children}
  </div>
)

export const AlertDialogAction = ({ children, onClick, ...props }) => (
  <button
    onClick={onClick}
    className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors"
    {...props}
  >
    {children}
  </button>
)

export const AlertDialogCancel = ({ children, onClick, ...props }) => (
  <button
    onClick={onClick}
    className="text-gray-600 px-4 py-2 rounded-md hover:bg-gray-100 transition-colors"
    {...props}
  >
    {children}
  </button>
)