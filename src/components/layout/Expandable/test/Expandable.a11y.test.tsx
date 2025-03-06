import { describeUnitTest } from '@test-utils/testGroups';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import {
  mockUseTranslations,
  MOCK_DEFAULT_EXPAND_PROMPT,
  MOCK_DEFAULT_COLLAPSE_PROMPT,
} from './__mocks__/useTranslations';

import Expandable from '../Expandable';

vi.mock('import.meta.glob', () => Promise.resolve({})); // no-op
vi.mock('@i18n/hooks/useTranslations', () => ({ default: mockUseTranslations }));

const HIDDEN = 'hidden';
describeUnitTest('Accessibility tests', () => {
  const renderWithContent = ({ startExpanded = false } = {}): ReturnType<typeof render> => render(
    <Expandable startExpanded={startExpanded}>
      <p>Expandable content</p>
    </Expandable>,
  );

  it('should expand and focus on content when clicked from an initial collapsed state', async () => {
    renderWithContent();

    const button = screen.getByRole('button', { name: MOCK_DEFAULT_EXPAND_PROMPT });
    const expandableSection = screen.getByTestId(/expandable-section/);

    expect(button).toHaveAttribute('aria-expanded', 'false');
    expect(expandableSection).toHaveAttribute(HIDDEN);
    expect(button).toHaveFocus();

    await userEvent.click(button);

    expect(button).toHaveAttribute('aria-expanded', 'true');
    expect(expandableSection).not.toHaveAttribute(HIDDEN);
    expect(expandableSection).toHaveFocus();
  });

  it('should collapse and move focus back to the button when clicked from an initial expanded state', async () => {
    renderWithContent({ startExpanded: true });

    const button = screen.getByRole('button', { name: MOCK_DEFAULT_COLLAPSE_PROMPT });
    const expandableSection = screen.getByTestId(/expandable-section/);

    expect(button).toHaveAttribute('aria-expanded', 'true');
    expect(expandableSection).not.toHaveAttribute(HIDDEN);
    expect(expandableSection).toHaveFocus();

    await userEvent.click(button);

    expect(button).toHaveAttribute('aria-expanded', 'false');
    expect(expandableSection).toHaveAttribute(HIDDEN);
    expect(button).toHaveFocus();
  });

  it.each(['{Enter}', '{ }'])('should be keyboard-interactive with %s from an initial expanded state', async (key: string) => {
    renderWithContent({ startExpanded: true });

    const button = screen.getByRole('button', { name: MOCK_DEFAULT_COLLAPSE_PROMPT });
    const expandableSection = screen.getByTestId(/expandable-section/);
    expect(expandableSection).toHaveFocus();
    expect(expandableSection).not.toHaveAttribute(HIDDEN);
    button.focus();

    await userEvent.keyboard(key);

    expect(button).toHaveAttribute('aria-expanded', 'false');
    expect(expandableSection).toHaveAttribute(HIDDEN);
    expect(button).toHaveFocus();
  });

  it.each(['{Enter}', '{ }'])('should be keyboard-interactive [%s] from an initial collapsed state', async (key: string) => {
    renderWithContent({ startExpanded: false });

    const button = screen.getByRole('button', { name: MOCK_DEFAULT_EXPAND_PROMPT });
    const expandableSection = screen.getByTestId(/expandable-section/);
    expect(button).toHaveFocus();
    expect(expandableSection).toHaveAttribute(HIDDEN);

    await userEvent.keyboard(key);

    expect(button).toHaveAttribute('aria-expanded', 'true');
    expect(expandableSection).not.toHaveAttribute(HIDDEN);
    expect(expandableSection).toHaveFocus();
  });

  it('should have a sensible tab order from an initial expanded state', async () => {
    renderWithContent({ startExpanded: true });

    const button = screen.getByRole('button', { name: MOCK_DEFAULT_COLLAPSE_PROMPT });
    const expandableSection = screen.getByTestId(/expandable-section/);
    expect(expandableSection).toHaveFocus();

    await userEvent.tab();

    expect(button).toHaveFocus();
  });

  it('should focus the toggle from an initial collapsed state, and change focus on tab', async () => {
    renderWithContent({ startExpanded: false });

    const button = screen.getByRole('button', { name: MOCK_DEFAULT_EXPAND_PROMPT });
    expect(button).toHaveFocus();

    await userEvent.tab();

    expect(button).not.toHaveFocus();
  });

  describe('When Expandables are nested...', () => {
    const renderNestedExpandable = (): ReturnType<typeof render> => render(
      <Expandable expandPrompt="Show more" collapsePrompt="Show less">
        <p>Outer expandable content</p>
        <Expandable expandPrompt="Show nested" collapsePrompt="Hide nested">
          <p>Nested expandable content</p>
        </Expandable>
      </Expandable>,
    );

    it('should set aria-expanded correctly for parent and child independently', async () => {
      renderNestedExpandable();

      const parentButton = screen.getByText(/show more/i, { selector: 'button' });
      const childButton = screen.getByText(/show nested/i, { selector: 'button' });

      expect(parentButton).toHaveAttribute('aria-expanded', 'false');
      expect(childButton).toHaveAttribute('aria-expanded', 'false');

      await userEvent.click(parentButton);
      expect(parentButton).toHaveAttribute('aria-expanded', 'true');
      expect(childButton).toHaveAttribute('aria-expanded', 'false');

      await userEvent.click(childButton);
      expect(parentButton).toHaveAttribute('aria-expanded', 'true');
      expect(childButton).toHaveAttribute('aria-expanded', 'true');

      await userEvent.click(parentButton);
      expect(parentButton).toHaveAttribute('aria-expanded', 'false');
      expect(childButton).toHaveAttribute('aria-expanded', 'true');
      expect(childButton).not.toBeVisible();
    });

    it('should manage focus correctly between parent and child expandables', async () => {
      renderNestedExpandable();

      const parentButton = screen.getByText(/show more/i, { selector: 'button' });
      const childButton = screen.getByText(/show nested/i, { selector: 'button' });

      // focus gets applied to the container, not to the actual content.
      // actual content might well start with an unfocusable element like <p>
      const parentContent = screen.getByText(/outer expandable content/i).closest('div');
      const childContent = screen.getByText(/nested expandable content/i).closest('div');

      await userEvent.click(parentButton);
      expect(parentContent).toHaveFocus();

      await userEvent.click(childButton);
      expect(childContent).toHaveFocus();

      await userEvent.click(parentButton);
      expect(parentButton).toHaveFocus();
    });

    it.each(['{Enter}', '{ }'])('should be keyboard-interactable with %s for both parent and child', async (key: string) => {
      renderNestedExpandable();

      const parentButton = screen.getByText(/show more/i, { selector: 'button' });
      const childButton = screen.getByText(/show nested/i, { selector: 'button' });

      parentButton.focus();
      await userEvent.keyboard(key);
      expect(parentButton).toHaveAttribute('aria-expanded', 'true');

      childButton.focus();
      await userEvent.keyboard(key);
      expect(childButton).toHaveAttribute('aria-expanded', 'true');

      childButton.focus();
      await userEvent.keyboard(key);
      expect(childButton).toHaveAttribute('aria-expanded', 'false');

      parentButton.focus();
      await userEvent.keyboard(key);
      expect(parentButton).toHaveAttribute('aria-expanded', 'false');
    });

    it('should have a sensible tab order for nested components', async () => {
      render(
        <Expandable startExpanded expandPrompt="Show more" collapsePrompt="Show less">
          <p>Outer expandable content</p>
          <Expandable startExpanded expandPrompt="Show nested" collapsePrompt="Hide nested">
            <p>Nested expandable content</p>
          </Expandable>
        </Expandable>,
      );

      const parentButton = screen.getByText(/show less/i, { selector: 'button' });
      const childButton = screen.getByText(/hide nested/i, { selector: 'button' });
      const parentContent = screen.getByText(/outer expandable content/i).closest('div');

      expect(parentContent).toHaveFocus();

      await userEvent.tab();
      expect(childButton).toHaveFocus();

      await userEvent.tab();
      expect(parentButton).toHaveFocus();
    });
  });
});
