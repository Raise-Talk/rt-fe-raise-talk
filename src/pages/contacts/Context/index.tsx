import React, { useState, createContext, useContext } from 'react'

interface ContactContextProps {
  contacts: any[]
  setContacts: (contacts: any[]) => void
}

const Context = createContext<ContactContextProps>({
  contacts: [],
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setContacts: () => {}
})

export const useContactContext = () => useContext(Context)

export const ContactProvider = ({ children }: any) => {
  const [contacts, setContacts] = useState<any>([])

  return (
    <Context.Provider
      value={{
        contacts,
        setContacts
      }}
    >
      {children}
    </Context.Provider>
  )
}
