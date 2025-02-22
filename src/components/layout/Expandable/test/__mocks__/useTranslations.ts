import { ExpandableLocalizedStrings } from "../../localization";

const mockTranslations: ExpandableLocalizedStrings = {
    "iaindavis-dev.docodylus.layout.expandable.collapsePrompt": "MOCK_EXPAND_PROMPT",
    "iaindavis-dev.docodylus.layout.expandable.expandPrompt": "MOCK_COLLAPSE_PROMPT"
} as const;

export const MOCK_DEFAULT_EXPAND_PROMPT = mockTranslations["iaindavis-dev.docodylus.layout.expandable.expandPrompt"]
export const MOCK_DEFAULT_COLLAPSE_PROMPT = mockTranslations["iaindavis-dev.docodylus.layout.expandable.collapsePrompt"]

export function mockUseTranslations() {
    return function (k: keyof ExpandableLocalizedStrings) {
        return mockTranslations[k] || `MISSING_TRANSLATION:${k}`
    }
}
