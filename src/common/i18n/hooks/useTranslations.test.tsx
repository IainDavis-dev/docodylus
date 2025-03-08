import { describeUnitTest } from '@test-utils/testGroups';
import { I18nProvider } from '@i18n/context/I18nProvider';
import { useTranslations } from '@i18n/hooks/useTranslations';
import { LocalizationFileLoaderMap } from '@i18n/types';
import {
  act,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import defer from '@test-utils/defer';

type TestLocalizedStrings = Partial<{
    'dev.iaindavis.test.unit.testProp1': string
    'dev.iaindavis.test.unit.testProp2': string
    'dev.iaindavis.test.unit.testProp3': string
}>

// extend the master list of localized string keys so that it includes the test keys
declare module '@i18n/types' {
    // eslint-disable-next-line @typescript-eslint/no-empty-object-type
    export interface DocodylusLocalizedStrings extends TestLocalizedStrings {}
}

const EN_LOADER_MOCK = vi.fn(() => Promise.resolve({
  'dev.iaindavis.test.unit.testProp1': 'EN_TEST_PROP_1',
  'dev.iaindavis.test.unit.testProp2': 'EN_TEST_PROP_2',
  'dev.iaindavis.test.unit.testProp3': 'EN_TEST_PROP_3',
} as TestLocalizedStrings));
const FR_LOADER_MOCK = vi.fn(() => Promise.resolve({
  'dev.iaindavis.test.unit.testProp1': 'FR_TEST_PROP_1',
  'dev.iaindavis.test.unit.testProp2': 'FR_TEST_PROP_2',
  'dev.iaindavis.test.unit.testProp3': 'FR_TEST_PROP_3',
} as TestLocalizedStrings));
const BS_LATN_BA_LOADER_MOCK = vi.fn(() => Promise.resolve({
  'dev.iaindavis.test.unit.testProp1': 'BS_LATN_BA_TEST_PROP_1',
} as Partial<TestLocalizedStrings>));
const BS_LATN_LOADER_MOCK = vi.fn(() => Promise.resolve({
  'dev.iaindavis.test.unit.testProp1': 'BS_LATN_TEST_PROP_1',
  'dev.iaindavis.test.unit.testProp2': 'BS_LATN_TEST_PROP_2',
} as Partial<TestLocalizedStrings>));
const BS_LOADER_MOCK = vi.fn(() => Promise.resolve({
  'dev.iaindavis.test.unit.testProp1': 'BS_TEST_PROP_1',
  'dev.iaindavis.test.unit.testProp2': 'BS_TEST_PROP_2',
  'dev.iaindavis.test.unit.testProp3': 'BS_TEST_PROP_3',
} as TestLocalizedStrings));

const localeToCacheKey = (locale: string): string => `https://mock-domain/localization/${locale}.txlns.ts`;
const defaultMockFileLoaders = {
  en: {
    cacheKey: localeToCacheKey('en'),
    loader: EN_LOADER_MOCK,
  },
  fr: {
    cacheKey: localeToCacheKey('fr'),
    loader: FR_LOADER_MOCK,
  },
  'bs-Latn-BA': {
    cacheKey: localeToCacheKey('bs-Latn-BA'),
    loader: BS_LATN_BA_LOADER_MOCK,
  },
  'bs-Latn': {
    cacheKey: localeToCacheKey('bs-Latn'),
    loader: BS_LATN_LOADER_MOCK,
  },
  bs: {
    cacheKey: localeToCacheKey('bs'),
    loader: BS_LOADER_MOCK,
  },
};

interface TestComponentProps {
    fileLoaders: Partial<LocalizationFileLoaderMap<TestLocalizedStrings>>
}

// eslint-disable-next-line react/prop-types
const TestComponent: React.FC<TestComponentProps> = ({ fileLoaders }) => {
  const t = useTranslations<Partial<TestLocalizedStrings>>(fileLoaders);
  return (
    <>
      <div data-testid="prop1">{t('dev.iaindavis.test.unit.testProp1')}</div>
      <div data-testid="prop2">{t('dev.iaindavis.test.unit.testProp2')}</div>
      <div data-testid="prop3">{t('dev.iaindavis.test.unit.testProp3')}</div>
    </>
  );
};

const expectLoadingState = (): void => {
  expect(screen.getByTestId('prop1')).toHaveTextContent('translations loading...');
  expect(screen.getByTestId('prop2')).toHaveTextContent('translations loading...');
  expect(screen.getByTestId('prop3')).toHaveTextContent('translations loading...');
};

describeUnitTest('useTranslations hook', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('should produce a status notification until translations are loaded', async () => {
    render(
      <I18nProvider>
        <TestComponent fileLoaders={defaultMockFileLoaders} />
      </I18nProvider>,
    );

    // waitFor so we don't get a warning from react testing
    // library telling us to wrap our render in `act`.  wrapping
    // in `act` causes all state changes and rerenders to settle
    // before assertions, making it impossible to test
    // intermediate state (which is our entire goal here).
    await waitFor(() => expectLoadingState());
  });

  it('should automatically load localized strings for the default locale', () => {
    act(() => {
      render(
        <I18nProvider>
          <TestComponent fileLoaders={defaultMockFileLoaders} />
        </I18nProvider>,
      );
    });

    expect(EN_LOADER_MOCK).toBeCalled();
    expect(FR_LOADER_MOCK).not.toBeCalled();
  });

  it('should load localized strings for the requested locale and the default locale', () => {
    act(() => {
      render(
        <I18nProvider locale="fr">
          <TestComponent fileLoaders={defaultMockFileLoaders} />
        </I18nProvider>,
      );
    });

    expect(EN_LOADER_MOCK).toBeCalled();
    expect(FR_LOADER_MOCK).toBeCalled();
  });

  it('should provide localized translations for the requested locale', async () => {
    act(() => {
      render(
        <I18nProvider locale="fr">
          <TestComponent fileLoaders={defaultMockFileLoaders} />
        </I18nProvider>,
      );
    });

    await waitFor(() => {
      expect(screen.getByTestId('prop1')).toHaveTextContent('FR_TEST_PROP_1');
      expect(screen.getByTestId('prop2')).toHaveTextContent('FR_TEST_PROP_2');
      expect(screen.getByTestId('prop3')).toHaveTextContent('FR_TEST_PROP_3');
    });
  });

  it('should load only the files it needs, and each file only once', async () => {
    // render with locale "en"
    const { rerender } = render(
      <I18nProvider locale="en">
        <TestComponent fileLoaders={defaultMockFileLoaders} />
      </I18nProvider>,
    );

    expect(EN_LOADER_MOCK).toBeCalledTimes(1); // loaded the needed localized strings
    expect(FR_LOADER_MOCK).not.toBeCalled(); // didn't load unneeded localized strings
    expect(BS_LOADER_MOCK).not.toBeCalled(); // didn't load unneeded localized strings

    await waitFor(() => {
      // expect to find loaded translations in store
      expect(screen.getByTestId('prop1')).toHaveTextContent('EN_TEST_PROP_1');
      expect(screen.getByTestId('prop2')).toHaveTextContent('EN_TEST_PROP_2');
      expect(screen.getByTestId('prop3')).toHaveTextContent('EN_TEST_PROP_3');
    });

    // render with locale "fr"
    rerender(
      <I18nProvider locale="fr">
        <TestComponent fileLoaders={defaultMockFileLoaders} />
      </I18nProvider>,
    );

    // expect "en" (default) loader not called a second time
    expect(EN_LOADER_MOCK).toBeCalledTimes(1);
    // expect new needed loader called
    expect(FR_LOADER_MOCK).toBeCalledTimes(1);
    // didn't load unneeded localized strings
    expect(BS_LOADER_MOCK).not.toBeCalled();

    await waitFor(() => {
      expect(screen.getByTestId('prop1')).toHaveTextContent('FR_TEST_PROP_1');
      expect(screen.getByTestId('prop2')).toHaveTextContent('FR_TEST_PROP_2');
      expect(screen.getByTestId('prop3')).toHaveTextContent('FR_TEST_PROP_3');
    });

    rerender(
      <I18nProvider locale="bs">
        <TestComponent fileLoaders={defaultMockFileLoaders} />
      </I18nProvider>,
    );

    // expect "en" (default) loader not called a second time
    expect(EN_LOADER_MOCK).toBeCalledTimes(1);
    // expect "fr" loader not called a second time
    expect(FR_LOADER_MOCK).toBeCalledTimes(1);
    // expect new needed loader called
    expect(BS_LOADER_MOCK).toBeCalledTimes(1);

    await waitFor(() => {
      expect(screen.getByTestId('prop1')).toHaveTextContent('BS_TEST_PROP_1');
      expect(screen.getByTestId('prop2')).toHaveTextContent('BS_TEST_PROP_2');
      expect(screen.getByTestId('prop3')).toHaveTextContent('BS_TEST_PROP_3');
    });

    // render again with locale "en"
    rerender(
      <I18nProvider locale="en">
        <TestComponent fileLoaders={defaultMockFileLoaders} />
      </I18nProvider>,
    );

    // expect none of the previously executed loaders to execute again
    expect(EN_LOADER_MOCK).toBeCalledTimes(1);
    expect(FR_LOADER_MOCK).toBeCalledTimes(1);
    expect(BS_LOADER_MOCK).toBeCalledTimes(1);

    // expect previously-cached translations to still be available
    await waitFor(() => {
      expect(screen.getByTestId('prop1')).toHaveTextContent('EN_TEST_PROP_1');
      expect(screen.getByTestId('prop2')).toHaveTextContent('EN_TEST_PROP_2');
      expect(screen.getByTestId('prop3')).toHaveTextContent('EN_TEST_PROP_3');
    });
  });

  it('should load available locale fallbacks and select the most specific translation per key', async () => {
    render(
      <I18nProvider locale="bs-Latn-BA">
        <TestComponent fileLoaders={defaultMockFileLoaders} />
      </I18nProvider>,
    );

    expect(BS_LATN_BA_LOADER_MOCK).toBeCalledTimes(1);
    expect(BS_LATN_LOADER_MOCK).toBeCalledTimes(1);
    expect(BS_LOADER_MOCK).toBeCalledTimes(1);
    expect(EN_LOADER_MOCK).toBeCalledTimes(1); // default locale

    await waitFor(() => {
      expect(screen.getByTestId('prop1')).toHaveTextContent('BS_LATN_BA_TEST_PROP_1');
      expect(screen.getByTestId('prop2')).toHaveTextContent('BS_LATN_TEST_PROP_2');
      expect(screen.getByTestId('prop3')).toHaveTextContent('BS_TEST_PROP_3');
    });
  });

  it('should not load more specific locales that are otherwise applicable', async () => {
    render(
      <I18nProvider locale="bs-Latn">
        <TestComponent fileLoaders={defaultMockFileLoaders} />
      </I18nProvider>,
    );

    expect(BS_LATN_BA_LOADER_MOCK).not.toBeCalled();
    expect(BS_LATN_LOADER_MOCK).toBeCalledTimes(1);
    expect(BS_LOADER_MOCK).toBeCalledTimes(1);
    expect(EN_LOADER_MOCK).toBeCalledTimes(1); // default locale

    await waitFor(() => {
      expect(screen.getByTestId('prop1')).toHaveTextContent('BS_LATN_TEST_PROP_1');
      expect(screen.getByTestId('prop2')).toHaveTextContent('BS_LATN_TEST_PROP_2');
      expect(screen.getByTestId('prop3')).toHaveTextContent('BS_TEST_PROP_3');
    });
  });

  it('should provide localizations for the default locale when no I18nProvider exists', async () => {
    render(
      <TestComponent fileLoaders={defaultMockFileLoaders} />,
    );

    expect(EN_LOADER_MOCK).toBeCalledTimes(1); // default locale
    expect(FR_LOADER_MOCK).not.toBeCalled();
    expect(BS_LATN_BA_LOADER_MOCK).not.toBeCalled();
    expect(BS_LATN_LOADER_MOCK).not.toBeCalled();
    expect(BS_LOADER_MOCK).not.toBeCalled();

    expectLoadingState();

    await waitFor(() => {
      expect(screen.getByTestId('prop1')).toHaveTextContent('EN_TEST_PROP_1');
      expect(screen.getByTestId('prop2')).toHaveTextContent('EN_TEST_PROP_2');
      expect(screen.getByTestId('prop3')).toHaveTextContent('EN_TEST_PROP_3');
    });
  });

  it('should provide default translations if an error occurs loading a file', async () => {
    render(
      <I18nProvider locale="es">
        <TestComponent fileLoaders={{
          ...defaultMockFileLoaders,
          es: {
            cacheKey: localeToCacheKey('es'),
            loader: () => { throw new Error('SIMULATED TEST ERROR'); },
          },
        }}
        />
      </I18nProvider>,
    );

    expect(screen.getByTestId('prop1')).toHaveTextContent('traducciones cargándose...');
    expect(screen.getByTestId('prop2')).toHaveTextContent('traducciones cargándose...');
    expect(screen.getByTestId('prop3')).toHaveTextContent('traducciones cargándose...');

    await waitFor(() => {
      expect(screen.getByTestId('prop1')).toHaveTextContent('EN_TEST_PROP_1');
      expect(screen.getByTestId('prop2')).toHaveTextContent('EN_TEST_PROP_2');
      expect(screen.getByTestId('prop3')).toHaveTextContent('EN_TEST_PROP_3');
    });
  });

  it('should indicate a loading state until all negotiated files have loaded', async () => {
    const enDefer = defer<Partial<TestLocalizedStrings>>();
    const frDefer = defer<Partial<TestLocalizedStrings>>();

    render(
      <I18nProvider locale="fr">
        <TestComponent fileLoaders={{
          ...defaultMockFileLoaders,
          en: { cacheKey: localeToCacheKey('en'), loader: () => enDefer.promise },
          fr: { cacheKey: localeToCacheKey('fr'), loader: () => frDefer.promise },
        }}
        />
      </I18nProvider>,
    );

    expect(screen.getByTestId('prop1')).toHaveTextContent('translations loading...');
    expect(screen.getByTestId('prop2')).toHaveTextContent('translations loading...');

    // simulate 'en' file load completion
    enDefer.resolve({
      'dev.iaindavis.test.unit.testProp1': 'EN Prop1',
      'dev.iaindavis.test.unit.testProp2': 'EN Prop2',
    });
    // expect default translations until _all_ locales have loaded
    await waitFor(() => {
      expect(screen.getByTestId('prop1')).toHaveTextContent('translations loading...');
      expect(screen.getByTestId('prop2')).toHaveTextContent('translations loading...');
    });

    // simulate 'fr' file load completion
    frDefer.resolve({
      'dev.iaindavis.test.unit.testProp1': 'FR Prop1',
    });
    await waitFor(() => {
      expect(screen.getByTestId('prop1')).toHaveTextContent('FR Prop1');
      expect(screen.getByTestId('prop2')).toHaveTextContent('EN Prop2');
    });
  });

  it('should indicate a loading state until all file loads have completed (with error)', async () => {
    const enDefer = defer<Partial<TestLocalizedStrings>>();
    const frDefer = defer<Partial<TestLocalizedStrings>>();

    render(
      <I18nProvider locale="fr">
        <TestComponent fileLoaders={{
          ...defaultMockFileLoaders,
          en: { cacheKey: localeToCacheKey('en'), loader: () => enDefer.promise },
          fr: { cacheKey: localeToCacheKey('fr'), loader: () => frDefer.promise },
        }}
        />
      </I18nProvider>,
    );

    expect(screen.getByTestId('prop1')).toHaveTextContent('translations loading...');
    expect(screen.getByTestId('prop2')).toHaveTextContent('translations loading...');

    // simulate 'en' file load completion
    enDefer.resolve({
      'dev.iaindavis.test.unit.testProp1': 'EN Prop1',
      'dev.iaindavis.test.unit.testProp2': 'EN Prop2',
    });
    // expect default translations until _all_ locales have loaded
    await waitFor(() => {
      expect(screen.getByTestId('prop1')).toHaveTextContent('translations loading...');
      expect(screen.getByTestId('prop2')).toHaveTextContent('translations loading...');
    });

    // simulate 'fr' file load failure
    frDefer.reject();
    await waitFor(() => {
      expect(screen.getByTestId('prop1')).toHaveTextContent('EN Prop1');
      expect(screen.getByTestId('prop2')).toHaveTextContent('EN Prop2');
    });
  });
});
