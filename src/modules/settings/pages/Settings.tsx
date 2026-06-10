import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const Settings = () => {
    const [activeTab, setActiveTab] = useState('Setting')
    const [formData, setFormData] = useState({
        privacyPolicyLink: '',
        termsAndCondition: '',
        androidAppVersion: '1.0.3',
        iosAppVersion: '1.0.0',
        androidAppLink: '',
        iosAppLink: '',
        websiteUrl: '',
        resendApiKey: 'RESEND API KEY',
        supportEmail: 'support@example.com'
    })

   

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSaveChanges = () => {
        console.log('Saving changes:', formData)
        // Add your save logic here
    }

    return (
        <div className="p-6">
            {/* Header */}
            

            

            {/* Main Content */}
            {activeTab === 'Setting' && (
                <div className="space-y-6">
                    {/* App Configuration Section */}
                    <Card>
                        <CardHeader>
                            <CardTitle>App Configuration</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="privacyPolicyLink">Privacy Policy Link</Label>
                                    <Input
                                        id="privacyPolicyLink"
                                        name="privacyPolicyLink"
                                        value={formData.privacyPolicyLink}
                                        onChange={handleInputChange}
                                        placeholder="Enter privacy policy URL"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="termsAndCondition">Terms and Condition</Label>
                                    <Input
                                        id="termsAndCondition"
                                        name="termsAndCondition"
                                        value={formData.termsAndCondition}
                                        onChange={handleInputChange}
                                        placeholder="Enter terms and conditions URL"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="androidAppVersion">Android App Version</Label>
                                    <Input
                                        id="androidAppVersion"
                                        name="androidAppVersion"
                                        value={formData.androidAppVersion}
                                        onChange={handleInputChange}
                                        placeholder="1.0.3"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="iosAppVersion">iOS App Version</Label>
                                    <Input
                                        id="iosAppVersion"
                                        name="iosAppVersion"
                                        value={formData.iosAppVersion}
                                        onChange={handleInputChange}
                                        placeholder="1.0.0"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="androidAppLink">Android App Link</Label>
                                    <Input
                                        id="androidAppLink"
                                        name="androidAppLink"
                                        value={formData.androidAppLink}
                                        onChange={handleInputChange}
                                        placeholder="Enter Android app store URL"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="iosAppLink">iOS App Link</Label>
                                    <Input
                                        id="iosAppLink"
                                        name="iosAppLink"
                                        value={formData.iosAppLink}
                                        onChange={handleInputChange}
                                        placeholder="Enter iOS app store URL"
                                    />
                                </div>
                                <div className="space-y-2 md:col-span-2">
                                    <Label htmlFor="websiteUrl">Website URL</Label>
                                    <Input
                                        id="websiteUrl"
                                        name="websiteUrl"
                                        value={formData.websiteUrl}
                                        onChange={handleInputChange}
                                        placeholder="Enter website URL"
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Email Setting Section */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Email Setting</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="resendApiKey">Resend Api Key</Label>
                                    <Input
                                        id="resendApiKey"
                                        name="resendApiKey"
                                        value={formData.resendApiKey}
                                        onChange={handleInputChange}
                                        placeholder="RESEND API KEY"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="supportEmail">Support Email</Label>
                                    <Input
                                        id="supportEmail"
                                        name="supportEmail"
                                        value={formData.supportEmail}
                                        onChange={handleInputChange}
                                        placeholder="support@example.com"
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Save Changes Button */}
                    <div className="flex justify-end">
                        <Button
                            variant="destructive"
                            onClick={handleSaveChanges}
                            className="bg-red-600 hover:bg-red-700 text-white"
                        >
                            Save Changes
                        </Button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Settings