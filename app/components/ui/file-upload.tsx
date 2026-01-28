import * as React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { FileImage, Upload, Trash2 } from "lucide-react"
import type { FileDetails } from "~/lib/types/patshala"

type FileUploadProps = {
  label?: string
  value: FileDetails | null
  onChange: (file: FileDetails | null) => void
  accept?: string
  emptyMessage?: string
}

export function FileUpload({
  label = "School Logo",
  value,
  onChange,
  accept = "image/*",
  emptyMessage = "No file uploaded",
}: FileUploadProps) {
  const inputRef = React.useRef<HTMLInputElement>(null)

  const isImage = value?.fileType.startsWith("image")

  const previewSrc =
    isImage && value
      ? `data:${value.fileType};base64,${value.fileBase64}`
      : null

  const toBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result!.toString().split(",")[1])
      reader.onerror = reject
    })

  const handleFileChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0]
    if (!file) return

    const base64 = await toBase64(file)

    onChange({
      fileName: file.name,
      fileType: file.type,
      fileBase64: base64,
      fileExtension: file.name.split(".").pop() || "",
      fileDetailsId: crypto.randomUUID(),
    })
  }

  return (
    <Card className="border-none shadow-none">
      <CardContent className="pt-6 border-none">
        <div className="flex gap-6 items-start">
          {/* Preview box */}
          <div className="flex h-28 w-28 items-center justify-center rounded-md border border-dashed">
            {previewSrc ? (
              <img
                src={previewSrc}
                alt="Preview"
                className="h-full w-full object-contain"
              />
            ) : (
              <FileImage className="h-6 w-6 text-muted-foreground" />
            )}
          </div>

          {/* Right section */}
          <div className="flex-1 space-y-2">
            <Label>{label}</Label>
            <p className="text-sm text-muted-foreground">
              Upload a high-quality logo for your reports and profile.
              Recommended: 512×512 PNG.
            </p>

            <div className="flex items-center gap-3">
              <Button
                type="button"
                onClick={() => inputRef.current?.click()}
              >
                <Upload className="mr-2 h-4 w-4" />
                Upload New
              </Button>

              {value && (
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => onChange(null)}
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Remove
                </Button>
              )}
            </div>

            {/* File info or empty message */}
            {value ? (
              <div className="flex items-center gap-2 rounded-md border-none px-3 py-2 text-sm">
                <FileImage className="h-4 w-4 text-muted-foreground" />
                <span>{value.fileName}</span>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">
                {emptyMessage}
              </p>
            )}

            <Input
              ref={inputRef}
              type="file"
              accept={accept}
              className="hidden"
              onChange={handleFileChange}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
