import { ExpandableLocalizedStrings } from "../../localization";

const mockTranslations: ExpandableLocalizedStrings = {
    "dev.iaindavis.docodylus.layout.expandable.collapsePrompt": "MOCK_EXPAND_PROMPT",
    "dev.iaindavis.docodylus.layout.expandable.expandPrompt": "MOCK_COLLAPSE_PROMPT"
} as const;

export const MOCK_DEFAULT_EXPAND_PROMPT = mockTranslations["dev.iaindavis.docodylus.layout.expandable.expandPrompt"]
export const MOCK_DEFAULT_COLLAPSE_PROMPT = mockTranslations["dev.iaindavis.docodylus.layout.expandable.collapsePrompt"]

export function mockUseTranslations() {
    return function (k: keyof ExpandableLocalizedStrings) {
        return mockTranslations[k] || `MISSING_TRANSLATION:${k}`
    }
}
