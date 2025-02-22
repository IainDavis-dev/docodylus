import { describeIntegrationTest } from '@test-utils/testGroups';
import { render, screen, waitFor } from '@testing-library/react';
import { composeStories } from '@storybook/react';

import * as stories from '../storybook/Expandable.stories'
import { DEFAULT_LOCALE, DEFAULT_TRANSLATIONS } from '@i18n/consts';
import { ValidLocale, LocalizedStrings, DocodylusLocalizedStrings } from '@i18n/types';
import { ExpandableLocalizedStrings } from '../localization';
import I18nProvider from '@i18n/context/I18nProvider';

const localizedStrings = Object.entries(
import.meta.glob<Record<string, {default: LocalizedStrings}>>("../localization/*.txlns.ts", { eager: true })
).reduce<Record<ValidLocale, ExpandableLocalizedStrings>>(
    (txlns, [key, value]) => {
        const transformedKey = key.match(/\.\.\/localization\/(?<locale>.*)\.txlns\.ts/)?.groups?.locale;
        const { default: transformedValue } = value;
        if(!transformedKey || !transformedValue) return txlns
        else return {...txlns, [transformedKey]: transformedValue}
    },
    {} as any);

const COLLAPSE_PROMPT_KEY: keyof ExpandableLocalizedStrings = 'iaindavis-dev.docodylus.layout.expandable.collapsePrompt' as const;
const EXPAND_PROMPT_KEY: keyof ExpandableLocalizedStrings = 'iaindavis-dev.docodylus.layout.expandable.expandPrompt' as const ;
const TXLNS_LOADING_KEY = 'iaindavis-dev.docodylus.i18n.txlns-loading' as keyof DocodylusLocalizedStrings;

const {
    Default: DefaultStory,
    PreExpanded: PreExpandedStory,
} = composeStories(stories);

describeIntegrationTest('i18n Integration Tests (storybook)', () => {
    describe("Basic string localization", () => {

        describe("With no I18nProvider...", () => {
            it('should notify the user when the translations are still loading in the default language (en)', () => {
                render(<PreExpandedStory />)
                const TXLNS_LOADING_MSG = DEFAULT_TRANSLATIONS?.[DEFAULT_LOCALE]?.[TXLNS_LOADING_KEY as keyof DocodylusLocalizedStrings]
                const loadingMsg = screen.getByText(TXLNS_LOADING_MSG as keyof DocodylusLocalizedStrings);
                expect(loadingMsg).toBeVisible();
            });

            it('should use the default language (en) for the collapse prompt', async () => {
                render(<PreExpandedStory />)
                const DEFAULT_COLLAPSE_PROMPT = localizedStrings[DEFAULT_LOCALE][COLLAPSE_PROMPT_KEY];

                await waitFor(() => {
                    const collapsePrompt = screen.getByText(DEFAULT_COLLAPSE_PROMPT);
                    expect(collapsePrompt).toBeVisible();
                })
            });

            it('should use the default language for the expand prompt', async () => {
                render(<DefaultStory/>) // default starts in collapsed state
                const DEFAULT_EXPAND_PROMPT = localizedStrings[DEFAULT_LOCALE][EXPAND_PROMPT_KEY]

                await waitFor(() => {
                    const expandPrompt = screen.getByText(DEFAULT_EXPAND_PROMPT);
                    expect(expandPrompt).toBeVisible();
                });
            });
        });

        describe.each([
            "en",
            "es",
        ] satisfies ValidLocale[])('When the I18nProvider specifies language-only locale "%s"...', (locale: ValidLocale) => {
            it(`should notify the user (locale ${locale}) when the translations are still loading`, () => {
                render(
                    <I18nProvider locale={locale}>
                        <PreExpandedStory />
                    </I18nProvider>)
                const TXLNS_LOADING_MSG = DEFAULT_TRANSLATIONS[locale]?.[TXLNS_LOADING_KEY]
                if(!TXLNS_LOADING_MSG) assert.fail(`No translations-loading message available for locale '${locale}'`)
                const loadingMsg = screen.getByText(TXLNS_LOADING_MSG as string);
                expect(loadingMsg).toBeVisible();
            });

            it(`should render the collapse prompt appropriately for ${locale}`, async () => {
                render(
                    <I18nProvider locale={locale}>
                        <PreExpandedStory/>
                    </I18nProvider>
                )
                const LOCALIZED_COLLAPSE_PROMPT = localizedStrings[locale][COLLAPSE_PROMPT_KEY];

                await waitFor(() => {
                    const collapsePrompt = screen.getByText(LOCALIZED_COLLAPSE_PROMPT);
                    expect(collapsePrompt).toBeVisible();
                })
            })

            it(`should render the expand prompt appropriately for ${locale}`, async () => {
                render(
                    <I18nProvider locale={locale}>
                        <DefaultStory/>
                    </I18nProvider>
                )
                const LOCALIZED_EXPAND_PROMPT = localizedStrings[locale][EXPAND_PROMPT_KEY];

                await waitFor(() => {
                    const expandPrompt = screen.getByText(LOCALIZED_EXPAND_PROMPT);
                    expect(expandPrompt).toBeVisible();
                })
            })
        })
    })

});
        