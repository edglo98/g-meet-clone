import { Menu, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { Button } from '../Button/Button'

export default function Example () {
  return (
    <div className=''>
      <Menu as='div' className=''>
        <div>
          <Menu.Button style={{ padding: 0, margin: 0, border: 'none' }}>
            <Button title='Options' />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter='transition ease-out duration-100'
          enterFrom='transform opacity-0 scale-95'
          enterTo='transform opacity-100 scale-100'
          leave='transition ease-in duration-75'
          leaveFrom='transform opacity-100 scale-100'
          leaveTo='transform opacity-0 scale-95'
        >
          <Menu.Items className=''>
            <div className=''>
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${active ? 'bg-violet-500' : 'text-gray-900'} group`}
                  >
                    {active
                      ? (
                        <EditActiveIcon
                          style={{ height: '1.5rem', width: '1.5rem' }}
                          className='mr-2 h-5 w-5'
                          aria-hidden='true'
                        />
                        )
                      : (
                        <EditInactiveIcon
                          className='mr-2 h-5 w-5'
                          style={{ height: '1.5rem', width: '1.5rem' }}
                          aria-hidden='true'
                        />
                        )}
                    Edit
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active ? 'bg-violet-500 text-white' : 'text-gray-900'
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  >
                    {active
                      ? (
                        <DuplicateActiveIcon
                          className='mr-2 h-5 w-5'
                          style={{ height: '1.5rem', width: '1.5rem' }}
                          aria-hidden='true'
                        />
                        )
                      : (
                        <DuplicateInactiveIcon
                          className='mr-2 h-5 w-5'
                          style={{ height: '1.5rem', width: '1.5rem' }}
                          aria-hidden='true'
                        />
                        )}
                    Duplicate
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  )
}

function EditInactiveIcon (props) {
  return (
    <svg
      {...props}
      viewBox='0 0 20 20'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M4 13V16H7L16 7L13 4L4 13Z'
        fill='#EDE9FE'
        stroke='#A78BFA'
        strokeWidth='2'
      />
    </svg>
  )
}

function EditActiveIcon (props) {
  return (
    <svg
      {...props}
      viewBox='0 0 20 20'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M4 13V16H7L16 7L13 4L4 13Z'
        fill='#8B5CF6'
        stroke='#C4B5FD'
        strokeWidth='2'
      />
    </svg>
  )
}

function DuplicateInactiveIcon (props) {
  return (
    <svg
      {...props}
      viewBox='0 0 20 20'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M4 4H12V12H4V4Z'
        fill='#EDE9FE'
        stroke='#A78BFA'
        strokeWidth='2'
      />
      <path
        d='M8 8H16V16H8V8Z'
        fill='#EDE9FE'
        stroke='#A78BFA'
        strokeWidth='2'
      />
    </svg>
  )
}

function DuplicateActiveIcon (props) {
  return (
    <svg
      {...props}
      viewBox='0 0 20 20'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M4 4H12V12H4V4Z'
        fill='#8B5CF6'
        stroke='#C4B5FD'
        strokeWidth='2'
      />
      <path
        d='M8 8H16V16H8V8Z'
        fill='#8B5CF6'
        stroke='#C4B5FD'
        strokeWidth='2'
      />
    </svg>
  )
}
