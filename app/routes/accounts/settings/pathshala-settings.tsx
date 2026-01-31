import { useEffect, useState } from "react"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import NavigationHeaders from "~/components/ui/navigation-headers"
import { useTenantOrPathshalaStore } from "~/store/useTenantStore"
import { Contact, Image, InfoIcon, Save, Users } from "lucide-react"
import BlurOverlayLoader from "~/components/loading/overlay-loader"
import api from "~/lib/server/ApiClient"
import type { ApiResponse, FileDetails, Pathshala } from "~/lib/types/patshala"
import { toast } from "sonner";
import { FileUpload } from "~/components/ui/file-upload"
import { getBase64Size, MAX_FILE_SIZE_BYTES_LOGO } from "~/lib/utils"

/* ================= COMPONENT ================= */

export default function PathshalaSettingsPage() {
    const { pathshala } = useTenantOrPathshalaStore()
    const [loading, setLoading] = useState(false)

    /* ================= STATE ================= */

    const [general, setGeneral] = useState({
        pathshalaName: "",
        pathshalaCode: "",
        pathshalaType: "",
        subdomain: "",
    })

    const [contact, setContact] = useState({
        primaryPhone: "",
        secondaryPhone: "",
        email: "",
        alternateEmail: "",
        faxNumber: "",
    })

    const [leadership, setLeadership] = useState({
        principalName: "",
        principalPhone: "",
        principalEmail: "",
        adminContactName: "",
        adminContactPhone: "",
    })

    const [logo, setLogo] = useState<FileDetails | null>(null)

    /* ================= INIT ================= */

    useEffect(() => {
        if (!pathshala) return

        setGeneral({
            pathshalaName: pathshala.pathshalaName || "",
            pathshalaCode: pathshala.pathshalaCode || "",
            pathshalaType: pathshala.pathshalaType || "",
            subdomain: pathshala.subdomain || "",
        })

        setContact({
            primaryPhone: pathshala.contactInfo?.primaryPhone || "",
            secondaryPhone: pathshala.contactInfo?.secondaryPhone || "",
            email: pathshala.contactInfo?.email || "",
            alternateEmail: pathshala.contactInfo?.alternateEmail || "",
            faxNumber: pathshala.contactInfo?.faxNumber || "",
        })

        setLeadership({
            principalName: pathshala.contactInfo?.principalName || "",
            principalPhone: pathshala.contactInfo?.principalPhone || "",
            principalEmail: pathshala.contactInfo?.principalEmail || "",
            adminContactName: pathshala.contactInfo?.adminContactName || "",
            adminContactPhone: pathshala.contactInfo?.adminContactPhone || "",
        })
    }, [pathshala])

    /* ================= HELPERS ================= */

    const ensurePathshala = () => {
        if (!pathshala?.pathshalaId) {
            toast.error("Pathshala not loaded yet.")
            return false
        }
        return true
    }

    const headers = {
        headers: { "X-PATHSHALA-ID": pathshala?.subdomain || "" },
    }

    /* ================= SAVE HANDLERS ================= */

    const saveGeneral = async () => {
        if (!ensurePathshala()) return

        const name = general.pathshalaName.trim()
        const code = general.pathshalaCode.trim()
        const type = general.pathshalaType
        const subdomain = general.subdomain.trim()

        /* ================= VALIDATIONS ================= */

        if (!name) {
            toast.error("Pathshala name is required")
            return
        }

        if (name.length < 3) {
            toast.error("Pathshala name must be at least 3 characters")
            return
        }

        if (!code) {
            toast.error("Pathshala code is required")
            return
        }

        if (!type) {
            toast.error("Please select a Pathshala type")
            return
        }

        if (!subdomain) {
            toast.error("Subdomain is required")
            return
        }

        if (!/^[a-z0-9-]+$/.test(subdomain)) {
            toast.error("Subdomain can only contain lowercase letters, numbers, and hyphens")
            return
        }

        if (subdomain.length < 3) {
            toast.error("Subdomain must be at least 3 characters")
            return
        }

        /* ================= SAVE ================= */

        setLoading(true)
        try {
            const res: ApiResponse<Pathshala> = await api.post(
                `/pathshala/update-general/${pathshala!.pathshalaId}`,
                {
                    pathshalaName: name,
                    pathshalaCode: code,
                    pathshalaType: type,
                    subdomain,
                },
                headers
            )

            res.success
                ? toast.success("General information saved successfully.")
                : toast.error(res.message || "Failed to save general information.")
        } catch (error: any) {
            toast.error(error.message || "Something went wrong while saving general information.")
        } finally {
            setLoading(false)
        }
    }


    const saveContact = async () => {
        if (!ensurePathshala()) return
        setLoading(true)
        try {
            const res: any = await api.post(
                `/pathshala/update-contact/${pathshala!.pathshalaId}`,
                contact,
                headers
            )

            res.success
                ? toast.success("Contact information saved.")
                : toast.error(res.message)
        } catch {
            toast.error("Failed to save contact information.")
        } finally {
            setLoading(false)
        }
    }

    const saveLeadership = async () => {
        if (!ensurePathshala()) return;
        setLoading(true)
        try {
            const res: any = await api.post(
                `/pathshala/update-leadership/${pathshala!.pathshalaId}`,
                leadership,
                headers
            )

            res.success
                ? toast.success("Leadership information saved.")
                : toast.error(res.message)
        } catch {
            toast.error("Failed to save leadership information.")
        } finally {
            setLoading(false)
        }
    }

    const saveLogo = async () => {
        if (!ensurePathshala()) return;
        if (!logo) {
            toast.error("Please upload a logo before saving.");
            return;
        }

        const sizeInBytes = getBase64Size(logo.fileBase64);

        if (sizeInBytes > MAX_FILE_SIZE_BYTES_LOGO) {
            toast.error("Logo size must be under 300 KB");
            return;
        }

        setLoading(true);
        try {
            // Send the logo object directly, not wrapped inside { logo }
            const res: ApiResponse<Pathshala> = await api.post(
                `/pathshala/update-logo/${pathshala!.pathshalaId}`,
                logo, // <-- pass FileDetailsReqDTO directly
                headers
            );

            if (res.success) {
                toast.success("Logo saved successfully.");
            } else {
                toast.error(res.message || "Failed to save logo.");
            }

        } catch (err: any) {
            console.error("Error saving logo:", err);
            toast.error("Failed to save logo due to server error.");
        } finally {
            setLoading(false);
        }
    };


    /* ================= RENDER ================= */

    if (loading) return <BlurOverlayLoader message="Saving..." />

    return (
        <div className="min-h-screen w-full bg-muted/30 px-8 py-6 space-y-8">
            <NavigationHeaders
                title="Pathshala Settings"
                description="Manage school-wide settings and contact information."
            />

            {/* ================= GENERAL ================= */}
            <Card>
                <CardHeader className="flex flex-row justify-between">
                    <CardTitle className="flex gap-2">
                        <InfoIcon size={18} /> General Information
                    </CardTitle>
                    <Button size="sm" variant="outline" onClick={saveGeneral} disabled={loading}>
                        <Save /> Save
                    </Button>
                </CardHeader>

                <CardContent className="grid md:grid-cols-3 gap-6 border-t pt-4">
                    <InputField
                        label="Name"
                        value={general.pathshalaName}
                        onChange={v => setGeneral({ ...general, pathshalaName: v })}
                    />

                    <InputField
                        label="Code"
                        value={general.pathshalaCode}
                        onChange={v => setGeneral({ ...general, pathshalaCode: v })}
                    />

                    <div className="space-y-2">
                        <Label>Type</Label>
                        <Select
                            value={general.pathshalaType}
                            onValueChange={v =>
                                setGeneral({ ...general, pathshalaType: v })
                            }
                        >
                            <SelectTrigger className="h-10 w-full">
                                <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="SCHOOL">School</SelectItem>
                                <SelectItem value="COLLEGE">College</SelectItem>
                                <SelectItem value="COACHING">Coaching</SelectItem>
                                <SelectItem value="UNIVERSITY">University</SelectItem>
                                <SelectItem value="TRAINING_INSTITUTE">Training Institute</SelectItem>
                                <SelectItem value="OTHER">Other</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <InputField
                        label="Subdomain"
                        value={general.subdomain}
                        onChange={v => setGeneral({ ...general, subdomain: v })}
                    />

                    <div className="space-y-2">
                        <Label>Tier</Label>
                        <Badge>{pathshala?.tier}</Badge>
                    </div>
                </CardContent>
            </Card>
            {/* =================== LOGO =================== */}

            <Card >
                <CardHeader className="flex flex-row justify-between">
                    <CardTitle className="flex gap-2">
                        <Image size={18} /> Pathshala Logo
                    </CardTitle>
                    <Button size="sm" variant="outline" onClick={saveLogo} disabled={loading}>
                        <Save /> Save
                    </Button>
                </CardHeader>
                <CardContent className="w-full p-0 m-0 border-t">
                    <FileUpload
                        value={logo}
                        onChange={setLogo}
                        emptyMessage="School logo not uploaded yet"
                    />
                </CardContent>
            </Card>


            {/* ================= CONTACT ================= */}
            <Card>
                <CardHeader className="flex flex-row justify-between border-b">
                    <CardTitle className="flex gap-2">
                        <Contact size={18} /> Contact Information
                    </CardTitle>
                    <Button size="sm" variant="outline" onClick={saveContact} disabled={loading}>
                        <Save /> Save
                    </Button>
                </CardHeader>

                <CardContent className="grid md:grid-cols-2 gap-6">
                    <InputField label="Primary Phone" value={contact.primaryPhone}
                        onChange={v => setContact({ ...contact, primaryPhone: v })} />
                    <InputField label="Secondary Phone" value={contact.secondaryPhone}
                        onChange={v => setContact({ ...contact, secondaryPhone: v })} />
                    <InputField label="Primary Email" value={contact.email}
                        onChange={v => setContact({ ...contact, email: v })} />
                    <InputField label="Alternate Email" value={contact.alternateEmail}
                        onChange={v => setContact({ ...contact, alternateEmail: v })} />
                    <InputField label="Fax" value={contact.faxNumber}
                        onChange={v => setContact({ ...contact, faxNumber: v })} />
                </CardContent>
            </Card>

            {/* ================= LEADERSHIP ================= */}
            <Card>
                <CardHeader className="flex flex-row justify-between border-b">
                    <CardTitle className="flex gap-2">
                        <Users size={18} /> Leadership
                    </CardTitle>
                    <Button size="sm" variant="outline" onClick={saveLeadership} disabled={loading}>
                        <Save /> Save
                    </Button>
                </CardHeader>

                <CardContent className="grid md:grid-cols-3 gap-6">
                    <InputField label="Principal Name" value={leadership.principalName}
                        onChange={v => setLeadership({ ...leadership, principalName: v })} />
                    <InputField label="Principal Phone" value={leadership.principalPhone}
                        onChange={v => setLeadership({ ...leadership, principalPhone: v })} />
                    <InputField label="Principal Email" value={leadership.principalEmail}
                        onChange={v => setLeadership({ ...leadership, principalEmail: v })} />
                    <InputField label="Admin Name" value={leadership.adminContactName}
                        onChange={v => setLeadership({ ...leadership, adminContactName: v })} />
                    <InputField label="Admin Phone" value={leadership.adminContactPhone}
                        onChange={v => setLeadership({ ...leadership, adminContactPhone: v })} />
                </CardContent>
            </Card>
        </div>
    )
}

/* ================= SMALL HELPER ================= */

function InputField({
    label,
    value,
    onChange,
}: {
    label: string
    value: string
    onChange: (v: string) => void
}) {
    return (
        <div className="space-y-2">
            <Label>{label}</Label>
            <Input
                className="h-10"
                value={value}
                onChange={e => onChange(e.target.value)}
            />
        </div>
    )
}
