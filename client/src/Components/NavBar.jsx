import { Fragment,useEffect,useState } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { NavLink } from "react-router-dom";
import { toast } from 'react-hot-toast';



function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function NavBar({adminCheck, updateStatus,loginCheck,logOut,username}) {
const [checkAuth,setCheckAuth] =useState()
console.log(loginCheck)

  //NAVIGATION MENU 
  const navigation = loginCheck? [
    { name: 'Home', href: 'Home', current: true,status: "show" },
    { name: 'Champions', href: 'Dashboard', current: false ,status: "show"},
    { name: 'AudiTrail', href: 'AuditTrail', current: false ,status: "show"},
    { name: 'Log Out', href: "" , current: false,status: logOut}
  ]: [
    { name: 'Login', href: '/', current: false,status: "show" },
    { name: 'Signup', href: 'Signup', current: false,status: "show" },

  ]

  return (
    <Disclosure as="nav" className="bg-gray-800">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl   sm:px-6 lg:px-8">
            <div className="relative flex p-1 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <img
                    className="block h-6 w-auto lg:hidden"
                    src="https://res.cloudinary.com/dqab6gg7d/image/upload/v1683268767/mern-authentication/user_318-928479_hnn2v9.avif"
                    alt="Your Company"
                  />
                  <img
                    className="hidden h-6 w-auto lg:block"
                    src="https://res.cloudinary.com/dqab6gg7d/image/upload/v1683268767/mern-authentication/user_318-928479_hnn2v9.avif"
                    alt="Your Company"
                  />
                  <p className='text-white ml-1'>Champions</p>
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                    item.status?
                     <NavLink 
                    
                     to={item.href}
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                          'rounded-md px-3 py-2 text-xs font-medium'
                        )}
                        aria-current={item.current ? 'page' : undefined}
                      >
                        {item.name}
                        </NavLink>
                        :
                        <NavLink 
                       
                        to={item.href}
                           key={item.name}
                           href={item.href}
                           className={classNames(
                             item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                             'rounded-md px-3 py-2 text-sm font-medium'
                           )}
                           aria-current={item.current ? 'page' : undefined}
                         >
                           {item.name}
                           </NavLink>
                        
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">

                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="h-6 w-6 rounded-full"
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        alt=""
                      />
                    {/* <p className='text-white text-[10px] ml-2'>Brian Koskei</p> */}
                    </Menu.Button>
                  </div>
                  
                </Menu>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (

                <NavLink
                  key={item.name}
                 
                  as="a"
                  to={item.href}
                  className={classNames(
                    item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                    'block rounded-md px-3 py-2 text-base font-medium'
                  )}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.name}
                </NavLink>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}