import { Outlet } from 'react-router'

const SettingsLayout = () => {


    const tabs = [
        'Setting',
        'Ads Setting',
        'Storage',
        'Payment',
        'Report Reasons',
        'Currency',
        'Profile'
    ]
    return <section>
        <div className="mb-6">
            <h1 className="text-2xl font-semibold">Setting</h1>
            <p className="text-muted-foreground">Manage your application configuration and preferences</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 border-b border-border pb-4">
            {tabs.map((tab) => (
                <button
                    key={tab}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${tab === 'Setting'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground hover:bg-muted/80'
                        }`}
                >
                    {tab}
                </button>
            ))}
        </div>
        <Outlet />
    </section>
}

export default SettingsLayout