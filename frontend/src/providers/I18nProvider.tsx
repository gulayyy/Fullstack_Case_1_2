'use client'

import React, { createContext, useContext } from 'react'

interface I18nContextType {
  locale: string
  messages: Record<string, any>
  t: (key: string) => string
}

const I18nContext = createContext<I18nContextType | null>(null)

export function useTranslations(namespace?: string) {
  const context = useContext(I18nContext)
  if (!context) {
    throw new Error('useTranslations must be used within I18nProvider')
  }

  return (key: string) => {
    const fullKey = namespace ? `${namespace}.${key}` : key
    const keys = fullKey.split('.')
    let value = context.messages
    
    for (const k of keys) {
      value = value?.[k]
      if (value === undefined) break
    }
    
    return typeof value === 'string' ? value : fullKey
  }
}

interface I18nProviderProps {
  locale: string
  messages: Record<string, any>
  children: React.ReactNode
}

export default function I18nProvider({ locale, messages, children }: I18nProviderProps) {
  const t = (key: string) => {
    const keys = key.split('.')
    let value = messages
    
    for (const k of keys) {
      value = value?.[k]
      if (value === undefined) break
    }
    
    return typeof value === 'string' ? value : key
  }

  const contextValue: I18nContextType = {
    locale,
    messages,
    t
  }

  return (
    <I18nContext.Provider value={contextValue}>
      {children}
    </I18nContext.Provider>
  )
}
