import { describeUnitTest } from '@test-utils/testGroups';
import { render, screen } from '@testing-library/react';
import { I18nProvider } from '@i18n/context/I18nProvider';
import { LocaleAwarePolyglot } from '@i18n/LocaleAwarePolyglot';
import { DocodylusTypeError } from '@error/types/DocodylusTypeError';
import { useContext } from 'react';
import { I18nContext } from '@i18n/context/I18nContext';
import { DEFAULT_LOCALE } from '@i18n/consts';
import { ValidLocale } from '@i18n/types';

vi.mock('@i18n/LocaleAwarePolyglot', () => ({
  LocaleAwarePolyglot: vi.fn().mockImplementation(() => {
    let mockedLocale: ValidLocale = DEFAULT_LOCALE;
    return ({
      setLocale: vi.fn((locale: ValidLocale) => {
        mockedLocale = locale;
        return mockedLocale;
      }),
      getLocale: vi.fn(() => mockedLocale),
      extend: vi.fn(),
      t: vi.fn(),
    });
  }),
}));

const TestConsumer: React.FC = () => {
  const { i18n } = useContext(I18nContext) || {};

  return <div data-testid="locale">{i18n?.getLocale()}</div>;
};

describeUnitTest('I18nProvider', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should internally create an instance of LocaleAwarePolyglot', () => {
    render(
      <I18nProvider>
        <TestConsumer />
      </I18nProvider>,
    );

    expect(LocaleAwarePolyglot).toHaveBeenCalledTimes(1);
  });

  it('should not create a new instance of LocaleAwarePolyglot on subsequent renders', () => {
    const { rerender } = render(
      <I18nProvider>
        <TestConsumer />
      </I18nProvider>,
    );

    expect(LocaleAwarePolyglot).toHaveBeenCalledTimes(1);

    rerender(
      <I18nProvider>
        <TestConsumer />
      </I18nProvider>,
    );

    // no new instance on re-render, we keep using the same instance (one per Provider)
    expect(LocaleAwarePolyglot).toHaveBeenCalledTimes(1);
  });

  it('instantiates the LocaleAwarePolyglot instance with the requested locale', () => {
    render(
      <I18nProvider locale="fr">
        <TestConsumer />
      </I18nProvider>,
    );

    expect(LocaleAwarePolyglot).toHaveBeenCalledWith(undefined, { locale: 'fr' });
  });

  it('throws an error when given an invalid locale', () => {
    try {
      render(
        // @ts-expect-error testing behavior when an invalid locale is passed
        <I18nProvider locale="xx-XX">
          <TestConsumer />
        </I18nProvider>,
      );
      assert.fail('Expected error never thrown');
    } catch (err) {
      expect(err).toBeInstanceOf(DocodylusTypeError);
      const dte = err as DocodylusTypeError;
      expect(dte.subtype).toBe('InvalidLocale');
      expect(dte.scope).toBe('i18n');
      expect(dte.reference).toEqual(new URL('https://www.npmjs.com/package/locale-codes'));
    }
  });

  it('should provide the locale context to children', () => {
    render(
      <I18nProvider locale="fr">
        <TestConsumer />
      </I18nProvider>,
    );

    expect(screen.getByTestId('locale')).toHaveTextContent('fr');
  });

  it('should provide a default locale context to children when none is specified', () => {
    render(
      <I18nProvider>
        <TestConsumer />
      </I18nProvider>,
    );

    expect(screen.getByTestId('locale')).toHaveTextContent(DEFAULT_LOCALE);
  });

  it('should update the locale when the prop changes', () => {
    const { rerender } = render(
      <I18nProvider locale="fr">
        <TestConsumer />
      </I18nProvider>,
    );

    expect(screen.getByTestId('locale')).toHaveTextContent('fr');

    rerender(
      <I18nProvider locale="es">
        <TestConsumer />
      </I18nProvider>,
    );

    expect(screen.getByTestId('locale')).toHaveTextContent('es');
  });
});
