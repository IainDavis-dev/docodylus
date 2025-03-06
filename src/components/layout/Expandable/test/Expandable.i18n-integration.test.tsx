import { describeIntegrationTest } from '@test-utils/testGroups';
import { render, screen, waitFor } from '@testing-library/react';
import { composeStories } from '@storybook/react';

import { DEFAULT_LOCALE, DEFAULT_TRANSLATIONS, SupportedLocale } from '@i18n/consts';
import { ValidLocale, LocalizedStrings, DocodylusLocalizedStrings } from '@i18n/types';
import { I18nProvider } from '@i18n/context/I18nProvider';
import { ExpandableLocalizedStrings } from '../localization';
import * as stories from '../storybook/Expandable.stories';

const localizedStrings = Object.entries(
  import.meta.glob<Record<string, {default: LocalizedStrings}>>('../localization/txlns/*.txlns.ts', { eager: true }),
).reduce<Partial<Record<ValidLocale, ExpandableLocalizedStrings>>>(
  (txlns, [key, value]) => {
    const transformedKey = key.match(/\/localization\/txlns\/(?<locale>.*)\.txlns\.ts/)?.groups?.locale;
    const { default: transformedValue } = value;
    if (transformedKey === undefined || transformedValue === undefined) return txlns;
    return { ...txlns, [transformedKey]: transformedValue };
  },
  {},
);

const COLLAPSE_PROMPT_KEY: keyof ExpandableLocalizedStrings = 'dev.iaindavis.docodylus.layout.expandable.collapsePrompt';
const EXPAND_PROMPT_KEY: keyof ExpandableLocalizedStrings = 'dev.iaindavis.docodylus.layout.expandable.expandPrompt';

const {
  Default: DefaultStory,
  PreExpanded: PreExpandedStory,
} = composeStories(stories);

describeIntegrationTest('i18n Integration Tests (storybook)', () => {
  describe('Basic string localization', () => {
    describe('With no I18nProvider...', () => {
      it('should notify the user when the translations are still loading in the default language (en)', () => {
        render(<PreExpandedStory />);
        const TXLNS_LOADING_MSG = DEFAULT_TRANSLATIONS?.[DEFAULT_LOCALE]?.['dev.iaindavis.docodylus.internationalization.txlns-loading'];
        const loadingMsg = screen.getByText(TXLNS_LOADING_MSG as keyof DocodylusLocalizedStrings);
        expect(loadingMsg).toBeVisible();
      });

      it('should use the default language (en) for the collapse prompt', async () => {
        render(<PreExpandedStory />);
        const DEFAULT_COLLAPSE_PROMPT = localizedStrings[DEFAULT_LOCALE]?.[COLLAPSE_PROMPT_KEY] ?? 'TEST_FAIL';
        await waitFor(() => {
          const collapsePrompt = screen.getByText(DEFAULT_COLLAPSE_PROMPT);
          expect(collapsePrompt).toBeVisible();
        });
      });

      it('should use the default language for the expand prompt', async () => {
        render(<DefaultStory />); // default starts in collapsed state
        const DEFAULT_EXPAND_PROMPT = localizedStrings[DEFAULT_LOCALE]?.[EXPAND_PROMPT_KEY] ?? 'TEST_FAIL';

        await waitFor(() => {
          const expandPrompt = screen.getByText(DEFAULT_EXPAND_PROMPT);
          expect(expandPrompt).toBeVisible();
        });
      });
    });

    describe.each([
      'en',
      'es',
    ] satisfies SupportedLocale[])('When the I18nProvider specifies language-only locale "%s"...', (locale: SupportedLocale) => {
      it(`should notify the user (locale ${locale}) when the translations are still loading`, () => {
        render(
          <I18nProvider locale={locale}>
            <PreExpandedStory />
          </I18nProvider>,
        );
        const TXLNS_LOADING_MSG = DEFAULT_TRANSLATIONS[locale]?.['dev.iaindavis.docodylus.internationalization.txlns-loading'];
        if (TXLNS_LOADING_MSG === undefined) assert.fail(`No translations-loading message available for locale '${locale}'`);
        const loadingMsg = screen.getByText(TXLNS_LOADING_MSG);
        expect(loadingMsg).toBeVisible();
      });

      it(`should render the collapse prompt appropriately for ${locale}`, async () => {
        render(
          <I18nProvider locale={locale}>
            <PreExpandedStory />
          </I18nProvider>,
        );
        const LOCALIZED_COLLAPSE_PROMPT = localizedStrings[locale]?.[COLLAPSE_PROMPT_KEY] ?? 'TEST_FAIL';

        await waitFor(() => {
          const collapsePrompt = screen.getByText(LOCALIZED_COLLAPSE_PROMPT);
          expect(collapsePrompt).toBeVisible();
        });
      });

      it(`should render the expand prompt appropriately for ${locale}`, async () => {
        render(
          <I18nProvider locale={locale}>
            <DefaultStory />
          </I18nProvider>,
        );
        const LOCALIZED_EXPAND_PROMPT = localizedStrings[locale]?.[EXPAND_PROMPT_KEY] ?? 'TEST_FAIL';

        await waitFor(() => {
          const expandPrompt = screen.getByText(LOCALIZED_EXPAND_PROMPT);
          expect(expandPrompt).toBeVisible();
        });
      });
    });
  });
});
