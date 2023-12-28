import {EnvelopeIcon, PhoneIcon} from '@heroicons/react/20/solid'
import prisma from "@/lib/prisma";
import AddUserModal from "@/app/components/add-user-modal";

export default async function Home() {
    const users = await prisma.user.findMany({});

    return (
        <div className={'w-scree h-screen p-4'}>
            <div className="pb-5 sm:flex sm:items-center sm:justify-between">
                <h3 className="text-base font-semibold leading-6 text-gray-900">
                    Users
                </h3>
                <div className="mt-3 sm:ml-4 sm:mt-0">
                   <AddUserModal />
                </div>
            </div>


            <ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {users.map((person) => (
                    <li key={person.email} className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow">
                        <div className="flex w-full items-center justify-between space-x-6 p-6">
                            <div className="flex-1 truncate">
                                <div className="flex items-center space-x-3">
                                    <h3 className="truncate text-sm font-medium text-gray-900">{person.name}</h3>
                                    <span
                                        className="inline-flex flex-shrink-0 items-center rounded-full bg-green-50 px-1.5 py-0.5 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                                        {person.role}
                  </span>
                                </div>
                                <p className="mt-1 truncate text-sm text-gray-500">{person.title}</p>
                            </div>
                            <img className="h-10 w-10 flex-shrink-0 rounded-full bg-gray-300"
                                 src={'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60'}
                                 alt=""/>
                        </div>
                        <div>
                            <div className="-mt-px flex divide-x divide-gray-200">
                                <div className="flex w-0 flex-1">
                                    <a
                                        href={`mailto:${person.phone}`}
                                        className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
                                    >
                                        <EnvelopeIcon className="h-5 w-5 text-gray-400" aria-hidden="true"/>
                                        Email
                                    </a>
                                </div>
                                <div className="-ml-px flex w-0 flex-1">
                                    <a
                                        href={`tel:${person.email}`}
                                        className="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
                                    >
                                        <PhoneIcon className="h-5 w-5 text-gray-400" aria-hidden="true"/>
                                        Call
                                    </a>
                                </div>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}
