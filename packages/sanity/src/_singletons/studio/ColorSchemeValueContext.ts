import {createContext} from 'react'
import type {StudioThemeColorSchemeKey} from 'sanity'

/**
 * Used to keep track of the internal value, which can be "system" in addition to "light" and "dark"
 * @internal
 */
export const ColorSchemeValueContext = createContext<StudioThemeColorSchemeKey | null>(null)