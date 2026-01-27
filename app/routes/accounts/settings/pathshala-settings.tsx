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

export default function PathshalaSettingsPage() {
    return (
        <div className="min-h-screen w-full bg-muted/30 px-8 py-6 space-y-8">
            {/* Page Header */}
            <div className="flex items-start justify-between">
                <div>
                    <h1 className="text-2xl font-semibold">Pathshala Settings</h1>
                    <p className="text-sm text-muted-foreground">
                        Manage school-wide settings, branding, and core contact information.
                    </p>
                </div>
                <Button variant="outline">View Public Profile</Button>
            </div>

            {/* General Information */}
            <Card className="w-full">
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>General Information</CardTitle>
                    <Button size="sm">Save General Info</Button>
                </CardHeader>

                <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="space-y-2">
                            <Label>Pathshala Name</Label>
                            <Input className="h-10" defaultValue="VK Learning Center" />
                        </div>

                        <div className="space-y-2">
                            <Label>Pathshala Code</Label>
                            <Input className="h-10" defaultValue="VK_LEARNING_001" />
                        </div>

                        <div className="space-y-2">
                            <Label>Pathshala Type</Label>
                            <Select defaultValue="school">
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
                                <Input className="h-10 rounded-r-none" defaultValue="vk-learnings" />
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

            {/* School Branding */}
            <Card className="w-full">
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>School Branding</CardTitle>
                    <Button size="sm">Save Branding</Button>
                </CardHeader>

                <CardContent className="flex flex-col md:flex-row gap-6">
                    <div className="flex h-36 w-36 items-center justify-center rounded-md border border-dashed">
                        Logo
                    </div>

                    <div className="space-y-2">
                        <Label>School Logo</Label>
                        <p className="text-sm text-muted-foreground">
                            Upload a high-quality logo for your reports and profile.
                            Recommended: 512×512 PNG.
                        </p>
                        <div className="flex items-center gap-2">
                            <Button size="sm">Upload New</Button>
                            <Button size="sm" variant="link">
                                Remove
                            </Button>
                        </div>
                        <p className="text-xs text-muted-foreground">
                            school-logo-vk.png · 240 KB
                        </p>
                    </div>
                </CardContent>
            </Card>

            {/* Contact Information */}
            <Card className="w-full">
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Contact Information</CardTitle>
                    <Button size="sm">Save Contact Info</Button>
                </CardHeader>

                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <Label>Primary Phone</Label>
                        <Input className="h-10" defaultValue="+91 98765-43210" />
                    </div>

                    <div className="space-y-2">
                        <Label>Secondary Phone</Label>
                        <Input className="h-10" defaultValue="+91 22-1234567" />
                    </div>

                    <div className="space-y-2">
                        <Label>Primary Email</Label>
                        <Input className="h-10" defaultValue="contact@vklearning.edu.in" />
                    </div>

                    <div className="space-y-2">
                        <Label>Alternate Email</Label>
                        <Input className="h-10" defaultValue="admin@vklearning.edu.in" />
                    </div>

                    <div className="space-y-2">
                        <Label>Fax Number</Label>
                        <Input className="h-10" defaultValue="+91 22-1234568" />
                    </div>
                </CardContent>
            </Card>

            {/* Leadership */}
            <Card className="w-full">
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Leadership & Admin Contact</CardTitle>
                    <Button size="sm">Save Leadership</Button>
                </CardHeader>

                <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                        <Label>Principal Name</Label>
                        <Input className="h-10" defaultValue="Dr. Vikram Kumar" />
                    </div>

                    <div className="space-y-2">
                        <Label>Principal Phone</Label>
                        <Input className="h-10" defaultValue="+91 99999-88888" />
                    </div>

                    <div className="space-y-2">
                        <Label>Principal Email</Label>
                        <Input className="h-10" defaultValue="principal@vklearning.edu.in" />
                    </div>

                    <div className="space-y-2">
                        <Label>Admin Contact Name</Label>
                        <Input className="h-10" defaultValue="Mr. Rajesh Singh" />
                    </div>

                    <div className="space-y-2">
                        <Label>Admin Contact Phone</Label>
                        <Input className="h-10" defaultValue="+91 99999-77777" />
                    </div>
                </CardContent>
            </Card>

            {/* System Info */}
            <Card className="w-full">
                <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
                    <div>
                        <p className="text-muted-foreground">Pathshala ID</p>
                        <p>PS-IND-4492-VK-2024</p>
                    </div>
                    <div>
                        <p className="text-muted-foreground">Created On</p>
                        <p>12 Jan 2024, 10:45 AM</p>
                    </div>
                    <div>
                        <p className="text-muted-foreground">Last Updated</p>
                        <p>Yesterday, 04:32 PM</p>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
