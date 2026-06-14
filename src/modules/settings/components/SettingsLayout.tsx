import { CreditCardAddIcon, Database02Icon, Dollar01Icon, Settings01Icon, User02Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { Link, Outlet, useLocation } from 'react-router'

const SettingsLayout = () => {


    const pagePath = window.location.pathname.split('/')[2];
    const location = useLocation();
 
    const tabs = [
        {
            name: 'Setting',
            path: '/settings',
            icon: Settings01Icon,
        },
        {
            name: 'Ads Setting',
            path: '/settings/ads-setting',
            icon: Database02Icon,
        },
        {
            name: 'Storage',
            path: '/settings/storage',
            icon:Database02Icon
        },
        {
            name: 'Payment',
            path: '/settings/payment',
            icon: CreditCardAddIcon
        },
        {
            name: 'Report Reasons',
            path: '/settings/report-reasons',
            icon: Dollar01Icon
        },
        {
            name: 'Currency',
            path: '/settings/currency',
            icon: Dollar01Icon
        },
        {
            name: 'Profile',
            path: '/settings/profile',
            icon: User02Icon
        }
    ]

    console.log(location.pathname);
    
    return <section className='w-full p-2 '>

        <section className='flex flex-col  items-start justify-start bg-background'>
            <section className=" p-4">
                <div className='text-2xl font-semibold'>Settings</div>
                <p className="text-muted-foreground">Manage your application configuration and preferences</p>
            </section>


            {/* Tabs */}
            <section className="flex w-full gap-2 mb-6 border-y border-border ">
                {tabs.map((tab) => (
                    <Link 
                        key={tab.path}
                        to={tab.path}
                        className={`flex items-center gap-2 px-4 py-2  hover:bg-muted transition-colors ${location.pathname === tab.path ? 'text-primary border-b-2 border-primary' : ''}`}
                    >
                         {'icon' in tab && <HugeiconsIcon icon={tab.icon} strokeWidth={2} className="size-4" />}
                        {tab.name}
                    </Link>
                ))}
            </section>

        </section>

        <Outlet />
    </section>
}

export default SettingsLayout