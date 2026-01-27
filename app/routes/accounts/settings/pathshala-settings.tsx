
import { useState } from "react"
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
import { useNavigate } from "react-router"

export default function PathshalaSettingsPage() {

    /* ================= GENERAL INFO ================= */

    const navigate = useNavigate();

    const generalInitial = {
        name: "VK Learning Center",
        code: "VK_LEARNING_001",
        type: "school",
        subdomain: "vk-learnings",
    }

    const [general, setGeneral] = useState(generalInitial)

    const generalChanged =
        JSON.stringify(general) !== JSON.stringify(generalInitial)

    function saveGeneralInfo() {
        console.log("Saving General Info", general)
        Object.assign(generalInitial, general)
    }

    /* ================= CONTACT INFO ================= */

    const contactInitial = {
        phone1: "+91 98765-43210",
        phone2: "+91 22-1234567",
        email1: "contact@vklearning.edu.in",
        email2: "admin@vklearning.edu.in",
        fax: "+91 22-1234568",
    }

    const [contact, setContact] = useState(contactInitial)

    const contactChanged =
        JSON.stringify(contact) !== JSON.stringify(contactInitial)

    function saveContactInfo() {
        console.log("Saving Contact Info", contact)
        Object.assign(contactInitial, contact)
    }

    /* ================= LEADERSHIP ================= */

    const leadershipInitial = {
        principalName: "Dr. Vikram Kumar",
        principalPhone: "+91 99999-88888",
        principalEmail: "principal@vklearning.edu.in",
        adminName: "Mr. Rajesh Singh",
        adminPhone: "+91 99999-77777",
    }

    const [leadership, setLeadership] = useState(leadershipInitial)

    const leadershipChanged =
        JSON.stringify(leadership) !== JSON.stringify(leadershipInitial)

    function saveLeadership() {
        console.log("Saving Leadership", leadership)
        Object.assign(leadershipInitial, leadership)
    }

    return (
        <div className="min-h-screen w-full bg-muted/30 px-8 py-6 space-y-8">
            <NavigationHeaders
                title="Pathshala Settings"
                description="Manage school-wide settings, branding, and core contact information."
                rightButtonLabel="View Public Profile"
                onRightButtonClick={() => navigate("/public-profile")}
            />

            {/* ================= GENERAL ================= */}
            <Card className="w-full">
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>General Information</CardTitle>
                    <Button size="sm" disabled={!generalChanged} onClick={saveGeneralInfo}>
                        Save General Info
                    </Button>
                </CardHeader>

                <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="space-y-2">
                            <Label>Pathshala Name</Label>
                            <Input
                                value={general.name}
                                onChange={(e) =>
                                    setGeneral({ ...general, name: e.target.value })
                                }
                            />
                        </div>

                        <div className="space-y-2">
                            <Label>Pathshala Code</Label>
                            <Input
                                value={general.code}
                                onChange={(e) =>
                                    setGeneral({ ...general, code: e.target.value })
                                }
                            />
                        </div>

                        <div className="space-y-2">
                            <Label>Pathshala Type</Label>
                            <Select
                                value={general.type}
                                onValueChange={(v) =>
                                    setGeneral({ ...general, type: v })
                                }
                            >
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="school">School</SelectItem>
                                    <SelectItem value="college">College</SelectItem>
                                    <SelectItem value="coaching">Coaching</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="space-y-2">
                            <Label>Subdomain</Label>
                            <div className="flex">
                                <Input
                                    className="rounded-r-none"
                                    value={general.subdomain}
                                    onChange={(e) =>
                                        setGeneral({ ...general, subdomain: e.target.value })
                                    }
                                />
                                <div className="flex items-center rounded-r-md border border-l-0 px-3 text-sm text-muted-foreground">
                                    .pathshala.io
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label>Tier</Label>
                            <div className="flex h-10 items-center rounded-md border px-3">
                                <Badge>FREE (Standard)</Badge>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* ================= CONTACT ================= */}
            <Card className="w-full">
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Contact Information</CardTitle>
                    <Button size="sm" disabled={!contactChanged} onClick={saveContactInfo}>
                        Save Contact Info
                    </Button>
                </CardHeader>

                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <Label>Primary Phone</Label>
                        <Input value={contact.phone1} onChange={(e) => setContact({ ...contact, phone1: e.target.value })} />
                    </div>

                    <div className="space-y-2">
                        <Label>Secondary Phone</Label>
                        <Input value={contact.phone2} onChange={(e) => setContact({ ...contact, phone2: e.target.value })} />
                    </div>

                    <div className="space-y-2">
                        <Label>Primary Email</Label>
                        <Input value={contact.email1} onChange={(e) => setContact({ ...contact, email1: e.target.value })} />
                    </div>

                    <div className="space-y-2">
                        <Label>Alternate Email</Label>
                        <Input value={contact.email2} onChange={(e) => setContact({ ...contact, email2: e.target.value })} />
                    </div>

                    <div className="space-y-2">
                        <Label>Fax Number</Label>
                        <Input value={contact.fax} onChange={(e) => setContact({ ...contact, fax: e.target.value })} />
                    </div>
                </CardContent>
            </Card>

            {/* ================= LEADERSHIP ================= */}
            <Card className="w-full">
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Leadership & Admin Contact</CardTitle>
                    <Button size="sm" disabled={!leadershipChanged} onClick={saveLeadership}>
                        Save Leadership
                    </Button>
                </CardHeader>

                <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                        <Label>Principal Name</Label>
                        <Input value={leadership.principalName} onChange={(e) => setLeadership({ ...leadership, principalName: e.target.value })} />
                    </div>

                    <div className="space-y-2">
                        <Label>Principal Phone</Label>
                        <Input value={leadership.principalPhone} onChange={(e) => setLeadership({ ...leadership, principalPhone: e.target.value })} />
                    </div>

                    <div className="space-y-2">
                        <Label>Principal Email</Label>
                        <Input value={leadership.principalEmail} onChange={(e) => setLeadership({ ...leadership, principalEmail: e.target.value })} />
                    </div>

                    <div className="space-y-2">
                        <Label>Admin Contact Name</Label>
                        <Input value={leadership.adminName} onChange={(e) => setLeadership({ ...leadership, adminName: e.target.value })} />
                    </div>

                    <div className="space-y-2">
                        <Label>Admin Contact Phone</Label>
                        <Input value={leadership.adminPhone} onChange={(e) => setLeadership({ ...leadership, adminPhone: e.target.value })} />
                    </div>
                </CardContent>
            </Card>

        </div>
    )
}
