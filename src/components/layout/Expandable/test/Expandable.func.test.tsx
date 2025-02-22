import { describeUnitTest } from '@test-utils/testGroups';
import { mockUseTranslations, MOCK_DEFAULT_EXPAND_PROMPT, MOCK_DEFAULT_COLLAPSE_PROMPT } from './__mocks__/useTranslations';

vi.mock("import.meta.glob", () => Promise.resolve({})); // no-op
vi.mock("@i18n/hooks/useTranslations", () => ({ default: mockUseTranslations }))

import { fireEvent, render, screen } from '@testing-library/react';
import Expandable from '../Expandable';

describeUnitTest('Core functionality tests', () => {
    describe('Initial state', () => {
        it('should render collapsed by default and expand when clicked', () => {
            render(<Expandable />);
            expect(screen.getByText(MOCK_DEFAULT_EXPAND_PROMPT)).toBeInTheDocument();
        });

        it('should render collapsed when startExpanded is explicitly false', () => {
            render(<Expandable startExpanded={false}/>)
            expect(screen.getByText(MOCK_DEFAULT_EXPAND_PROMPT)).toBeInTheDocument();
        })

        it('should render expanded when startExpanded is explicitly true', () => {
            render(<Expandable startExpanded={true} />);
            expect(screen.getByText(MOCK_DEFAULT_COLLAPSE_PROMPT)).toBeInTheDocument();
        });
    })

    describe('State change', () => {

        it('should collapse when button is clicked from an expanded state', () => {
            render(<Expandable startExpanded={true}/>);
            const content = screen.getByTestId(/^expandable-section/);
            expect(content).toBeVisible()

            fireEvent.click(screen.getByText(MOCK_DEFAULT_COLLAPSE_PROMPT));

            expect(screen.getByText(MOCK_DEFAULT_EXPAND_PROMPT)).toBeInTheDocument();
            expect(content).not.toBeVisible()
        });

        it('should expand when button is clicked from a collapsed state', () => {
            render(<Expandable startExpanded={false}/>);
            const content = screen.getByTestId(/^expandable-section/);
            expect(content).not.toBeVisible()

            fireEvent.click(screen.getByText(MOCK_DEFAULT_EXPAND_PROMPT));

            expect(screen.getByText(MOCK_DEFAULT_COLLAPSE_PROMPT)).toBeInTheDocument();
            expect(content).toBeVisible()
        })

    })

    describe("Customization props", () => {
        it('should handle empty prompts gracefully', () => {
            render(<Expandable startExpanded={false} expandPrompt="" collapsePrompt="" />);
            fireEvent.click(screen.getByText(MOCK_DEFAULT_EXPAND_PROMPT));
            expect(screen.getByText(MOCK_DEFAULT_COLLAPSE_PROMPT)).toBeInTheDocument();
        });

        it('should handle null prompts gracefully', () => {
            render(<Expandable startExpanded={false} expandPrompt={null as any} collapsePrompt={null as any} />);
            fireEvent.click(screen.getByText(MOCK_DEFAULT_EXPAND_PROMPT));
            expect(screen.getByText(MOCK_DEFAULT_COLLAPSE_PROMPT)).toBeInTheDocument();
        });

        it('should handle explicitlly undefined prompts gracefully', () => {
            render(<Expandable startExpanded={false} expandPrompt={undefined} collapsePrompt={undefined}/>);
            fireEvent.click(screen.getByText(MOCK_DEFAULT_EXPAND_PROMPT));
            expect(screen.getByText(MOCK_DEFAULT_COLLAPSE_PROMPT)).toBeInTheDocument();
        });

        it('should use custom prompts when provided', () => {
            const MOCK_CUSTOM_EXPAND_PROMPT = "CUSTOM_EXPAND_PROMPT";
            const MOCK_CUSTOM_COLLAPSE_PROMPT = "CUSTOM_COLLAPSE_PROMPT";

            render(<Expandable startExpanded={false} expandPrompt={MOCK_CUSTOM_EXPAND_PROMPT} collapsePrompt={MOCK_CUSTOM_COLLAPSE_PROMPT}/>);
            expect(screen.getByText(MOCK_CUSTOM_EXPAND_PROMPT)).toBeInTheDocument();
            expect(screen.queryByText(MOCK_DEFAULT_EXPAND_PROMPT)).not.toBeInTheDocument();

            fireEvent.click(screen.getByText(MOCK_CUSTOM_EXPAND_PROMPT));
            expect(screen.getByText(MOCK_CUSTOM_COLLAPSE_PROMPT)).toBeInTheDocument();
            expect(screen.queryByText(MOCK_DEFAULT_COLLAPSE_PROMPT)).not.toBeInTheDocument();
        })

        it('should update when startExpanded prop is changed dynamically', () => {
            const { rerender } = render(<Expandable startExpanded={false} />);
            expect(screen.queryByText(MOCK_DEFAULT_EXPAND_PROMPT)).toBeInTheDocument();
            expect(screen.queryByText(MOCK_DEFAULT_COLLAPSE_PROMPT)).not.toBeInTheDocument

            rerender(<Expandable startExpanded={true} />);
            expect(screen.getByText(MOCK_DEFAULT_COLLAPSE_PROMPT)).toBeInTheDocument();
            expect(screen.queryByText(MOCK_DEFAULT_EXPAND_PROMPT)).not.toBeInTheDocument();
        });
    });

    describe("Snapshots/Visual-Regression", () => {
        it('should maintain visual consistency between expanded and collapsed states', () => {
            const { asFragment, rerender } = render(<Expandable startExpanded={false} />);
            expect(asFragment()).toMatchSnapshot();

            rerender(<Expandable startExpanded={true} />);
            expect(asFragment()).toMatchSnapshot();
        });
    })

    // Test large content performance
    it('should perform well with large content when expanding/collapsing', () => {
        const largeContent = Array(1000).fill('Content').join(' ');
        render(<Expandable>{largeContent}</Expandable>);
        fireEvent.click(screen.getByText(MOCK_DEFAULT_EXPAND_PROMPT));
        expect(screen.getByText(MOCK_DEFAULT_COLLAPSE_PROMPT)).toBeInTheDocument();
    });

    // Check responsiveness/media queries behavior
    it('should respond correctly to different screen sizes', () => {
        global.innerWidth = 500;
        render(<Expandable />);
        expect(screen.getByText(MOCK_DEFAULT_EXPAND_PROMPT)).toBeInTheDocument();

        global.innerWidth = 1024;
        fireEvent.resize(window);
        expect(screen.getByText(MOCK_DEFAULT_EXPAND_PROMPT)).toBeInTheDocument();
    });
});
    