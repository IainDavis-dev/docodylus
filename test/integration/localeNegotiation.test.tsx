import { describeIntegrationTest } from '@test-utils/testGroups';
import { render, screen, waitFor } from '@testing-library/react';
import { composeStories } from '@storybook/react';
import { type ExpandableLocalizedStrings } from '@components/layout/Expandable/src/localization';
import { I18nProvider, LocalizationStringLoaders } from '@i18n'

import userEvent from '@testing-library/user-event';

import * as stories from '@components/layout/Expandable/src/storybook/Expandable.stories';
import { expect, it, vi } from 'vitest';

const EXPAND_PROMPT_KEY: keyof ExpandableLocalizedStrings = 'dev.iaindavis.docodylus.layout.expandable.expandPrompt';
const COLLAPSE_PROMPT_KEY: keyof ExpandableLocalizedStrings = 'dev.iaindavis.docodylus.layout.expandable.collapsePrompt';

const DEFAULT_LANGUAGE_ONLY_EXPAND_PROMPT = 'DEFAULT_LANGUAGE_ONLY_EXPAND_PROMPT';
const DEFAULT_LANGUAGE_ONLY_COLLAPSE_PROMPT = 'DEFAULT_LANGUAGE_ONLY_COLLAPSE_PROMPT';

const LANGUAGE_ONLY_EXPAND_PROMPT = 'LANGUAGE_ONLY_EXPAND_PROMPT';
const LANGUAGE_ONLY_COLLAPSE_PROMPT = 'LANGUAGE_ONLY_COLLAPSE_PROMPT';
const LANGUAGE_AND_REGION_EXPAND_PROMPT = 'LANGUAGE_AND_REGION_EXPAND_PROMPT';
const LANGUAGE_AND_SCRIPT_EXPAND_PROMPT = 'LANGUAGE_AND_SCRIPT_EXPAND_PROMPT';
const LANGUAGE_SCRIPT_REGION_COLLAPSE_PROMPT = 'LANGUAGE_SCRIPT_REGION_COLLAPSE_PROMPT';

vi.mock('../../packages/common/i18n/internal/src/loaders/createLocalizationStringLoaders', () => ({
  createLocalizationStringLoaders: function createLocalizationStringLoadersMock(): LocalizationStringLoaders<Partial<ExpandableLocalizedStrings>> {
    return {
      en: {
        cacheKey: './txlns/en.txlns.ts',
        loader: () => Promise.resolve<ExpandableLocalizedStrings>({
          [EXPAND_PROMPT_KEY]: DEFAULT_LANGUAGE_ONLY_EXPAND_PROMPT,
          [COLLAPSE_PROMPT_KEY]: DEFAULT_LANGUAGE_ONLY_COLLAPSE_PROMPT,
        })
      },
      zh: { // language-only: zh (Chinese)
        cacheKey: './txlns/zh.txlns.ts',
        loader: () => Promise.resolve<Partial<ExpandableLocalizedStrings>>({
          [EXPAND_PROMPT_KEY]: LANGUAGE_ONLY_EXPAND_PROMPT,
          [COLLAPSE_PROMPT_KEY]: LANGUAGE_ONLY_COLLAPSE_PROMPT,
        })
      },
      'zh-Hant': /* language-script: zh-Hant (Chinese, traditional Han script) */ {
        cacheKey: './txlns/zh-Hant.txlns.ts',
        loader: () => Promise.resolve<Partial<ExpandableLocalizedStrings>>({
          [EXPAND_PROMPT_KEY]: LANGUAGE_AND_SCRIPT_EXPAND_PROMPT,
        }),
      },
      'zh-TW': /* language-region: zh-TW (Taiwanese Chinese) */ {
        cacheKey: './txlns/zhTW.txlns.ts',
        loader: () => Promise.resolve<Partial<ExpandableLocalizedStrings>>({
          [EXPAND_PROMPT_KEY]: LANGUAGE_AND_REGION_EXPAND_PROMPT,
        }),
      },
      'sr-Cyrl': /* language-script: sr-Cyrl (Serbian Cyrillic) */ {
        cacheKey: './txlns/sr-Cyrl.txlns.ts',
        loader: () => Promise.resolve<Partial<ExpandableLocalizedStrings>>({
          [EXPAND_PROMPT_KEY]: LANGUAGE_AND_SCRIPT_EXPAND_PROMPT,
        }),
      },
      'sr-Cyrl-RS': /* language-script-region: sr-Cyrl-RS (Serbian Cyrillic, Serbia) */ {
        cacheKey: './txlns/sr-Cyrl-RS.txlns.ts',
        loader: () => Promise.resolve<Partial<ExpandableLocalizedStrings>>({
          [COLLAPSE_PROMPT_KEY]: LANGUAGE_SCRIPT_REGION_COLLAPSE_PROMPT,
        }),
      },
      'az-Latn': /* language-script: az (Azerbaijani) */ {
        cacheKey: './txlns/az-Latn.txlns.ts',
        loader: () => Promise.resolve<Partial<ExpandableLocalizedStrings>>({
          [EXPAND_PROMPT_KEY]: LANGUAGE_ONLY_EXPAND_PROMPT,
        }),
      },
      'az-Latn-AZ': /* language-script-region: az-Latn-AZ (Azerbaijani, Latin script, Azerbaijan region) */ {
        cacheKey: './txlns/az-Latn-AZ.txlns.ts',
        loader: () => Promise.resolve<Partial<ExpandableLocalizedStrings>>({
          [COLLAPSE_PROMPT_KEY]: LANGUAGE_SCRIPT_REGION_COLLAPSE_PROMPT,
        }),
      }
    };
  },
}));

const {
  PreExpanded: PreExpandedStory,
  Default: DefaultStory,
} = composeStories(stories);

describeIntegrationTest('i18n Module Tests', () => {
  it('should fall-back from language-and-region to language-only', async () => {
    render(
      <I18nProvider locale="zh-TW">
        <DefaultStory />
      </I18nProvider>,
    );

    let expandButton;
    await waitFor(() => {
      expandButton = screen.getByText(LANGUAGE_AND_REGION_EXPAND_PROMPT);
    });

    if (expandButton !== undefined) await userEvent.click(expandButton);

    let collapseButton;
    await waitFor(() => {
      collapseButton = screen.getByText(LANGUAGE_ONLY_COLLAPSE_PROMPT);
    });
    expect(collapseButton).toBeDefined();
  });

  it('should fall back from language-and-script to language-only', async () => {
    render(
      <I18nProvider locale="zh-Hant">
        <DefaultStory />
      </I18nProvider>,
    );

    let expandButton;
    await waitFor(() => {
      expandButton = screen.getByText(LANGUAGE_AND_SCRIPT_EXPAND_PROMPT);
    });

    if (expandButton !== undefined) await userEvent.click(expandButton);

    let collapseButton;
    await waitFor(() => {
      collapseButton = screen.getByText(LANGUAGE_ONLY_COLLAPSE_PROMPT);
    });
    expect(collapseButton).toBeDefined();
  });

  it('should fall back from language-script-region to language-script', async () => {
    render(
      <I18nProvider locale="sr-Cyrl-RS">
        <PreExpandedStory />
      </I18nProvider>,
    );

    let collapseButton;
    await waitFor(() => {
      collapseButton = screen.getByText(LANGUAGE_SCRIPT_REGION_COLLAPSE_PROMPT);
    });

    if (collapseButton !== undefined) await userEvent.click(collapseButton);

    let expandButton;
    await waitFor(() => {
      expandButton = screen.getByText(LANGUAGE_AND_SCRIPT_EXPAND_PROMPT);
    });
    expect(expandButton).toBeDefined();
  });

  it('should fall back from language-script-region to language-only when language-script is not available', async () => {
    render(
      <I18nProvider locale="az-Latn-AZ">
        <PreExpandedStory />
      </I18nProvider>,
    );

    let expandButton;
    let collapseButton;
    await waitFor(() => {
      collapseButton = screen.getByText(LANGUAGE_SCRIPT_REGION_COLLAPSE_PROMPT);
      expect(collapseButton).toBeInTheDocument();
    });

    if (collapseButton !== undefined) await userEvent.click(collapseButton);

    await waitFor(() => {
      expandButton = screen.getByText(LANGUAGE_ONLY_EXPAND_PROMPT);
      expect(expandButton).toBeInTheDocument();
    });
  });

  it('should fall to the default locale when no translations are available for the requested locale', async () => {
    render(
      <I18nProvider locale="so">
        <PreExpandedStory />
      </I18nProvider>,
    );

    let expandButton; let collapseButton;
    await waitFor(() => {
      collapseButton = screen.getByText(DEFAULT_LANGUAGE_ONLY_COLLAPSE_PROMPT);
      expect(collapseButton).toBeInTheDocument();
    });

    if (collapseButton !== undefined) await userEvent.click(collapseButton);

    await waitFor(() => {
      expandButton = screen.getByText(DEFAULT_LANGUAGE_ONLY_EXPAND_PROMPT);
      expect(expandButton).toBeInTheDocument();
    });
  });
});
