import React, {
  KeyboardEventHandler,
  MouseEventHandler,
  PropsWithChildren,
  useEffect,
  useId,
  useRef,
  useState,
} from 'react';
import useTranslations from '@i18n/hooks/useTranslations';
import styles from './Expandable.module.css';

import { ExpandableLocalizedStrings, getLocalizedStringLoaders, ExpandableNamespace as ns } from './localization';

export type ExpandablePropsType = {
    startExpanded?: boolean;
    expandPrompt?: string;
    collapsePrompt?: string;
}

const Expandable: React.FC<PropsWithChildren<ExpandablePropsType>> = ({
  startExpanded = false,
  expandPrompt,
  collapsePrompt,
  children,
}) => {
  const t = useTranslations<ExpandableLocalizedStrings>(getLocalizedStringLoaders());

  const idDiscriminator = useId();

  const contentRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const effectiveExpandPrompt = expandPrompt || t(`${ns}.expandPrompt`);
  const effectiveCollapsePrompt = collapsePrompt || t(`${ns}.collapsePrompt`);

  const [isExpanded, setExpanded] = useState(startExpanded);

  useEffect(() => {
    setExpanded(() => startExpanded);
  }, [startExpanded]);

  useEffect(() => {
    if (isExpanded) {
      contentRef.current?.focus();
    } else { buttonRef.current?.focus(); }
  });

  const toggleExpanded = (): void => setExpanded((prevExpanded) => !prevExpanded);

  const handleClick: MouseEventHandler = () => {
    toggleExpanded();
  };

  const handleKeyDown: KeyboardEventHandler = (e) => {
    if (['Enter', ' '].includes(e.key)) {
      e.preventDefault();
      toggleExpanded();
    }
  };

  return (
    <div className={styles.container} aria-live="polite">
      <div
        ref={contentRef}
        // role="region"
        // aria-labelledby={`expandable-toggle-${idDiscriminator}`}
        tabIndex={-1}
        data-testid={`expandable-section-${idDiscriminator}`}
        id={`expandable-section-${idDiscriminator}`}
        className={styles.expandableBlock}
        hidden={!isExpanded}
      >
        {children}
      </div>
      <button
        id={`expandable-toggle-${idDiscriminator}`}
        data-testid={`expandable-toggle-${idDiscriminator}`}
        type="button"
        ref={buttonRef}
        tabIndex={0}
        className={styles.toggle}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        aria-expanded={isExpanded}
        aria-controls={`expandable-section-toggle-${idDiscriminator}`}
      >
        { isExpanded ? effectiveCollapsePrompt : effectiveExpandPrompt }
      </button>
    </div>
  );
};

export default Expandable;
