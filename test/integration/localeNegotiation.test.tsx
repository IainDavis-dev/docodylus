import { describeIntegrationTest } from "@test-utils/testGroups";
import { render, screen, waitFor } from "@testing-library/react";
import { composeStories } from '@storybook/react';
import { ExpandableLocalizedStrings } from "@components/layout/Expandable/localization";
import I18nProvider from "@i18n/context/I18nProvider";
import userEvent from "@testing-library/user-event";

const EXPAND_PROMPT_KEY: keyof ExpandableLocalizedStrings = "dev.iaindavis.docodylus.layout.expandable.expandPrompt"
const COLLAPSE_PROMPT_KEY: keyof ExpandableLocalizedStrings = "dev.iaindavis.docodylus.layout.expandable.collapsePrompt"

const DEFAULT_LANGUAGE_ONLY_EXPAND_PROMPT = "DEFAULT_LANGUAGE_ONLY_EXPAND_PROMPT";
const DEFAULT_LANGUAGE_ONLY_COLLAPSE_PROMPT = "DEFAULT_LANGUAGE_ONLY_COLLAPSE_PROMPT";

const LANGUAGE_ONLY_EXPAND_PROMPT = "LANGUAGE_ONLY_EXPAND_PROMPT";
const LANGUAGE_ONLY_COLLAPSE_PROMPT = "LANGUAGE_ONLY_COLLAPSE_PROMPT";
const LANGUAGE_AND_REGION_EXPAND_PROMPT = "LANGUAGE_AND_REGION_EXPAND_PROMPT";
const LANGUAGE_AND_SCRIPT_EXPAND_PROMPT = "LANGUAGE_AND_SCRIPT_EXPAND_PROMPT";
const LANGUAGE_SCRIPT_REGION_COLLAPSE_PROMPT = "LANGUAGE_SCRIPT_REGION_COLLAPSE_PROMPT"

vi.mock("@components/layout/Expandable/localization/getRawLoaders", async () => {
    return {
        getRawLoaders: function(){
            return ({
                // language only: en (English)
                "./en.txlns.ts": () => Promise.resolve<ExpandableLocalizedStrings>({
                    [EXPAND_PROMPT_KEY]: DEFAULT_LANGUAGE_ONLY_EXPAND_PROMPT,
                    [COLLAPSE_PROMPT_KEY]: DEFAULT_LANGUAGE_ONLY_COLLAPSE_PROMPT
                }),
                // language-only: zh (Chinese)
                "./zh.txlns.ts": () => Promise.resolve<Partial<ExpandableLocalizedStrings>>({
                    [EXPAND_PROMPT_KEY]: LANGUAGE_ONLY_EXPAND_PROMPT,
                    [COLLAPSE_PROMPT_KEY]: LANGUAGE_ONLY_COLLAPSE_PROMPT
                }),
                // language-script: zh-Hant (Chinese, traditional Han script)
                "./zh-Hant.txlns.ts": () => Promise.resolve<Partial<ExpandableLocalizedStrings>>({
                    [EXPAND_PROMPT_KEY]: LANGUAGE_AND_SCRIPT_EXPAND_PROMPT 
                }),
                // language-region: zh-TW (Taiwanese Chinese)
                "./zh-TW.txlns.ts": () => Promise.resolve<Partial<ExpandableLocalizedStrings>>({
                    [EXPAND_PROMPT_KEY]: LANGUAGE_AND_REGION_EXPAND_PROMPT 
                }),
                // language-script: sr-Cyrl (Serbian Cyrillic)
                "./sr-Cyrl.txlns.ts": () => Promise.resolve<Partial<ExpandableLocalizedStrings>>({
                    [EXPAND_PROMPT_KEY]: LANGUAGE_AND_SCRIPT_EXPAND_PROMPT
                }),
                // language-script-region: sr-Cyrl-RS (Serbian Cyrillic, Serbia)
                "./sr-Cyrl-RS.txlns.ts": () => Promise.resolve<Partial<ExpandableLocalizedStrings>>({
                    [COLLAPSE_PROMPT_KEY]: LANGUAGE_SCRIPT_REGION_COLLAPSE_PROMPT
                }),
                // language-script: az (Azerbaijani)
                "./az-Latn.txlns.ts": () => Promise.resolve<Partial<ExpandableLocalizedStrings>>({
                    [EXPAND_PROMPT_KEY]: LANGUAGE_ONLY_EXPAND_PROMPT
                }),
                // language-script-region: az-Latn-AZ (Azerbaijani, Latin script, Azerbaijan region)
                "./az-Latn-AZ.txlns.ts": () => Promise.resolve<Partial<ExpandableLocalizedStrings>>({
                    [COLLAPSE_PROMPT_KEY]: LANGUAGE_SCRIPT_REGION_COLLAPSE_PROMPT
                }),
            });
        }
    }
});


import * as stories from '@components/layout/Expandable/storybook/Expandable.stories';
const {
    PreExpanded: PreExpandedStory,
    Default: DefaultStory
} = composeStories(stories);


describeIntegrationTest("i18n Module Tests", () => {

    it("should fall-back from language-and-region to language-only", async () => {
        render(
            <I18nProvider locale={'zh-TW'}>
                <DefaultStory/>
            </I18nProvider>
        );

        let expandButton, collapseButton
        await waitFor(() => {
            expandButton = screen.getByText(LANGUAGE_AND_REGION_EXPAND_PROMPT);
        })

        if(expandButton) await userEvent.click(expandButton);

        await waitFor(() => {
            collapseButton = screen.getByText(LANGUAGE_ONLY_COLLAPSE_PROMPT);
        })
    })

    it("should fall back from language-and-script to language-only", async () => {
        render(
            <I18nProvider locale={'zh-Hant'}>
                <DefaultStory/>
            </I18nProvider>
        );

        let expandButton, collapseButton
        await waitFor(() => {
            expandButton = screen.getByText(LANGUAGE_AND_SCRIPT_EXPAND_PROMPT);
        });

        if (expandButton) await userEvent.click(expandButton);

        await waitFor(() => {
            collapseButton = screen.getByText(LANGUAGE_ONLY_COLLAPSE_PROMPT)
        })
    })

    it("should fall back from language-script-region to language-script", async () => {
        render(
            <I18nProvider locale={'sr-Cyrl-RS'}>
                <PreExpandedStory/>
            </I18nProvider>
        );

        let expandButton, collapseButton;
        await waitFor(() => {
            collapseButton = screen.getByText(LANGUAGE_SCRIPT_REGION_COLLAPSE_PROMPT);
        })

        if(collapseButton) await userEvent.click(collapseButton);

        await waitFor(() => {
            expandButton = screen.getByText(LANGUAGE_AND_SCRIPT_EXPAND_PROMPT)
        })
    })

    it("should fall back from language-script-region to language-only when language-script is not available", async () => {
        render(
            <I18nProvider locale={'az-Latn-AZ'}>
                <PreExpandedStory/>
            </I18nProvider>
        );

        let expandButton, collapseButton;
        await waitFor(() => {
            collapseButton = screen.getByText(LANGUAGE_SCRIPT_REGION_COLLAPSE_PROMPT);
            expect(collapseButton).toBeInTheDocument();
        })

        if(collapseButton) await userEvent.click(collapseButton);

        await waitFor(() => {
            expandButton = screen.getByText(LANGUAGE_ONLY_EXPAND_PROMPT)
            expect(expandButton).toBeInTheDocument();
        })
    })

    it("should fall to the default locale when no translations are available for the requested locale", async () => {
        render(
            <I18nProvider locale={'so'}>
                <PreExpandedStory/>
            </I18nProvider>
        );

        let expandButton, collapseButton;
        await waitFor(() => {
            collapseButton = screen.getByText(DEFAULT_LANGUAGE_ONLY_COLLAPSE_PROMPT);
            expect(collapseButton).toBeInTheDocument();
        })

        if(collapseButton) await userEvent.click(collapseButton);

        await waitFor(() => {
            expandButton = screen.getByText(DEFAULT_LANGUAGE_ONLY_EXPAND_PROMPT)
            expect(expandButton).toBeInTheDocument();
        })
    })
})