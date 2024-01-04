import AddUserModal from "@/app/components/add-user-modal";
import prisma from "@/lib/prisma";
import DeleteUser from "@/app/components/delete-user";

export const revalidate = 0

export default async function Home() {
    const users = await prisma.user.findMany()

    return (
        <div className={'w-scree h-screen p-4'}>
            <div className="pb-5 sm:flex sm:items-center sm:justify-between">
                <h3 className="text-base font-semibold leading-6 text-gray-900">
                    Users
                </h3>
                <div className="mt-3 sm:ml-4 sm:mt-0">
                    <AddUserModal/>
                </div>
            </div>

            <ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {users.map((user) => (

                <li
                    key={user.id}
                    className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow">
                        <div className="flex w-full items-center justify-between space-x-6 p-6">
                            <div className="flex-1 truncate">
                                <div className="flex flex-col">
                                    <h3 className="truncate text-sm font-medium text-gray-900">
                                        {user.name}
                                    </h3>
                                    <p className={'mt-3 text-gray-500 text-sm'}>
                                        {user.email}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <DeleteUser id={user.id} />
                    </li>
                ))}
            </ul>
        </div>
    )
}
