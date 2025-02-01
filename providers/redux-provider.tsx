"use client"

import type React from "react"
import { useMemo } from "react"
import { Provider } from "react-redux"
import { createStore } from "@/store/store"
import { ApiClient } from "@/lib/api-client"

export function ReduxProvider({
  children,
  username,
  password,
}: {
  children: React.ReactNode
  username: string
  password: string
}) {
  const store = useMemo(() => {
    const apiClient = new ApiClient({ username, password })
    return createStore(apiClient)
  }, [username, password])

  return <Provider store={store}>{children}</Provider>
}

