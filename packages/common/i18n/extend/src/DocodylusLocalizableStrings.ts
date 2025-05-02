/**
 * Modules may augment this interface with their own localizable strings.
 *
 * Example:
 * ```ts
 * declare module '@docodylus/i18n-extend' {
 *   // Extend the global localizable string map with your module's strings
 *   export interface DocodylusLocalizableStrings extends MyModuleLocalizableStrings {}
 * }
 * ```
 *
 * This allows each module to contribute its own keys to the shared
 * localization system without modifying centralized types.
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface DocodylusLocalizableStrings {}